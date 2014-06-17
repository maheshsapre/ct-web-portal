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
  console.log(param);
 callAPI("/v1/orders/order_status_details.json", "GET",param, onSuccessgetPendingActionGeckoTeam, onApiError);
}

function getPendingActionGeckoTeamSearch(param) {
searchPledge_id=getSearchPledgeId();

 callAPI("/v1/orders/order_status_details.json?order_status_type=Pending Action - Gecko Team&page="+page+"&q[reference_no_cont]="+searchPledge_id, "GET",getApiKeyQueryFormat(), onSuccessSearchPendingActionGeckoTeam, onApiError);
}

function onSuccessSearchPendingActionGeckoTeam(response){
 $("#loading").hide();
drawDatatable(response.data);
}

function onSuccessgetPendingActionGeckoTeam(response) {  
console.log(response.data);
 $("#loading").hide();
//setPendingActionGeckoTeam(response.data);
if(response.data.length<10){
$("#increment").removeAttr('href');
}
drawDatatable(response.data);
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
	
	alert(id);
	console.log(param);
	
	  callAPI("/v1/addresses/address_details.json", "PUT", param, onSuccessUpdateBackerAddresses, onApiError);
	  
	  
}

function onSuccessUpdateBackerAddresses(response){
	console.log(response.data);
	alert("Hi");
   
   bootbox.alert("updated");

}

function addOrder(){
	var $form = $("#addOrderForm");
  var $inputs = $form.find("input, select, button, textarea");
  var param =  $form.serializeObject(); 
  console.log(param);
  addNewOrder(param.backer_id,JSON.stringify(param));
}

function  addNewOrder(id,param){
	  callAPI("/v1/orders/{0}/create_order.json".f(id), "POST",param, onSuccessAddNewOrder, onApiError);
}

function onSuccessAddNewOrder(response){
	console.log(response.data);
       bootbox.alert("Order has been added successfully", function(result) 
    {  
      if(result==undefined){
       window.location=window.location.href;
      }
     });


}

// function order(i){
//   orderId=i;
//   //setOrderStatusId(i);
//  } 

// function orderStatus(){
//   notes=$("#myNotes").val();
//   if(filters.length==0){
//     bootbox.alert("Please select the checkbox");
//   }
// 	else{
// 	a=filters.toString();
// 	 var param = {
//                "order_ids" : a,
//                "notes":notes,
//                "order_status_id" : orderId
//                 };
               
//                 param=JSON.stringify(param);
//                 console.log(param);
//     callAPI("/v1/orders/update_order_status.json", "PUT",param, onSuccessOrderStatus, onApiError);  
//   }        
// }

// function onSuccessOrderStatus(response){
// window.location="pendingActionGeckoTeam.html?page=1";
// }



 

function sendNotifiction(i){
  console.log(i);
}

