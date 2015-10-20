 
window.onload = function(e) {
	var buyerNote=" ";
	
	
//	var elements = document.querySelectorAll(".ng-binding");
	var msgStatus=false;
	
	var itemQuantity, itemID ,itemShippingServiceName; 
	/**/
	
	$("div").on("click", "tr", function(itemQuantity,itemID ,itemShippingServiceName){
       // 这里的this指向触发点击事件的tr元素
		//$(this).parent().css('border', '2px solid #65a9d7');
		
		var name=document.getElementById("shippingAddressName");
		var addr1=document.getElementById("shippingAddressLine1");
		var addr2=document.getElementById("shippingAddressLine2");
		var cityStateZip=document.getElementById("shippingAddressCityStateZip");
		var country=document.getElementById("shippingAddressCountry");
		var buyerId = document.querySelectorAll("strong.ng-binding");
		
		var detail=$(this).text().split("\n");
		
		//alert(document.getElementById($(this).next().next().text().split("\n")[2].trim()+"_itemShippingService").innerHTML);
		switch(detail[1].trim())
		{
		   case 'Item price': 
				itemQuantity=$(this).next().text().split("\n")[2].trim();
				itemID=$(this).next().next().text().split("\n")[2].trim();
				itemShippingServiceName=document.getElementById($(this).next().next().text().split("\n")[2].trim()+"_itemShippingService").innerHTML;
				itemTitle=document.getElementById(itemID+"_ItemTitle");
				if (itemQuantity && itemID && itemShippingServiceName)
					msgStatus=true;
				break;
		   case 'Quantity': alert(detail[2]);
		   break;
		   case 'Item number': alert(detail[2]);
		   break;
		   case 'Delivery service':alert(detail[2]);
		   break;
		   default:
		   ;
		}
		
		try
		{
			var msg = {
				type: "pack-info",
				msg_status : msgStatus,
				buyer_note: buyerNote.innerHTML,
				buyer_id: buyerId[0].innerHTML,
				buyer_name: name.innerHTML.toUpperCase(),
				buyer_addr1:addr1.innerHTML.toUpperCase(),
				buyer_addr2 : addr2.innerHTML.toUpperCase(),
				buyer_cityStateZip: cityStateZip.innerHTML.toUpperCase(),
				buyer_country: country.innerHTML,
				
				item_id: itemID,
				item_itemtitle: itemTitle.innerHTML,
				item_qty: itemQuantity,
				item_delivery: itemShippingServiceName,
				
				url: document.URL
			};
			chrome.runtime.sendMessage(msg);
		}
		catch(notE){
			chrome.runtime.sendMessage({type:"pack-info", error:"Please click Item Details."});
			//location.reload(true);
		}
	});
};
   