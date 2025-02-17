// This script will run in the context of web pages
console.log('Clearview content script loaded');

// Main content extraction functionality for Clearview
console.log('Clearview content script loaded');

// Export the extract function for use by the extension
window.clearviewExtractContent = () => {
  try {
    // Step 1: Verify Readability is available
    if (typeof Readability === 'undefined') {
      throw new Error('Readability library not found');
    }

    // Step 2: Create a clean copy of the document
    // This prevents modifications to the original page
    const documentClone = document.cloneNode(true);

    // Step 3: Create a new Readability object with the cloned document
    const reader = new Readability(documentClone, {
      // Configure Readability options
      debug: false,
      charThreshold: 100,  // Minimum character threshold for article
      classesToPreserve: [] // Don't preserve any classes by default
    });

    // Step 4: Parse the document to extract article content
    const article = reader.parse();

    // Step 5: Validate the extracted content
    if (!article) {
      throw new Error('No article content found');
    }

    if (!article.textContent || article.textContent.trim().length < 100) {
      throw new Error('Article content too short to be valid');
    }

    // Step 6: Return the successfully extracted content
    return {
      success: true,
      article: {
        title: article.title || document.title,
        content: article.textContent,
        excerpt: article.excerpt,
        byline: article.byline,
        siteName: article.siteName || window.location.hostname,
        length: article.textContent.length
      }
    };

  } catch (error) {
    console.error('Content extraction failed:', error);
    return {
      success: false,
      error: error.message || 'Failed to extract article content'
    };
  }
};

// Verify the function is available
console.log('Content extractor initialized, function available:', typeof window.clearviewExtractContent === 'function');

// Log successful initialization
console.log('Content extractor initialized'); 