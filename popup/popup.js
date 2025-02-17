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

  // Add scroll detection
  document.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Initialize theme
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  // Add theme toggle handler
  const themeIcon = document.querySelector('.theme-icon');
  themeIcon.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Update theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    updateThemeIcon(newTheme);
  });
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
  // Get the article image using chrome.scripting
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // Try different meta tags for image
      const ogImage = document.querySelector('meta[property="og:image"]')?.content;
      const twitterImage = document.querySelector('meta[name="twitter:image"]')?.content;
      const articleImage = document.querySelector('meta[property="article:image"]')?.content;
      
      // Try to find the first large image in the article
      const firstLargeImage = Array.from(document.getElementsByTagName('img'))
        .find(img => img.width >= 300 && img.height >= 200)?.src;
      
      return ogImage || twitterImage || articleImage || firstLargeImage;
    }
  }).then(results => {
    const imageUrl = results[0]?.result;
    if (imageUrl) {
      elements.articleImage.src = imageUrl;
    } else {
      elements.articleImage.src = '../assets/placeholder.png';
    }
  });
  
  // Add quotes around the title
  elements.articleTitle.textContent = `"${article.title}"`;
  
  // Update publisher and author with proper formatting
  elements.publisher.innerHTML = `<span class="publisher">${article.siteName}</span>`;
  
  if (article.byline) {
    const cleanByline = article.byline.replace('By ', '').trim();
    elements.author.innerHTML = `<span class="dot-separator">&middot;</span><span class="author">${cleanByline}</span>`;
  } else {
    elements.author.innerHTML = `<span class="dot-separator">&middot;</span><span class="author">Unknown</span>`;
  }
  
  // Update URL display with copy icon and shortened link
  const fullUrl = tab.url;
  const shortenedUrl = shortenUrl(fullUrl);
  elements.articleUrl.innerHTML = '';  // Clear any existing content
  elements.articleUrl.className = 'article-link';  // Reset classes
  elements.articleUrl.innerHTML = `
    <div class="url-container">
      <img src="../assets/copy.png" alt="Copy" class="copy-icon">
      <span class="url-text" title="${fullUrl}" data-url="${fullUrl}">${shortenedUrl}</span>
    </div>
  `;
  
  // Update click handler to reference the correct elements
  elements.articleUrl.querySelector('.copy-icon').addEventListener('click', function() {
    const url = this.parentElement.querySelector('.url-text').dataset.url;
    navigator.clipboard.writeText(url).then(() => {
      // Optional: Show a small "Copied!" tooltip
      const urlText = this.parentElement.querySelector('.url-text');
      const originalText = urlText.textContent;
      urlText.textContent = 'Copied!';
      setTimeout(() => {
        urlText.textContent = originalText;
      }, 1000);
    });
  });
}

// Add this helper function to shorten URLs
function shortenUrl(url) {
  try {
    const urlObj = new URL(url);
    let fullPath = urlObj.hostname + urlObj.pathname;
    
    // Remove trailing slash if present
    fullPath = fullPath.replace(/\/$/, '');
    
    // If the URL is too long, truncate it with ellipsis at the end
    if (fullPath.length > 50) {
      return fullPath.substring(0, 47) + '...';
    }
    
    return fullPath;
  } catch (e) {
    // Fallback if URL parsing fails
    return url.substring(0, 47) + '...';
  }
}

function updateBiasAnalysis(bias) {
  // First update the header HTML to include the icon with tooltip
  const cardHeader = document.querySelector('.analysis-card .card-header');
  cardHeader.innerHTML = `
    <h2>Article Bias Rating</h2>
    <div class="tooltip-container">
      <img src="../../assets/info.png" alt="Info" class="info-icon">
      <div class="tooltip">
        This score indicates the article's political bias on a scale from -100 (very liberal) to +100 (very conservative). 
        The analysis is based on language patterns, tone, and content.
      </div>
    </div>
  `;

  // Update confidence badge
  const confidence = Math.round(bias.confidence * 100);
  let confidenceClass = 'low';
  if (confidence >= 61) {
    confidenceClass = 'high';
  } else if (confidence >= 30) {
    confidenceClass = 'medium';
  }
  
  elements.confidenceScore.className = `confidence-badge ${confidenceClass}`;
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
  // First update the header HTML with tooltip
  const cardHeader = document.querySelector('.flagged-card .card-header');
  cardHeader.innerHTML = `
    <h2>Flagged Sections</h2>
    <div class="tooltip-container">
      <img src="../../assets/info.png" alt="Info" class="info-icon">
      <div class="tooltip">
        These sections contain politically charged language or show significant bias. 
        Click on any section to view it in the original article.
      </div>
    </div>
  `;

  if (!sections || sections.length === 0) {
    elements.flaggedSections.innerHTML = '<p>No politically charged sections found</p>';
    return;
  }

  elements.flaggedSections.innerHTML = sections.map((section, index) => {
    const intensity = Math.abs(section.score);
    const intensityClass = intensity > 75 ? 'high' : 'moderate';
    
    // Truncate text at word boundary
    let truncatedText = section.text;
    if (section.text.length > 150) {
      // Find the last space before 150 characters
      const lastSpace = section.text.substring(0, 150).lastIndexOf(' ');
      truncatedText = section.text.substring(0, lastSpace) + '...';
    }
    
    return `
      <div class="flagged-section ${intensityClass}" data-section-index="${index}">
        <p>"${truncatedText}"</p>
        <div class="flagged-section-score">
          Bias intensity: ${intensity.toFixed(1)} (${section.score > 0 ? 'Conservative' : 'Liberal'})
        </div>
      </div>
    `;
  }).join('');

  // Add click handlers
  document.querySelectorAll('.flagged-section').forEach(section => {
    section.addEventListener('click', async () => {
      const index = section.dataset.sectionIndex;
      const sectionText = sections[index].text;
      
      // Get the current tab
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      
      // First focus the tab
      await chrome.tabs.update(tab.id, {active: true});
      
      // Then execute the scroll script
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (searchText) => {
          // Clean the search text to match text nodes more reliably
          const cleanText = searchText.trim().substring(0, 50); // Use start of text for matching
          
          const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
          );

          let node;
          while (node = walker.nextNode()) {
            if (node.textContent.includes(cleanText)) {
              // Get the closest block-level parent
              let element = node.parentElement;
              while (element && 
                     window.getComputedStyle(element).display === 'inline') {
                element = element.parentElement;
              }
              
              // Scroll the element into view
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              
              // Highlight effect
              const originalBackground = element.style.backgroundColor;
              const originalTransition = element.style.transition;
              element.style.transition = 'background-color 0.3s ease';
              element.style.backgroundColor = '#FFF9E7';
              
              setTimeout(() => {
                element.style.backgroundColor = originalBackground;
                element.style.transition = originalTransition;
              }, 2000);
              
              break;
            }
          }
        },
        args: [sectionText]
      });
      
      // Close the popup
      window.close();
    });
  });
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('.theme-icon');
  const logo = document.querySelector('.logo');
  
  // Update theme icon
  themeIcon.src = theme === 'light' ? '../assets/moon.png' : '../assets/sun.png';
  themeIcon.alt = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  
  // Update logo
  logo.src = theme === 'light' ? logo.dataset.lightSrc : logo.dataset.darkSrc;
}