var filters=new Array();
var pendingInfo;
var page=1;
var orderId;
function increment(){
$("#loading").show();
 page=parseInt(page)+1;
 if(page>0){
 $("#decrement").attr('href','increment()');
 }
 window.location="pendingActionGeckoTeam.html?page="+page;
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
window.location="pendingActionGeckoTeam.html?page="+page;
 pendingActionGeckoTeam();
}



    var page = urlParameterValue( 'page' );


function pendingActionGeckoTeam()
{
  var $form = $("#pendingActionGeckoTeam");
  var $inputs = $form.find("input, select, button, textarea");
  $("#order_status_type").val("Pending Action - Gecko Team");
    $("#pageId").val(page);
    $("#api_key").val(getKey());
  var param =  $form.serializeObject();  
  getPendingActionGeckoTeam(param);
}

function getPendingActionGeckoTeam(param) {
 callAPI("/v1/orders/order_status_details.json", "GET",param, onSuccessgetPendingActionGeckoTeam, onApiError);
}

function getPendingActionGeckoTeamSearch(param) {
searchPledge_id=getSearchPledgeId();

 callAPI("/v1/orders/order_status_details.json?order_status_type=Pending Action - Gecko Team&page="+page+"&q[reference_no_cont]="+searchPledge_id, "GET",getApiKeyQueryFormat(), onSuccessSearchPendingActionGeckoTeam, onApiError);
}



 function updateAddresses()
 {
	alert('sdfsdfsdfdsfsdf');
 	var $form = $("#updateAddresses");
  var $inputs = $form.find("input, select, button, textarea");
  var param =  $form.serializeObject(); 
   $("#updateAddress_authentication_token").val(getKey()); 
  updateBackerAddresses(param.address_id,JSON.stringify(param));
 }

function  updateBackerAddresses(id,param){
	  callAPI("/v1/addresses/address_details.json", "PUT", param, onSuccessUpdateBackerAddresses, onApiError);
}
function onSuccessUpdateBackerAddresses(response){
}

function addOrder(){
	var $form = $("#addOrderForm");
  var $inputs = $form.find("input, select, button, textarea");
  var param =  $form.serializeObject(); 
  param["api_key"] = getKey();
  param['backer_id'] = $("#backer_id").val();
  addNewOrder(param.backer_id,JSON.stringify(param));
}

function  addNewOrder(id,param){
	  callAPI("/v1/orders/{0}/create_order.json".f(id), "POST",param, onSuccessAddNewOrder, onApiError);
}

function onSuccessAddNewOrder(response){
    bootbox.alert("Order has been added successfully", function(result) 
    {  
    location.reload();
     });
}

