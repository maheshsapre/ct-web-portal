var page=1;

function increment(){
$("#loading").show();
 page=parseInt(page)+1;
  if(page>0){
 $("#decrement").attr('href','increment()');
 }
 window.location="pendingActionCustomer.html?page="+page;
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
window.location="pendingActionCustomer.html?page="+page;
 pendingActionGeckoTeam();
}
  var page = urlParameterValue( 'page' );
function pendingActionCustomer() {
	callAPI("/v1/orders/order_status_details.json?order_status_type=Pending Action - Customer&page="+page, "GET",getApiKeyQueryFormat(), onSuccessgetPendingActionGeckoTeam, onApiError);
}

function pendingActionCustomerSearch() {
	searchPledge_id=getSearchPledgeId();
	console.log(searchPledge_id);
	callAPI("/v1/orders/order_status_details.json?order_status_type=Pending Action - Customer&page="+page+"&q[reference_no_cont]="+searchPledge_id, "GET",getApiKeyQueryFormat(), onSuccessSearchPendingActionGeckoTeam, onApiError);
}

function onSuccessSearchPendingActionGeckoTeam(response) {  
	console.log(response.data);
	 $("#loading").hide();
	drawDatatable(response.data);
}

function onSuccessgetPendingActionGeckoTeam(response) {  
	console.log(response.data);
	 $("#loading").hide();
	if(response.data.length<10){
$("#increment").removeAttr('href');
}
	drawDatatable(response.data);
}

