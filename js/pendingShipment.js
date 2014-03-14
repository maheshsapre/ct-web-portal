var page=1;

function increment(){
$("#loading").show();
 page=parseInt(page)+1;
  if(page>0){
 $("#decrement").attr('href','increment()');
 }
 window.location="pendingShipment.html?page="+page;
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
window.location="pendingShipment.html?page="+page;
 pendingActionGeckoTeam();
}
   var page = urlParameterValue( 'page' );
 
function  pendingShipment() {
  callAPI("/v1/orders/order_status_details.json?order_status_type=Pending Shipment - All issues resolved&page="+page, "GET",getApiKeyQueryFormat(), onSuccessPendingShipment, onApiError);
}
function pendingShipmentSearch() {
  callAPI("/v1/orders/order_status_details.json?order_status_type=Pending Shipment - All issues resolved&page="+page+"&q[reference_no_cont]="+searchPledge_id, "GET",getApiKeyQueryFormat(), onSuccessPendingShipment, onApiError);
}


function onSuccessPendingShipment(response) {  
console.log(response.data);
$("#loading").hide();
//setPendingShipment(response.data);
if(response.data.length<10){
$("#increment").removeAttr('href');
}
drawDatatable(response.data)
  }