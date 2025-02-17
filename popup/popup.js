// Store DOM elements
let elements = {};

// Initialize popup
document.addEventListener('DOMContentLoaded', function() {
  elements = {
    analyzeButton: document.getElementById('analyze-btn'),
    statusMessage: document.getElementById('status-message'),
    extractedContent: document.getElementById('extracted-content')
  };

  elements.analyzeButton.addEventListener('click', handleAnalyzeClick);
});

async function handleAnalyzeClick() {
  try {
    // Clear previous content
    elements.extractedContent.textContent = '';
    showStatus('Extracting article...', 'info');

    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
      throw new Error('No active tab found');
    }

    // First inject Readability library
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['lib/Readability.js']
    });

    // Then inject our content script
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content/content.js']
    });

    // Finally execute the extraction
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.clearviewExtractContent()
    });

    const result = results[0]?.result;
    
    if (!result || !result.success) {
      throw new Error(result?.error || 'Failed to extract article');
    }

    // Display the extracted content
    elements.extractedContent.textContent = result.article.content;
    showStatus(`Extracted: ${result.article.title}`, 'success');

  } catch (error) {
    console.error('Extraction error:', error);
    showStatus(error.message, 'error');
  }
}

function showStatus(message, type = 'error') {
  elements.statusMessage.textContent = message;
  elements.statusMessage.className = `status-message ${type}`;
} 