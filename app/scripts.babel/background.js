'use strict';


chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.storage.local.get('autoResize', ({autoResize}) => {
  chrome.browserAction.setBadgeText({text: autoResize? 'ON': ''});
})

console.log('\'Allo \'Allo! Event Page for Browser Action');
