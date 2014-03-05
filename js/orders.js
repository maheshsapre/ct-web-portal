

var page=1;
var orderList=new Array();

function increment(){
  $("#loading").show();
  page=parseInt(page)+1;
  if(page>0){
   $("#decrement").attr('href','increment()');
 }
 id = urlParameterValue('id');
 console.log(id);
 if(id==""){
 order_status= urlParameterValue('orderStatus');
 window.location="orders.html?orderStatus="+order_status+"&page="+page;
}
else{
   window.location="orders.html?id="+id+"&page="+page;
}

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
  window.location="orders.html?orderStatus="+order_status+"&page="+page;
 
}



var page = urlParameterValue( 'page' );
var id= urlParameterValue( 'id' );


function getBackerOrdersId(id){
	console.log(id);
	callAPI("/v1/orders/{0}/backer_information.json".f(id), "GET",getKeyQueryFormat(), onSuccessGetBackerOrders, onApiError);
}

function getBackerOrders() {
  $("#warning").hide();
  callAPI("/v1/orders/current_backer_orders.json", "GET",getKeyQueryFormat(), onSuccessGetBackerOrders, onApiError);
}

function onSuccessGetBackerOrders(response) { 
console.log(response.data[0].address_id); 
  $("#address_Orderid").val(response.data[0].address_id);
  $("#backer_id").val(response.data[0].backer_id);
  console.log(response.data[0].backer.email);
  $("#email").html(response.data[0].backer.email);
  console.log(response.data);
  setBackerOrdersAction(response.data);
  j=0;
  for(i=0;i<response.data.length;i++){
    orderList[j]=response.data[j].id;
    j++;
     $("#warning").show();
    if(response.data[i].notes!="Success"&&response.data[i].notes!=""){
        
      $("#alert1").append("<p>Pledge Id: "+response.data[i].reference_no+" >>> "+response.data[i].notes+"<p>");
  }
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
  if(order_status=="3"){
     notes=$("#myNotes").val();
  if(filters.length==0){
    bootbox.alert("Please select the checkbox");
  }
  else{

  a=filters.toString();
   var param = {
               "order_ids" : a,
               "notes":notes,
               "order_status_id" : id
                };
               
  }
}
else{
 
  console.log(id);
  notes=$("#myNotes").val();
  orderIds=orderList.toString();
  console.log(orderIds);
  var param = {
   "order_ids" :orderIds,
   "notes":notes,
   "order_status_id" : id

 };
}
 param=JSON.stringify(param);
 console.log(param);
 callAPI("/v1/orders/update_order_status.json", "PUT",param, onSuccessOrderStatus, onApiError);  

}
function onSuccessOrderStatus(response){

  var page = urlParameterValue( 'page' );
  var id= urlParameterValue( 'id' );
  if(order_status=="3"){
  window.location="orders.html?page=1&orderStatus=3"
  }else{
  window.location="orders.html?id="+id+"&page="+page;
}

}

function order(i){
  console.log(i);
  setOrderStatusId(i);
}

 // function getBackerInformation(id){
 // callAPI("/v1/backers/{0}.json".f(id), "GET",param, onSuccessUpdateBackerAddresses, onApiError);

 // }
 function saveOrderChanges(){
  var $form = $("#saveOrderChanges");
  var $inputs = $form.find("input, select, button, textarea");
  $("#saveOrder_authentication_token").val(getKey()); 
  var param =  $form.serializeObject(); 
  console.log(param);
  console.log(JSON.stringify(param));
  //updateBackerAddresses(param.address_id,JSON.stringify(param));
}

order_status= urlParameterValue('orderStatus');
console.log(order_status);
switch(order_status)
{
  case '1':
   $("#addOrder").hide();
  $("#action").hide();
  $("#emailBlock").hide();
  getPendingOrderAccepted();
  break;
  case '2':
   $("#addOrder").hide();
  $("#action").hide();   
  $("#emailBlock").hide();
  pendingActionCustomer();
  break;
  case '3':
  $("#addOrder").hide();
  pendingActionGeckoTeam();
  $("#emailBlock").hide();
  break;
  case '4':
   $("#addOrder").hide();
  $("#action").hide(); 
  $("#emailBlock").hide();
  pendingShipment();
  break;
  case '5':
   $("#addOrder").hide();
  $("#action").hide(); 
  $("#emailBlock").hide();
  shipmentDone();
  break;
  default:
  if(id==""){
  $("#addOrder").hide();
}
else{
   $("#addOrder").show();
}
  $("#action").show(); 
}

