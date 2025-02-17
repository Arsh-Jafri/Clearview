// Background script for Clearview
chrome.runtime.onInstalled.addListener(() => {
  console.log('Clearview extension installed');
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handle any background tasks here
  return true;
}); 