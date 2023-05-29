// background.js

// Define the time intervals during which social media is accessible
const allowedStartTime = 9; // 9 AM
const allowedEndTime = 18; // 6 PM

// Function to check if the current time is within the allowed time interval
function isWithinAllowedTime() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  return currentHour >= allowedStartTime && currentHour < allowedEndTime;
}

// Function to update the blocking behavior
function updateBlockingBehavior() {
  const blockingEnabled = !isWithinAllowedTime();

  // Send a message to the content script to enable or disable blocking
  chrome.tabs.query({ url: "*://*.facebook.com/*" }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, { blockingEnabled });
    });
  });

  // Repeat the update every minute
  setTimeout(updateBlockingBehavior, 60000);
}

// Initial update
updateBlockingBehavior();
