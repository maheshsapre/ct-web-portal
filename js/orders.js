var page=1;
var orderList=new Array();
function increment(){
$("#loading").show();
 page=parseInt(page)+1;
 if(page>0){
 $("#decrement").attr('href','increment()');
 }
 window.location="orders.html?id="+id+"&page="+page;
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
window.location="orders.html?id="+id+"&page="+page;
 getBackerOrdersId(id);
}



    var page = urlParameterValue( 'page' );
     var id= urlParameterValue( 'id' );


function getBackerOrdersId(id){
	console.log(id);
	callAPI("/v1/orders/{0}/backer_information.json".f(id), "GET",getKeyQueryFormat(), onSuccessGetBackerOrders, onApiError);
}

function getBackerOrders() {
  callAPI("/v1/orders/current_backer_orders.json", "GET",getKeyQueryFormat(), onSuccessGetBackerOrders, onApiError);
}

function onSuccessGetBackerOrders(response) {  

console.log(response.data);
setBackerOrdersAction(response.data);
j=0;
for(i=0;i<response.data.length;i++){
  orderList[j]=response.data[j].id;
  j++;
  if(response.data[i].notes!="Success")
$("#alert").append("<div class='alert alert-warning alert-block'><h4><i class='icon-bell-alt'></i>Warning!</h4><p>"+response.data[i].notes+" </p></div>");
  }
   $("#loading").hide();
// $.getScript("js/app.data.js")
if(response.data.length<10){
$("#increment").removeAttr('href');
}
drawDatatable(response.data);
}

function updateAddresses()
 {
 	var $form = $("#updateAddresses");
  var $inputs = $form.find("input, select, button, textarea");
  var param =  $form.serializeObject(); 
   $("#updateAddress_authentication_token").val(getKey()); 
    console.log(param.address_id,param);
    console.log(JSON.stringify(param));
  updateBackerAddresses(param.address_id,JSON.stringify(param));
 }

function  updateBackerAddresses(id,param){
	  callAPI("/v1/addresses/{0}/update_address.json".f(id), "PUT",param, onSuccessUpdateBackerAddresses, onApiError);
}

function onSuccessUpdateBackerAddresses(response){
	console.log(response.data);
  bootbox.alert("updated");
}

function orderStatus(){
  id=getOrderStatusId();
  console.log(id);
  notes=$("#myNotes").val();
  orderIds=orderList.toString();
  console.log(orderIds);
   var param = {
               "order_ids" :orderIds,
               "notes":notes,
               "order_status_id" : id
               
                };
               
                param=JSON.stringify(param);
                console.log(param);
    callAPI("/v1/orders/update_order_status.json", "PUT",param, onSuccessOrderStatus, onApiError);  
     
}
function onSuccessOrderStatus(response){

    var page = urlParameterValue( 'page' );
     var id= urlParameterValue( 'id' );
      window.location="orders.html?id="+id+"&page="+page;
}



 function order(i){
  console.log(i);
  setOrderStatusId(i);
 }

 