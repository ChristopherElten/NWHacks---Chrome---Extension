chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      
      console.log(myIP());

      chrome.runtime.sendMessage({"message": "display_info", "url": firstHref});
    }

    if( request.message === "download_created" ) {
		var shouldDownload = prompt("Do you want to cancel this download?", "Yes/No");
		if (shouldDownload == "Yes") {
		  chrome.runtime.sendMessage({
		  	"message": "download_cancelled",
		  	"downloadId" : request.downloadItem.id
		  });
		} else if (shouldDownload == "No"){
		  chrome.runtime.sendMessage({
		  	"message": "download_resumed",
		  	"downloadId" : request.downloadItem.id
		  });
			console.log("Downlad allowed...");
		}         
    }

  }
);

// Credit goes where credit is due...
// http://stackoverflow.com/questions/391979/get-client-ip-using-just-javascript/32841164#32841164
myIP = function (onNewIP){     //  onNewIp - your listener function for new IP, if not passed, it just gets printed to console
  onNewIP =  onNewIP || function(ip){ console.log('IP found: ', ip)};      
  var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
  var pc = new myPeerConnection({iceServers:[]}), noop = function(){}, localIPs= {}, ipRegex=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g, key;      
  function ipIterate(ip){
    if(!localIPs[ip])   onNewIP(ip);
    localIPs[ip]=true; 
  }
  pc.createDataChannel("");    //create a bogus data channel
  pc.createOffer(function(sdp){
    sdp.sdp.split('\n').forEach(function(line){
      if(line.indexOf('candidate')<0)   return;
      line.match(ipRegex).forEach(ipIterate);
    });
    pc.setLocalDescription(sdp, noop, noop);
  }, noop);    // create offer and set local description
  pc.onicecandidate = function(ice){  //listen for candidate events
    if(!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex))  return;
    ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
  };
}