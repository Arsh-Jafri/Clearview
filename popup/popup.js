// Store DOM elements
let elements = {};

// Initialize popup
document.addEventListener('DOMContentLoaded', async function() {
  elements = {
    articleImage: document.getElementById('article-image'),
    articleTitle: document.getElementById('article-title'),
    publisher: document.getElementById('publisher'),
    author: document.getElementById('author'),
    articleUrl: document.getElementById('article-url'),
    confidenceScore: document.getElementById('confidence-score'),
    biasIndicator: document.getElementById('bias-indicator'),
    flaggedSections: document.getElementById('flagged-sections')
  };

  // Automatically analyze the current tab
  await analyzeCurrentTab();
});

async function analyzeCurrentTab() {
  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
      throw new Error('No active tab found');
    }

    // First inject Readability
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['lib/Readability.js']
    });

    // Then inject our bundled content script
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['dist/content.bundle.js']
    });

    // Execute the extraction
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.clearviewExtractContent()
    });

    const result = results[0]?.result;
    
    if (!result || !result.success) {
      throw new Error(result?.error || 'Failed to extract article');
    }

    // Update UI with article info
    updateArticleInfo(result.article, tab);

    // Update bias analysis
    updateBiasAnalysis(result.article.analysis.bias);

    // Update flagged sections
    updateFlaggedSections(result.article.analysis.bias.flaggedSections);

  } catch (error) {
    console.error('Analysis error:', error);
    // Could add error UI here
  }
}

function updateArticleInfo(article, tab) {
  // Try to get the main image from the article
  const ogImage = document.querySelector('meta[property="og:image"]')?.content;
  elements.articleImage.src = ogImage || '../assets/placeholder.png';
  
  // Add quotes around the title
  elements.articleTitle.textContent = `"${article.title}"`;
  
  // Update publisher and author with proper formatting
  elements.publisher.innerHTML = `<span class="publisher">${article.siteName}</span>`;
  
  if (article.byline) {
    const cleanByline = article.byline.replace('By ', '').trim();
    elements.author.innerHTML = `<span class="dot-separator">&middot;</span>${cleanByline}`;
  } else {
    elements.author.innerHTML = `<span class="dot-separator">&middot;</span>Unknown`;
  }
  
  // Update URL display with shortened link
  const fullUrl = tab.url;
  const shortenedUrl = shortenUrl(fullUrl);
  elements.articleUrl.innerHTML = `
    <span class="url-text" title="${fullUrl}" data-url="${fullUrl}">
      ${shortenedUrl}
    </span>
  `;
  
  // Add click handler for copying URL
  elements.articleUrl.querySelector('.url-text').addEventListener('click', function() {
    const url = this.dataset.url;
    navigator.clipboard.writeText(url).then(() => {
      // Optional: Show a small "Copied!" tooltip
      const originalText = this.textContent;
      this.textContent = 'Copied!';
      setTimeout(() => {
        this.textContent = originalText;
      }, 1000);
    });
  });
}

// Add this helper function to shorten URLs
function shortenUrl(url) {
  try {
    const urlObj = new URL(url);
    let path = urlObj.pathname;
    
    // Remove trailing slash if present
    path = path.replace(/\/$/, '');
    
    // Get the last part of the path
    const pathParts = path.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    
    // Construct shortened URL
    let shortened = urlObj.hostname;
    if (lastPart && lastPart !== '') {
      shortened += '/.../' + lastPart;
    }
    
    // If still too long, truncate with ellipsis
    if (shortened.length > 50) {
      shortened = shortened.substring(0, 47) + '...';
    }
    
    return shortened;
  } catch (e) {
    // Fallback if URL parsing fails
    return url.substring(0, 47) + '...';
  }
}

function updateBiasAnalysis(bias) {
  // Update confidence badge
  const confidence = Math.round(bias.confidence * 100);
  elements.confidenceScore.textContent = `${confidence}% Confidence`;

  // Update score display and position
  const score = Math.round(bias.score);
  const position = ((bias.score + 100) / 2);
  
  // Update score circle
  const scoreCircle = document.getElementById('bias-score');
  scoreCircle.textContent = score;
  scoreCircle.style.left = `${position}%`;
  
  // Update indicator dot
  elements.biasIndicator.style.left = `${position}%`;
}

function updateFlaggedSections(sections) {
  if (!sections || sections.length === 0) {
    elements.flaggedSections.innerHTML = '<p>No politically charged sections found</p>';
    return;
  }

  elements.flaggedSections.innerHTML = sections.map(section => `
    <div class="flagged-section">
      <p>${section.text}</p>
      <div class="flagged-section-score">
        Bias intensity: ${Math.abs(section.score).toFixed(1)}
        ${section.score > 0 ? '(Conservative)' : '(Liberal)'}
      </div>
    </div>
  `).join('');
}