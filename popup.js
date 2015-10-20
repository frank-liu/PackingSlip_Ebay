
document.addEventListener('DOMContentLoaded', function () {
	
	var data = chrome.extension.getBackgroundPage().articleData;
	if(data.error){
		$("#message").text(data.error);
		$("#content").hide();
		
	}
	else
	{	 
		$("#message").hide();
		$("#buyer-note").text(data.buyer_note);
		$("#buyer-id").val(data.buyer_id);
		
		$("#buyer-name").val(data.buyer_name);
		$("#buyer-addr1").val(data.buyer_addr1);
		$('#buyer-addr2').val(data.buyer_addr2);
		var cityStateZip=data.buyer_cityStateZip;
		var postcode= cityStateZip.slice(-9);
		postcode=postcode.substring(postcode.indexOf(' ') + ' '.length, postcode.length);
		var county=cityStateZip.substring(0, cityStateZip.indexOf(postcode));//county
		$("#buyer-cityStateZip").val(county);//county
		$('#buyer-postcode').val(postcode);
		$('#buyer-country').val(data.buyer_country);
		$("#item-id").val(data.item_id);
		//$("#item-qty").val(data.item_qty+"×");
		document.getElementById("item-nickname").defaultValue=(data.item_itemtitle);
		$("#item-nickname").val(data.item_qty + " × " + data.item_itemtitle);
		try
		{
			$('#input-form').one('submit',function(){
			var inputq1 = encodeURIComponent($('#buyer-name').val());
			var inputq2 = encodeURIComponent($('#buyer-addr1').val());
			var inputq3 = encodeURIComponent($('#buyer-addr2').val());
			var inputq4 = encodeURIComponent($('#buyer-cityStateZip').val());
			var inputq5 = encodeURIComponent($('#buyer-country').val());
			var inputq6 = encodeURIComponent($('#item-nickname').val());
			var inputq7 = encodeURIComponent($('#buyer-id').val());
			var inputq8 = encodeURIComponent($('#item-id').val());
			var inputq9 = encodeURIComponent($('#buyer-postcode').val());
			var inputq10 = encodeURIComponent("ready");//"ready" means the order is ready to print off.
			
			var q2ID = "entry.1180815465";
			var q1ID = "entry.1311524753";
			var q3ID = "entry.2139246291";
			var q4ID = "entry.682763594";
			var q5ID = "entry.928975926";
			var q6ID = "entry.1682369644";
			var q7ID = "entry.1059652079";
			var q8ID = "entry.826917111";
			var q9ID = "entry.1926656202";
			var q10ID = "entry.209594768";

			var baseURL = 'https://docs.google.com/forms/d/1rUf6PiyUNr1Y50KHPHw4MOZTDaA16DUhHavHVXqjhlA/formResponse?';
			var submitRef = '&submit=Submit';
			var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 +"&"+ q3ID + "=" + inputq3 +"&"+ q4ID + "=" + inputq4 +"&"+ q5ID + "=" + inputq5 +"&"+ q6ID + "=" + inputq6 +"&"+ q7ID + "=" + inputq7 +"&"+ q8ID + "=" + inputq8 +"&"+ q9ID + "=" + inputq9 +"&"+ q10ID + "=" + inputq10 + submitRef);
			console.log(submitURL);
			$(this)[0].action=submitURL;
			
			});
		}
		catch(notE)		
		{
			alert("Please have a check and re-submit.");
		}
	 
		// Define spreadsheet URL.
		var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1nH7lkY7RnFv_l8u0nL9gsrs4_rwODBQiTiuD2FF0GBo/edit?#gid=0';
		$('#switch-hitters').sheetrock({
		  url: mySpreadsheet,
		  query: "select A, B , C where B contains '"+$('#buyer-name').val()+"'" + "AND K contains 'ready' by A desc"
		});
		//location.reload();
		
		
		$('#span-upload').click(function(){
			// clcik event here
						
		});
		
				
		/*judge which kind of stamp to use*/
		/*
		if(data.item_delivery.indexOf("48")>0 || data.item_delivery.indexOf("2nd")>0)
		{
			
			var elem = document.createElement("img");
			elem.setAttribute("src", "http://goo.gl/CGKdFR");
			elem.setAttribute("height", "100%");
			elem.setAttribute("width", "100%");
			elem.setAttribute("alt", data.item_delivery);
			document.getElementById("item_post").appendChild(elem);
		}
		else if(data.item_delivery.indexOf("24")>0)
		{
			var elem = document.createElement("img");
			elem.setAttribute("src", "http://goo.gl/OHPyR1");
			elem.setAttribute("height", "100%");
			elem.setAttribute("width", "100%");
			elem.setAttribute("alt", data.item_delivery);
			document.getElementById("item_post").appendChild(elem);
		}
		else if(data.item_delivery.indexOf("inter")>0)
		{
			;
		}
		*/
		/*^^^judge which kind of stamp to use^^^^*/
		
		
		//$('#item-qrcode').qrcode({render: "table", width: 48,height: 48,text: "http://www.ebay.co.uk/itm/"+ data.item_id}); // QR Code
		
		/*
		$('#page_footer').click(function(){$('#page_footer').attr('contenteditable','true');});
		 
		$("#btn_left").text("Add");
		$(document).ready(function(){
		  $("#btn_left").click(function(){
			$("#message").remove();
			//document.getElementById("my-element").remove();
			chrome.tabs.create({'url': chrome.extension.getURL('popup.html')}, function(tab) {});	
		  });
		});
		$(document).ready(function(){
		  $("#btn_right").click(function(){
			chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
				chrome.tabs.reload(arrayOfTabs[0].id);
			});
		  });
		});
		*/
	}
	
	
});

