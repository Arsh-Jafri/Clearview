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
      'socialist agenda', 'radical left', 'leftist policies',
      'liberal elite', 'democrat policies', 'progressive agenda',
      'socialist programs', 'liberal bias', 'leftist media',
      'radical democrat', 'socialist democrat', 'marxist ideology',
      'big government', 'tax and spend', 'welfare state',
      'identity politics', 'cancel culture', 'political correctness',
      'woke ideology', 'radical agenda', 'socialist policies',
      'government overreach', 'liberal indoctrination', 'leftist propaganda'
    ],
    policy_references: [
      'conservative approach', 'republican policy', 'conservative solution',
      'right-wing perspective', 'traditional values', 'conservative principles'
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
      'far-right agenda', 'conservative bias', 'republican obstruction',
      'right-wing extremism', 'conservative propaganda', 'regressive policies',
      'anti-science stance', 'climate denial', 'conservative media bias',
      'conservative policies', 'conservative agenda', 'conservative approach',
      'republican policies', 'right-wing policies', 'conservative ideology',
      'regressive approach', 'backwards thinking', 'outdated views',
      'anti-progress', 'science denial', 'climate inaction',
      'conservative obstruction', 'republican obstruction', 'conservative resistance',
      'undermined progress', 'blocked reform', 'opposed progress',
      'conservative failure', 'republican failure', 'failed policies',
      'corporate interests', 'special interests', 'donor class',
      'conservative establishment', 'republican establishment',
      'systemic inequality', 'voter suppression', 'discriminatory policies',
      'anti-environment', 'anti-worker', 'anti-regulation',
      'trickle-down economics', 'tax cuts for the rich', 'wealth inequality',
      'conservative extremism', 'right-wing extremism', 'far-right ideology'
    ],
    policy_references: [
      'liberal approach', 'democratic policy', 'progressive solution',
      'left-wing perspective', 'progressive values', 'liberal principles'
    ],
    negative_descriptors: [
      'regressive', 'backwards', 'outdated', 'obsolete',
      'harmful', 'dangerous', 'extreme', 'radical',
      'oppressive', 'discriminatory', 'unfair', 'unjust',
      'anti-democratic', 'authoritarian', 'corrupt', 'failed'
    ],
    policy_criticisms: [
      'undermined', 'blocked', 'opposed', 'prevented',
      'obstructed', 'resisted', 'rejected', 'denied',
      'ignored', 'dismissed', 'neglected', 'failed'
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

// Add this helper function after the constants
function getWordVariations(word) {
  const doc = nlp(word);
  const variations = new Set();
  
  // Add original word
  variations.add(word.toLowerCase());
  
  // Add root form
  doc.verbs().toInfinitive().forEach(v => variations.add(v.text().toLowerCase()));
  
  // Add different forms
  doc.verbs().conjugate().forEach(conj => {
    Object.values(conj).forEach(form => variations.add(form.toLowerCase()));
  });
  
  // Add singular/plural forms for nouns
  doc.nouns().toSingular().forEach(n => variations.add(n.text().toLowerCase()));
  doc.nouns().toPlural().forEach(n => variations.add(n.text().toLowerCase()));
  
  return Array.from(variations);
}

/**
 * Enhanced sentiment analysis with better context awareness
 */
function analyzeSentimentWithContext(text, politicalContent) {
  const lowerText = text.toLowerCase();
  let score = 0;

  // Comparative analysis patterns with adjusted weights
  const comparativePatterns = {
    conservative: {
      target: ['liberal', 'liberals', 'democrats', 'left-wing'],
      comparison: ['compared to', 'more likely', 'less likely', 'than', 'unlike'],
      negative: ['unhappy', 'dissatisfied', 'angry', 'frustrated', 'miserable']
    },
    liberal: {
      target: ['conservative', 'conservatives', 'republicans', 'right-wing'],
      comparison: ['compared to', 'more likely', 'less likely', 'than', 'unlike'],
      negative: ['regressive', 'harmful', 'damaging', 'backwards', 'outdated']
    }
  };

  // Enhanced comparison analysis with higher weights
  function analyzeComparison(patterns) {
    let score = 0;
    patterns.target.forEach(target => {
      patterns.comparison.forEach(comp => {
        patterns.negative.forEach(neg => {
          if (lowerText.includes(`${target}`) && 
              lowerText.includes(`${comp}`) && 
              lowerText.includes(`${neg}`)) {
            score += 75; // Increased from 50 for stronger comparative bias
          }
        });
      });
    });
    return score;
  }

  // Adjusted radical terms analysis
  function analyzeRadicalTerms() {
    const radicalTerms = ['radical', 'radicalized', 'extreme', 'extremist'];
    let count = 0;
    radicalTerms.forEach(term => {
      const regex = new RegExp(term, 'gi');
      const matches = lowerText.match(regex) || [];
      count += matches.length;
    });
    return count > 1 ? 25 * count : 15; // Reduced from 40 for more moderate scoring
  }

  // Refined systematic criticism analysis
  function analyzeSystematicCriticism() {
    const systematicTerms = ['systematically', 'consistently', 'repeatedly', 'continuously'];
    const negativeActions = ['undermine', 'damage', 'destroy', 'harm', 'block'];
    
    let score = 0;
    systematicTerms.forEach(systematic => {
      negativeActions.forEach(action => {
        if (lowerText.includes(systematic) && lowerText.includes(action)) {
          score += 35; // Reduced from 45 for more balanced scoring
        }
      });
    });
    return score;
  }

  // Apply comparative analysis with proper weighting
  const conservativeComparison = analyzeComparison(comparativePatterns.conservative);
  const liberalComparison = analyzeComparison(comparativePatterns.liberal);
  
  // Add radical terms analysis with reduced weight
  const radicalScore = analyzeRadicalTerms();
  
  // Add systematic criticism analysis
  const systematicScore = analyzeSystematicCriticism();

  // Combine scores with proper polarity and balanced weights
  if (conservativeComparison > 0) {
    score += conservativeComparison * 1.2; // Boost conservative criticism slightly
  }
  if (liberalComparison > 0) {
    score -= liberalComparison * 1.2; // Boost liberal criticism slightly
  }
  if (radicalScore > 0 && lowerText.includes('leftist')) {
    score += radicalScore * 0.8; // Reduced multiplier for radical terms
  }
  if (systematicScore > 0 && lowerText.includes('conservative')) {
    score -= systematicScore * 0.8; // Reduced multiplier for systematic criticism
  }

  // Get base sentiment with reduced weight
  const sentimentResult = sentiment.analyze(text);
  const baseSentiment = sentimentResult.comparative * 1000; // Reduced from 1500
  
  // Adjust factual statement detection
  const hasFactualPattern = lowerText.match(/(tend to|generally|typically|usually|often) (support|favor|prefer|advocate)/i);
  if (hasFactualPattern) {
    score *= 0.3; // Significantly reduce score for factual statements
  }
  
  // Weight the components with better balance
  const finalScore = (score * 0.8) + (baseSentiment * 0.2);
  
  // Apply softer non-linear scaling
  if (Math.abs(finalScore) > 35) {
    const direction = finalScore > 0 ? 1 : -1;
    return direction * (35 + Math.pow(Math.abs(finalScore) - 35, 1.2));
  }
  
  return Math.max(-100, Math.min(100, finalScore));
}

/**
 * Enhanced political content analysis with better balance
 */
function analyzePoliticalContent(text, patterns) {
  const result = {
    found: false,
    bias: 'neutral',
    intensity: 0,
    entities: [],
    context: 'neutral',
    weight: 1500
  };

  // Helper function to check patterns with balanced weights
  const checkPatterns = (category, biasType, patternArray) => {
    if (!Array.isArray(patternArray)) return;

    patternArray.forEach(pattern => {
      const words = pattern.toLowerCase().split(' ');
      const textLower = text.toLowerCase();
      
      // Check for exact phrase match with balanced intensity
      if (words.length > 1 && textLower.includes(pattern.toLowerCase())) {
        result.found = true;
        result.entities.push(pattern);
        
        // Adjusted base intensities for better balance
        let baseIntensity;
        if (category === 'criticisms') {
          result.context = 'criticism';
          result.bias = biasType;
          baseIntensity = 2.5; // Reduced from 3.5
        } else if (category === 'phrases') {
          result.context = 'support';
          result.bias = biasType;
          baseIntensity = 1.0; // Reduced from 1.5
        } else {
          result.context = 'support';
          result.bias = biasType;
          baseIntensity = 0.7; // Reduced from 1.0
        }

        // Enhanced modifier detection with better scaling
        const hasStrongModifiers = textLower.match(/(very|extremely|strongly|deeply|clearly|obviously)/g);
        const hasModerateModifiers = textLower.match(/(generally|tend to|typically|usually|often)/g);
        const hasFactualModifiers = textLower.match(/(favor|support|advocate|propose)/g);
        const hasBalancedLanguage = textLower.match(/(while|however|although|both|either)/g);
        
        // Refined modifier adjustments
        if (hasStrongModifiers) {
          baseIntensity *= 1.3; // Reduced from 1.5
        } else if (hasModerateModifiers) {
          baseIntensity *= 0.4; // Reduced from 0.5
        } else if (hasFactualModifiers) {
          baseIntensity *= 0.2; // Reduced from 0.3
        }
        
        // Reduce intensity for balanced language
        if (hasBalancedLanguage) {
          baseIntensity *= 0.5;
        }

        result.intensity += biasType === 'conservative' ? baseIntensity : -baseIntensity;
      }
      
      // Enhanced word variation detection with balanced weights
      words.forEach(word => {
        const variations = getWordVariations(word);
        variations.forEach(variation => {
          if (textLower.includes(variation)) {
            result.found = true;
            result.entities.push(word);
            
            // Adjusted word intensity scaling
            let wordIntensity = 0.3; // Reduced base intensity
            if (['radical', 'extreme', 'socialist', 'fascist'].includes(word)) {
              wordIntensity = 0.8; // Reduced from 1.5
            } else if (['generally', 'tend', 'typically'].includes(word)) {
              wordIntensity = 0.2; // Reduced from 0.3
            }
            
            if (category === 'criticisms') {
              result.context = 'criticism';
              result.bias = biasType;
              result.intensity += (biasType === 'conservative' ? 1.0 : -1.0) * wordIntensity;
            } else {
              result.context = 'support';
              result.bias = biasType;
              result.intensity += (biasType === 'conservative' ? 0.5 : -0.5) * wordIntensity;
            }
          }
        });
      });
    });
  };

  // Check for balanced political content
  const hasOpposingViews = text.toLowerCase().match(
    /(both.*and|while.*however|conservatives.*liberals|republicans.*democrats)/i
  );
  
  if (hasOpposingViews) {
    result.bias = 'mixed';
    result.intensity *= 0.5; // Reduce intensity for balanced content
  }

  // Check patterns with priority ordering
  ['criticisms', 'negative_descriptors', 'phrases', 'policies'].forEach(category => {
    if (patterns.conservative[category]) {
      checkPatterns(category, 'conservative', patterns.conservative[category]);
    }
    if (patterns.liberal[category]) {
      checkPatterns(category, 'liberal', patterns.liberal[category]);
    }
  });

  return result;
}

/**
 * Compute weighted score with better balance
 */
function computeWeightedScore(political, sentiment) {
  let score = 0;
  const CRITICISM_MULTIPLIER = 2.5;    // Reduced from 3.0
  const SENTIMENT_WEIGHT = 0.3;        // Reduced from 0.4
  const POLITICAL_WEIGHT = 0.5;        // Reduced from 0.6
  const INTENSITY_BOOST = 1.0;         // Reduced from 1.2
  const SUBTLETY_FACTOR = 0.3;         // Reduced from 0.4
  
  if (political.found) {
    let politicalScore = political.intensity * POLITICAL_WEIGHT;
    
    // Better handling of mixed/moderate content
    if (political.bias === 'mixed') {
      politicalScore *= SUBTLETY_FACTOR;
    }
    
    // Balanced criticism handling
    if (political.context === 'criticism') {
      if (political.bias === 'conservative') {
        politicalScore = Math.abs(politicalScore) * CRITICISM_MULTIPLIER;
      } else if (political.bias === 'liberal') {
        politicalScore = -Math.abs(politicalScore) * CRITICISM_MULTIPLIER;
      }
    } else {
      // Reduced scaling for regular political content
      politicalScore *= political.bias === 'conservative' ? 0.5 : -0.5;
    }
    
    // More nuanced signal boosting
    if (Math.abs(political.intensity) > 2.0) {
      politicalScore *= INTENSITY_BOOST;
    } else if (Math.abs(political.intensity) < 1.0) {
      politicalScore *= SUBTLETY_FACTOR;
    }
    
    score += politicalScore;
  }
  
  // More balanced sentiment handling
  const sentimentComponent = sentiment * SENTIMENT_WEIGHT;
  if (political.found) {
    if (political.context === 'criticism') {
      if (political.bias === 'conservative') {
        score += Math.abs(sentimentComponent) * INTENSITY_BOOST;
      } else if (political.bias === 'liberal') {
        score -= Math.abs(sentimentComponent) * INTENSITY_BOOST;
      }
    } else {
      const sentimentScale = political.bias === 'mixed' ? SUBTLETY_FACTOR : 0.5;
      score += political.bias === 'conservative' ? 
        sentimentComponent * sentimentScale : 
        -sentimentComponent * sentimentScale;
    }
  } else {
    score += sentimentComponent * SUBTLETY_FACTOR;
  }
  
  return Math.max(-100, Math.min(100, score));
}

/**
 * Compute bias score with corrected evidence classification
 */
function computeBiasScore(text) {
  try {
    const doc = nlp(text);
    let sentences = doc.sentences().out('array');
    const results = [];
    const flaggedSections = [];

    sentences.forEach(sentence => {
      if (!sentence || typeof sentence !== 'string') return;

      // Get political and sentiment analysis
      const politicalContent = analyzePoliticalContent(sentence, politicalPatterns);
      const sentimentContext = analyzeSentimentWithContext(sentence, politicalContent);
      
      // Enhanced flagging criteria with corrected classification
      if (politicalContent.found || Math.abs(sentimentContext) > 25) {
        // Determine criticism context first
        const isCriticizingLiberals = sentence.toLowerCase().match(
          /(liberal|democrat|left-wing|progressive).*(unhappy|dissatisfied|radical|extreme)/i
        );
        const isCriticizingConservatives = sentence.toLowerCase().match(
          /(conservative|republican|right-wing).*(undermine|regressive|outdated|backwards)/i
        );

        // Set correct bias and context based on criticism target
        if (isCriticizingLiberals) {
          politicalContent.bias = 'conservative';
          politicalContent.context = 'criticism';
        } else if (isCriticizingConservatives) {
          politicalContent.bias = 'liberal';
          politicalContent.context = 'criticism';
        }

        // Compute section score with correct polarity
        const sectionScore = computeWeightedScore(politicalContent, sentimentContext);
        
        // Ensure correct polarity based on bias
        const finalSectionScore = politicalContent.bias === 'conservative' ? 
          Math.abs(sectionScore) : -Math.abs(sectionScore);

        // Add to results with corrected classification
        results.push({
          text: sentence,
          political: politicalContent,
          sentiment: sentimentContext,
          weight: politicalContent.weight,
          score: finalSectionScore
        });

        // Create flagged section with correct evidence
        flaggedSections.push({
          text: sentence,
          score: finalSectionScore,
          evidence: {
            political: politicalContent.entities,
            sentiment: sentimentContext,
            context: politicalContent.context,
            bias: politicalContent.bias
          }
        });
      }
    });

    // Compute final score with corrected aggregation
    const finalScore = computeAggregateScore(results);
    
    return {
      score: finalScore,
      confidence: computeConfidenceScore(results),
      evidence: results.length,
      flaggedSections: flaggedSections.slice(0, 5)
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
 * Compute aggregate score with corrected polarity
 */
function computeAggregateScore(results) {
  if (results.length === 0) return 0;

  let totalWeight = 0;
  let weightedSum = 0;
  const CRITICISM_BOOST = 4.0;
  const INTENSITY_FACTOR = 3.0;

  results.forEach(result => {
    let weight = result.weight;
    let score = result.score;
    
    // Enhanced criticism handling with correct polarity
    if (result.political.context === 'criticism') {
      weight *= CRITICISM_BOOST;
      
      // Ensure correct polarity based on who is being criticized
      if (result.political.bias === 'conservative') {
        // Conservative criticizing liberals = positive score
        score = Math.abs(score);
      } else if (result.political.bias === 'liberal') {
        // Liberal criticizing conservatives = negative score
        score = -Math.abs(score);
      }
    } else {
      // Regular political content maintains its sign
      score *= result.political.bias === 'conservative' ? 1 : -1;
    }
    
    // Scale by intensity while preserving sign
    const intensityBoost = 1 + (Math.abs(result.political.intensity) * INTENSITY_FACTOR / 40);
    score *= intensityBoost;
    
    weightedSum += score * weight;
    totalWeight += weight;
  });

  // Normalize while preserving polarity
  let finalScore = totalWeight > 0 ? weightedSum / totalWeight : 0;
  
  // Apply non-linear scaling while maintaining sign
  if (Math.abs(finalScore) > 25) {
    const direction = finalScore > 0 ? 1 : -1;
    finalScore = direction * (25 + Math.pow(Math.abs(finalScore) - 25, 1.5));
  }
  
  return Math.max(-100, Math.min(100, finalScore));
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

/**
 * Helper function to detect comparative criticism
 */
function hasComparativeCriticism(text) {
  const lowerText = text.toLowerCase();
  const comparativeTerms = ['compared to', 'more likely', 'less likely', 'than', 'unlike'];
  const targetTerms = ['liberal', 'conservative', 'democrat', 'republican'];
  
  return comparativeTerms.some(comp => 
    targetTerms.some(target => 
      lowerText.includes(comp) && lowerText.includes(target)
    )
  );
}

/**
 * Helper function to detect systematic criticism
 */
function hasSystematicCriticism(text) {
  const lowerText = text.toLowerCase();
  const systematicTerms = ['systematically', 'consistently', 'repeatedly'];
  const negativeTerms = ['undermine', 'damage', 'destroy', 'harm', 'block'];
  
  return systematicTerms.some(sys => 
    negativeTerms.some(neg => 
      lowerText.includes(sys) && lowerText.includes(neg)
    )
  );
}

// Main content extraction functionality for Clearview
console.log('Clearview content script loaded');

// Modify the export section to work in both environments
if (typeof window !== 'undefined') {
  // Browser environment
  window.clearviewExtractContent = () => {
    try {
      // Verify Readability is available
      if (typeof Readability === 'undefined') {
        throw new Error('Readability library not found');
      }

      // Create a clean copy of the document
      const documentClone = document.cloneNode(true);
      
      // Remove unwanted elements before parsing
      const unwantedSelectors = [
        // Navigation and menus
        'nav', 'header', 'footer', '[role="navigation"]',
        // Sidebars and widgets
        'aside', '.sidebar', '[role="complementary"]',
        // Forms and popups
        'form', '.newsletter-signup', '.subscription-form', '.popup', '.modal',
        // Paywalls
        '.paywall', '.subscription-wall', '.premium-content',
        // Comments and social
        '#comments', '.comments-section', '.social-share',
        // Recommendations
        '.recommended', '.related-articles', '.more-stories',
        // Advertisements
        '.advertisement', '.ad-container', '[class*="ad-"]',
        // Generic utility classes
        '.utility-bar', '.toolbar', '.menu'
      ];

      unwantedSelectors.forEach(selector => {
        const elements = documentClone.querySelectorAll(selector);
        elements.forEach(element => element.remove());
      });
      
      // Create a new Readability object with the cleaned document
      const reader = new Readability(documentClone, {
        // Readability options to better identify content
        charThreshold: 100,
        classesToPreserve: ['article-content', 'content-body', 'story-body'],
        keepClasses: false
      });
      
      // Parse the content
      const article = reader.parse();
      
      if (!article) {
        throw new Error('Could not parse article content');
      }

      // Additional validation of content
      if (!isValidArticleContent(article)) {
        throw new Error('Content appears to be non-article');
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

  // Browser-specific logging
  console.log('Content extractor initialized, function available:', 
    typeof window.clearviewExtractContent === 'function');
}

// Export functions for testing (will work in both Node.js and browser)
export {
  analyzeSentimentWithContext,
  analyzePoliticalContent,
  computeBiasScore
};

// Log successful initialization
console.log('Content extractor initialized');

// Helper function to validate article content
function isValidArticleContent(article) {
  // Check if content exists and has minimum length
  if (!article.content || article.content.length < 300) {
    return false;
  }

  // Check for required article properties
  if (!article.title || !article.siteName) {
    return false;
  }

  // Check content for common article indicators
  const hasArticleStructure = (
    article.content.includes('<p>') || 
    article.content.includes('<article') ||
    article.byline
  );

  // Check for red flags that indicate non-article content
  const redFlags = [
    'subscribe now',
    'sign up for our newsletter',
    'create an account',
    'login to continue',
    'subscribe to continue reading',
    'premium content',
    'menu',
    'navigation'
  ];

  const hasRedFlags = redFlags.some(flag => 
    article.content.toLowerCase().includes(flag)
  );

  // Content should have article structure and no red flags
  return hasArticleStructure && !hasRedFlags;
} 