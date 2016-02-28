chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");
      console.log(firstHref);

      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }

    if( request.message === "download_created" ) {
    	console.log(request);
		var shouldDownload = prompt("Do you want to cancel this download?", "Yes/No");
		if (shouldDownload == "Yes") {
		  chrome.runtime.sendMessage({
		  	"message": "download_created",
		  	"downloadId" : request.downloadItem.id
		  });
		} else {
			console.log("Downlad allowed...");
		}         
    }

  }
);