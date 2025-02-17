// This script will run in the context of web pages
console.log('Clearview content script loaded');

// Import Compromise
import nlp from 'compromise';
import Sentiment from 'sentiment';

// Initialize sentiment analyzer
const sentiment = new Sentiment();

// Enhanced political patterns with more nuanced categories
const politicalPatterns = {
  conservative: {
    figures: [
      'trump', 'desantis', 'mccarthy', 'mcconnell', 'cruz', 'hawley',
      'republican senator', 'republican representative', 'gop leader'
    ],
    policies: [
      'border wall', 'tax cuts', 'second amendment', 'pro-life', 'school choice',
      'deregulation', 'voter id', 'election integrity', 'religious freedom'
    ],
    phrases: [
      'fake news', 'deep state', 'america first', 'make america great',
      'radical left', 'socialist agenda', 'liberal media', 'conservative values'
    ],
    criticisms: [
      'socialist', 'radical', 'leftist', 'communist', 'marxist',
      'antifa', 'defund', 'woke', 'cancel culture'
    ],
    weight: 1500  // Increased from 100 to 1500
  },
  liberal: {
    figures: [
      'biden', 'harris', 'pelosi', 'schumer', 'aoc', 'sanders',
      'democratic senator', 'democratic representative', 'progressive leader'
    ],
    policies: [
      'green new deal', 'medicare for all', 'gun control', 'climate action',
      'voting rights', 'student debt', 'reproductive rights', 'social justice'
    ],
    phrases: [
      'systemic racism', 'climate crisis', 'income inequality',
      'progressive values', 'democratic values', 'social justice'
    ],
    criticisms: [
      'far-right', 'alt-right', 'white supremacy', 'insurrection',
      'misinformation', 'conspiracy theory', 'anti-science'
    ],
    weight: 1500  // Increased from 100 to 1500
  }
};

// Sentiment dictionaries for political context
const POLITICAL_SENTIMENT = {
  positive: {
    words: ['strong', 'effective', 'successful', 'honest', 'reliable', 'proven', 
            'experienced', 'qualified', 'respected', 'principled'],
    score: 300  // Increased from 20 to 300
  },
  negative: {
    words: ['weak', 'ineffective', 'failed', 'dishonest', 'unreliable', 'radical',
            'inexperienced', 'unqualified', 'controversial', 'extreme'],
    score: -300  // Increased from -20 to -300
  }
};

// Political entity indicators
const POLITICAL_ENTITIES = {
  conservative: {
    parties: ['republican', 'gop', 'conservative party'],
    organizations: ['heritage foundation', 'federalist society', 'americans for prosperity'],
    ideologies: ['conservative', 'right-wing', 'traditionalist'],
    score: 150  // Increased from 10 to 150
  },
  liberal: {
    parties: ['democrat', 'democratic party', 'progressive party'],
    organizations: ['aclu', 'planned parenthood', 'moveon'],
    ideologies: ['liberal', 'progressive', 'left-wing'],
    score: -150  // Increased from -10 to -150
  }
};

// Add more contextual sentiment patterns
const SENTIMENT_PATTERNS = {
  conservative_criticizing_liberal: {
    phrases: [
      'radical left', 'leftist agenda', 'liberal elite', 'socialist agenda',
      'liberal media', 'liberal bias', 'liberal tears', 'liberal snowflakes',
      'woke', 'cancel culture', 'identity politics', 'liberal indoctrination'
    ],
    modifiers: [
      'sad', 'angry', 'unhappy', 'lonely', 'miserable', 'confused',
      'radical', 'extreme', 'crazy', 'delusional', 'weak', 'failed'
    ],
    score: 25 // Positive score indicates conservative bias
  },
  liberal_criticizing_conservative: {
    phrases: [
      'far right', 'right wing', 'conservative bias', 'republican agenda',
      'maga', 'trump supporter', 'conservative media', 'fox news',
      'conspiracy theory', 'anti-science', 'climate denial'
    ],
    modifiers: [
      'extreme', 'radical', 'dangerous', 'hateful', 'racist', 'bigoted',
      'anti-democratic', 'authoritarian', 'corrupt', 'backwards'
    ],
    score: -25 // Negative score indicates liberal bias
  }
};

// Add this to the top with other constants
const NARRATIVE_PATTERNS = {
  conservative_framing: {
    targets: ['liberal', 'liberals', 'liberal women', 'democrat', 'democrats'],
    negative_descriptors: [
      'unhappy', 'lonely', 'unsatisfied', 'miserable', 'depressed',
      'angry', 'frustrated', 'unfulfilled', 'dissatisfied'
    ],
    comparative_phrases: [
      'more likely', 'less likely', 'compared to', 'than conservative',
      'than republicans', 'while conservative'
    ],
    score: 75  // High score for this type of framing
  }
};

// Define bias indicators with stronger weights
const BIAS_INDICATORS = {
  conservative: {
    // Words that indicate conservative framing
    narrative_frames: {
      'liberal': -50,  // Negative description of liberals
      'democrat': -50,
      'left': -40,
      'progressive': -40,
      'socialism': -60,
      'radical': -40
    },
    // Phrases that strongly indicate conservative bias
    phrases: {
      'liberal agenda': 75,
      'radical left': 75,
      'socialist policies': 75,
      'liberal elite': 75,
      'mainstream media': 50,
      'fake news': 50,
      'liberal bias': 75
    },
    // Words often used by conservatives to criticize
    criticism_words: {
      'failed': 30,
      'radical': 30,
      'socialist': 40,
      'corrupt': 30,
      'dangerous': 30,
      'disaster': 30
    }
  }
};

/**
 * Enhanced sentiment analysis with better context awareness
 */
function analyzeSentimentWithContext(text, politicalContent) {
  const lowerText = text.toLowerCase();
  let score = 0;

  // First check for conservative narrative framing of liberals
  if (lowerText.includes('liberal') || lowerText.includes('democrat')) {
    // Check for negative descriptors
    const negativeDescriptors = [
      'unhappy', 'lonely', 'unsatisfied', 'miserable', 'depressed',
      'angry', 'frustrated', 'unfulfilled', 'dissatisfied', 'sad'
    ];

    // Count how many negative descriptors are used
    let negativeCount = 0;
    negativeDescriptors.forEach(descriptor => {
      if (lowerText.includes(descriptor)) {
        negativeCount++;
        score += 25; // Add to conservative score for each negative descriptor
      }
    });

    // Check for comparative framing
    const comparativePatterns = [
      'more likely', 'less likely', 'compared to', 'than conservative',
      'while conservative', 'unlike conservative'
    ];

    comparativePatterns.forEach(pattern => {
      if (lowerText.includes(pattern)) {
        score += 35; // Add more for comparative framing
      }
    });

    // If we found negative descriptors, this is likely conservative criticism
    if (negativeCount > 0) {
      // Ensure positive score for conservative bias
      return Math.max(-100, Math.min(100, Math.abs(score)));
    }
  }

  // If no conservative narrative framing was found, use the existing sentiment logic
  const sentimentResult = sentiment.analyze(text);
  score = sentimentResult.comparative * 1500;

  // Apply political context adjustments
  switch (politicalContent.bias) {
    case 'conservative':
      return Math.max(-100, Math.min(100, score * (score > 0 ? 3 : 1.5)));
    case 'liberal':
      return Math.max(-100, Math.min(100, -score * (score > 0 ? 3 : 1.5)));
    case 'mixed':
      return Math.max(-100, Math.min(100, score * 0.5));
    default:
      return 0;
  }
}

/**
 * Enhanced political content analysis with context awareness
 */
function analyzePoliticalContent(sentence, patterns) {
  const result = {
    found: false,
    bias: 'neutral',
    weight: 1500,
    entities: [],
    intensity: 0,
    context: 'neutral' // Track if criticism or support
  };

  const text = sentence.text().toLowerCase();
  const words = text.split(/\s+/);
  const uniqueWords = new Set(words);

  // Track word frequencies
  const wordFrequencies = {};
  words.forEach(word => {
    wordFrequencies[word] = (wordFrequencies[word] || 0) + 1;
  });

  // Helper function to check patterns with context
  const checkPatterns = (category, patterns, biasType) => {
    patterns[biasType][category].forEach(pattern => {
      if (text.includes(pattern.toLowerCase())) {
        result.found = true;
        
        // Apply diminishing returns for repeated patterns
        const frequency = wordFrequencies[pattern.toLowerCase()] || 1;
        const adjustedWeight = patterns[biasType].weight * (1 + Math.log(frequency)) / frequency;
        
        result.entities.push({ 
          pattern, 
          category,
          frequency,
          adjustedWeight 
        });
        
        result.intensity += adjustedWeight;

        // Determine if this is criticism or support
        if (category === 'criticisms') {
          // If criticizing liberals, it's conservative bias
          if (biasType === 'liberal') {
            result.bias = 'conservative';
            result.context = 'criticism';
          }
          // If criticizing conservatives, it's liberal bias
          else if (biasType === 'conservative') {
            result.bias = 'liberal';
            result.context = 'criticism';
          }
        } else {
          if (result.bias === 'neutral') {
            result.bias = biasType;
            result.context = 'support';
          }
        }
      }
    });
  };

  // Check all pattern categories
  ['figures', 'policies', 'phrases', 'criticisms'].forEach(category => {
    checkPatterns(category, politicalPatterns, 'conservative');
    checkPatterns(category, politicalPatterns, 'liberal');
  });

  // Adjust weight based on context and intensity
  result.weight = Math.min(100, (result.weight + (result.intensity * 1.5)) / 15);
  
  return result;
}

/**
 * Enhanced bias score computation with better averaging
 */
function computeWeightedBiasScore(sentences) {
  if (sentences.length === 0) return 0;

  // Track running averages per context
  const contextScores = {
    criticism: { total: 0, count: 0 },
    support: { total: 0, count: 0 },
    neutral: { total: 0, count: 0 }
  };

  sentences.forEach(sentence => {
    let adjustedScore = sentence.sentiment;
    const context = sentence.bias === 'mixed' ? 'neutral' : 
                   sentence.entities.some(e => e.category === 'criticisms') ? 'criticism' : 'support';

    // Apply context-specific adjustments
    if (context === 'criticism') {
      // Flip the score if criticizing the opposite ideology
      if (sentence.bias === 'conservative' && sentence.text.toLowerCase().includes('liberal')) {
        adjustedScore = Math.abs(adjustedScore);
      } else if (sentence.bias === 'liberal' && sentence.text.toLowerCase().includes('conservative')) {
        adjustedScore = -Math.abs(adjustedScore);
      }
    }

    contextScores[context].total += adjustedScore * sentence.weight;
    contextScores[context].count += sentence.weight;
  });

  // Compute weighted average for each context
  let finalScore = 0;
  let totalWeight = 0;

  Object.entries(contextScores).forEach(([context, scores]) => {
    if (scores.count > 0) {
      const contextWeight = context === 'criticism' ? 2 : 1; // Weight criticism more heavily
      finalScore += (scores.total / scores.count) * contextWeight;
      totalWeight += contextWeight;
    }
  });

  // Normalize final score
  const normalizedScore = totalWeight > 0 ? (finalScore / totalWeight) : 0;
  
  // Scale to -100 to 100 range
  return Math.max(-100, Math.min(100, normalizedScore * 1.5));
}

/**
 * Compute political bias score using NLP and sentiment analysis
 * @param {string} text - The article text to analyze
 * @returns {Object} Bias analysis results
 */
function computeBiasScore(text) {
  try {
    const doc = nlp(text);
    let totalScore = 0;
    let evidenceCount = 0;
    const flaggedSections = [];

    // Process each sentence for politically charged content
    doc.sentences().forEach(sentence => {
      const sentenceText = sentence.text();
      const lowerText = sentenceText.toLowerCase();
      let sectionScore = 0;
      let sectionEvidence = 0;

      // Check for conservative criticism of liberals
      if (lowerText.includes('liberal') || lowerText.includes('democrat')) {
        const negativeWords = ['unhappy', 'angry', 'sad', 'lonely', 'miserable', 'failed', 
                             'unsatisfied', 'dissatisfied', 'least likely'];
        negativeWords.forEach(word => {
          if (lowerText.includes(word)) {
            sectionScore += 50;
            sectionEvidence++;
          }
        });

        // Check for comparative statements
        if (lowerText.includes('conservative') && 
            (lowerText.includes('more') || lowerText.includes('than') || 
             lowerText.includes('likely') || lowerText.includes('compared'))) {
          sectionScore += 75;
          sectionEvidence++;
        }
      }

      // Check for statistical comparisons
      if (lowerText.includes('percent') || lowerText.includes('%')) {
        if (lowerText.includes('conservative') && lowerText.includes('liberal')) {
          sectionScore += 50;
          sectionEvidence++;
        }
      }

      // If this sentence has significant political content, flag it
      if (Math.abs(sectionScore) > 25 || sectionEvidence > 0) {
        flaggedSections.push({
          text: sentenceText,
          score: sectionScore,
          evidence: sectionEvidence
        });
      }

      totalScore += sectionScore;
      evidenceCount += sectionEvidence;
    });

    // Sort flagged sections by absolute score
    flaggedSections.sort((a, b) => Math.abs(b.score) - Math.abs(a.score));

    // Compute final score
    const finalScore = evidenceCount > 0 ? 
      Math.max(-100, Math.min(100, totalScore / Math.max(1, evidenceCount))) : 0;

    return {
      score: finalScore,
      confidence: Math.min(1, evidenceCount / 5),
      evidence: evidenceCount,
      flaggedSections: flaggedSections.slice(0, 5) // Return top 5 most charged sections
    };

  } catch (error) {
    console.error('Bias computation failed:', error);
    return {
      score: 0,
      confidence: 0,
      error: error.message,
      flaggedSections: []
    };
  }
}

/**
 * Compute confidence score based on analysis quality
 * @param {Array} sentences - Analyzed political sentences
 * @returns {number} Confidence score
 */
function computeConfidenceScore(sentences) {
  if (sentences.length === 0) return 0;

  // Consider both quantity and quality of analyzed sentences
  const quantityFactor = Math.min(1, sentences.length / 10);
  const qualityFactor = sentences.reduce((sum, s) => sum + s.weight, 0) / sentences.length;

  return Math.min(1, quantityFactor * qualityFactor);
}

// Main content extraction functionality for Clearview
console.log('Clearview content script loaded');

// Export the extract function for use by the extension
window.clearviewExtractContent = () => {
  try {
    // Verify Readability is available
    if (typeof Readability === 'undefined') {
      throw new Error('Readability library not found');
    }

    // Create a clean copy of the document
    const documentClone = document.cloneNode(true);
    
    // Create a new Readability object
    const reader = new Readability(documentClone);
    
    // Parse the content
    const article = reader.parse();
    
    if (!article) {
      throw new Error('Could not parse article content');
    }

    // Process the text with Compromise
    const doc = nlp(article.textContent);
    
    // Compute bias score
    const biasAnalysis = computeBiasScore(article.textContent);

    // Basic NLP analysis
    const analysis = {
      sentences: doc.sentences().length,
      topics: doc.topics().json(),
      nouns: doc.nouns().json(),
      bias: biasAnalysis
    };

    return {
      success: true,
      article: {
        title: article.title,
        content: article.textContent,
        excerpt: article.excerpt,
        byline: article.byline,
        siteName: article.siteName,
        analysis: analysis
      }
    };

  } catch (error) {
    console.error('Content extraction failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Verify the function is available
console.log('Content extractor initialized, function available:', typeof window.clearviewExtractContent === 'function');

// Log successful initialization
console.log('Content extractor initialized'); 