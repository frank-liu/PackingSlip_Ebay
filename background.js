
function getDomainFromUrl(url){
	var host = "null";
	if(typeof url == "undefined" || null == url)
		url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match)
		host = match[1];
	return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
	if(getDomainFromUrl(tab.url).toLowerCase()=="vod.ebay.co.uk"){
		chrome.pageAction.show(tabId);
	}
};
chrome.tabs.onUpdated.addListener(checkForValidUrl);

var articleData = {};
 
articleData.error = "background 加载中...";
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest)
{
	if(request.type!=="pack-info")
		return;
	articleData = request;
	
	/*	if(!articleData.error){
		
		$.ajax({
			//url: "http://localhost/first_access.php",
			//cache: false,
			//type: "POST",
			//data: JSON.stringify({url:articleData.url}),
			//dataType: "json"
		}).done(function(msg) {
			if(msg.error){
				//articleData.firstAccess = msg.error;
				alert(msg.error);
				alert('message.error');
				
			} else {
				//articleData.firstAccess = msg.firstAccess;
				
				alert('message else:'+msg.error);
			}
		}).fail(function(jqXHR, textStatus) {
			alert('textStatus:'+textStatus);
			switch (jqXHR.readyState) {
			case 0: 
				alert('请求未初始化');
				break;
			case 1:
				alert('服务器连接已建立');
				break;
			case 2:
				alert('请求已接收');
				break;
			case 3:
				alert('请求处理中');
				break;
			case 4:
				alert('请求已完成，且响应已就绪');
				break;
			default:
				alert("....");
			}
			//articleData.firstAccess = textStatus;
		});
	}  */
	//alert("onMessage.addListener finished");
});
