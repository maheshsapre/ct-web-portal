var page=1;

function increment(){
$("#loading").show();
 page=parseInt(page)+1;
 window.location="orderAccepted.html?page="+page;
  if(page>0){
 $("#decrement").attr('href','increment()');
 }
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
window.location="orderAccepted.html?page="+page;
 pendingActionGeckoTeam();
}



    var page = urlParameterValue( 'page' );

function getPendingOrderAccepted() {
  callAPI("/v1/orders/order_status_details.json?order_status_type=Order Accepted / Imported&page="+page, "GET",getApiKeyQueryFormat(), onSuccessetPendingOrderAccepted, onApiError);
}

function getPendingOrderAcceptedSearch() {
  callAPI("/v1/orders/order_status_details.json?order_status_type=Order Accepted / Imported&page="+page+"&q[reference_no_cont]="+searchPledge_id, "GET",getApiKeyQueryFormat(), onSuccessetPendingOrderAccepted, onApiError);
}


function onSuccessetPendingOrderAccepted(response) {  
 $("#loading").hide();
 if(response.data.length<10){
$("#increment").removeAttr('href');
}
drawDatatable(response.data);
  }