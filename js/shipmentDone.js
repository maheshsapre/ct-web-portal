var page=1;

function increment(){
$("#loading").show();
 page=parseInt(page)+1;
  if(page>0){
 $("#decrement").attr('href','increment()');
 }
 window.location="shipmentDone.hml?page="+page;
 pendingActionGeckoTeam();
}

function decrement(){
  $("#loading").show();
 page=parseInt(page)-1;
 if(page<1)
 {
 $("#decrement").removeAttr('href');
 $("#loading").hide();
 return;
 }
 else
 {
   $("#decrement").attr('href','decrement()');

 }
window.location="shipmentDone.hml?page="+page;
 pendingActionGeckoTeam();
}
  var page = urlParameterValue( 'page' );

function shipmentDone() {
  callAPI("/v1/orders/order_status_details.json?order_status_type=Shipped / Delivered&page="+page, "GET",getApiKeyQueryFormat(), onSuccessShipmentDone, onApiError);
}

function  shipmentDoneSearch() {
	searchPledge_id=getSearchPledgeId();
	console.log(searchPledge_id);
  callAPI("/v1/orders/order_status_details.json?order_status_type=Shipped / Delivered&page="+page+"&q[reference_no_cont]="+searchPledge_id, "GET",getApiKeyQueryFormat(), onSuccessSerachShipmentDone, onApiError);
}

function onSuccessSerachShipmentDone(response) {  
$("#loading").hide();
drawDatatable(response.data);
  }

function onSuccessShipmentDone(response) {  
console.log(response.data);
//setShipmentDone(response.data);
$("#loading").hide();
if(response.data.length<10){
$("#increment").removeAttr('href');
}
drawDatatable(response.data);
  }