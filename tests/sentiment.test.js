import nlp from 'compromise';
import { analyzeSentimentWithContext, analyzePoliticalContent, computeBiasScore } from '../content/content.js';

// Test cases for political bias detection
const testCases = [
  {
    name: "Conservative criticism of liberals",
    text: "Liberal voters are more likely to be unhappy and dissatisfied compared to conservatives.",
    expectedBias: "conservative",
    expectedScore: ">50"
  },
  {
    name: "Word variations test",
    text: "The radical leftists are pushing their radicalized agenda through radical policies.",
    expectedBias: "conservative",
    expectedScore: ">30"
  },
  {
    name: "Liberal criticism of conservatives",
    text: "Conservative policies have systematically undermined progress on climate change.",
    expectedBias: "liberal",
    expectedScore: "<-30"
  },
  {
    name: "Neutral reporting",
    text: "Both Democratic and Republican leaders met to discuss the infrastructure bill.",
    expectedBias: "neutral",
    expectedScore: "between -20 and 20"
  },
  {
    name: "Complex political analysis",
    text: `
      While conservatives argue for traditional values, progressives push for systemic change.
      The debate has become increasingly polarized, with radical elements on both sides.
      Liberal activists claim the conservative approach is outdated, while conservative voices
      criticize what they call a socialist agenda.
    `,
    expectedBias: "mixed",
    expectedScore: "complex analysis needed"
  }
];

// Run tests
function runTests() {
  console.log('Starting sentiment analysis tests...\n');
  
  testCases.forEach((testCase, index) => {
    console.log(`Test ${index + 1}: ${testCase.name}`);
    console.log('Text:', testCase.text);
    
    const biasResult = computeBiasScore(testCase.text);
    
    console.log('\nResults:');
    console.log('Bias Score:', biasResult.score);
    console.log('Confidence:', biasResult.confidence);
    console.log('Flagged Sections:', biasResult.flaggedSections);
    
    // Validate results
    console.log('\nValidation:');
    console.log('Expected Bias:', testCase.expectedBias);
    console.log('Actual Score:', biasResult.score);
    console.log('Meets Expectations:', validateResult(biasResult, testCase));
    console.log('\n' + '-'.repeat(80) + '\n');
  });
}

// Helper function to validate results
function validateResult(result, expected) {
  if (expected.expectedScore.startsWith('>')) {
    return result.score > parseInt(expected.expectedScore.slice(1));
  } else if (expected.expectedScore.startsWith('<')) {
    return result.score < parseInt(expected.expectedScore.slice(1));
  } else if (expected.expectedScore.startsWith('between')) {
    const [min, max] = expected.expectedScore.split('between ')[1].split(' and ').map(Number);
    return result.score >= min && result.score <= max;
  }
  return true; // For complex analysis cases
}

// Additional test cases for specific features
const featureTests = {
  wordVariations: [
    "The radical left is pushing their agenda",
    "These radicalized policies are dangerous",
    "Their rhetoric has become more radical lately"
  ],
  
  phraseMixing: [
    "Conservative values mixed with progressive ideas",
    "Bipartisan effort to address climate change",
    "Moderate approach to healthcare reform"
  ],
  
  contextualAnalysis: [
    "Liberals tend to support environmental regulations",
    "Conservatives generally favor lower taxes",
    "Progressives advocate for social programs"
  ]
};

// Run feature-specific tests
function runFeatureTests() {
  console.log('Running feature-specific tests...\n');
  
  Object.entries(featureTests).forEach(([feature, tests]) => {
    console.log(`Testing ${feature}:`);
    
    tests.forEach((text, index) => {
      const result = computeBiasScore(text);
      console.log(`\nTest ${index + 1}:`);
      console.log('Text:', text);
      console.log('Score:', result.score);
      console.log('Confidence:', result.confidence);
      if (result.flaggedSections.length > 0) {
        console.log('Flagged:', result.flaggedSections[0].text);
      }
    });
    
    console.log('\n' + '-'.repeat(80) + '\n');
  });
}

// Run all tests
console.log('=== Clearview Sentiment Analysis Tests ===\n');
runTests();
runFeatureTests(); 