// Simple background script for Shortly extension

// Omnibox handler - ONLY method for short links
chrome.omnibox.onInputEntered.addListener((text, disposition) => {
  // Support both 'mylink' and 'go/mylink' formats
  let key = text;
  if (text.includes('/')) {
    const parts = text.split('/');
    key = parts[1] || parts[0];
  }
  // Get stored settings (no longer need prefix)
  chrome.storage.sync.get(['shortLinks'], (result) => {
    const shortLinks = result.shortLinks || {};
    // Check if this matches a short key
    if (shortLinks[key]) {
      const url = shortLinks[key];
      if (disposition === 'currentTab') {
        chrome.tabs.update({ url: url });
      } else if (disposition === 'newForegroundTab') {
        chrome.tabs.create({ url: url });
      } else if (disposition === 'newBackgroundTab') {
        chrome.tabs.create({ url: url, active: false });
      }
    } else {
      // Fallback to search
      chrome.tabs.update({ url: `https://www.google.com/search?q=${encodeURIComponent(text)}` });
    }
  });
});

// Message listener for debug/testing
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStorage') {
    chrome.storage.sync.get(['prefix', 'shortLinks'], (result) => {
      sendResponse(result);
    });
    return true;
  }
  if (request.action === 'test') {
    sendResponse({status: 'ok', message: 'Background script is working'});
    return true;
  }
});