// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

chrome.downloads.onCreated.addListener(function (downloadItem){
  chrome.downloads.pause(downloadItem.id, function (){});
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
    	"message": "download_created", 
    	"downloadItem" : downloadItem
    });
  });
});

// This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "display_info" ) {
      	chrome.processes.getProcessIdForTab(request.tabId, function (){
      		
      	});
    }
    if( request.message === "download_cancelled" ) {
	 	chrome.downloads.cancel(request.downloadId, function (){

	 	});
	}
    if( request.message === "download_resumed" ) {
	 	chrome.downloads.resume(request.downloadId, function (){

	 	});
	}
  }
);