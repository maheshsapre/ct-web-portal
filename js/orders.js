var searchemail;
 var searchPledge_id;
 var searchPerk;
var perkArray=new Array(6);
var perkValue=new Array(6);
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

	callAPI("/v1/orders/{0}/backer_information.json".f(id), "GET",getKeyQueryFormat(), onSuccessGetBackerOrders, onApiError);
}

function getBackerOrders() {
  $("#warning").hide();
  callAPI("/v1/orders/current_backer_orders.json", "GET",getKeyQueryFormat(), onSuccessGetBackerOrders, onApiError);
}

function onSuccessGetBackerOrders(response) { 
  $("#address_Orderid").val(response.data[0].address_id);
  $("#backer_id").val(response.data[0].backer_id);
  $("#email").html(response.data[0].backer.email);
  setBackerOrdersAction(response.data);
   for(i=0;i<response.data.length;i++){
orderList[i]=response.data[i].id;
   }
  
  if(getRoles()!="admin"){
  
  for(i=0;i<response.data.length;i++){
     
     //$("#warning").show();
    if(response.data[i].notes!="Success"&&response.data[i].notes!=""){
          var str =   response.data[i].notes;
          var res = str.replace("Shipping not paid.","");
          if(res.trim().length!=0){
              $("#warning").show();
      $("#alert1").append("<p>Pledge Id: "+response.data[i].reference_no+" >>> "+ res +"<p>");
  }
}
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
     bootbox.alert("Address has been updated successfully", function(result) 
    {  
      if(result==undefined){
         window.location=window.location.href;
    }
      });
}

function orderStatus(){
   id=getOrderStatusId();
  
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
     param=JSON.stringify(param);
 console.log(param);
 callAPI("/v1/orders/update_order_status.json", "PUT",param, onSuccessOrderStatus, onApiError);  
          
  }

// else{
 
//   console.log(id);

//   notes=$("#myNotes").val();
//   orderIds=orderList.toString();
//   console.log(orderIds);
//   var param = {
//    "order_ids" :orderIds,
//    "notes":notes,
//    "order_status_id" : id

//  };
// }
 
}
function onSuccessOrderStatus(response){

 window.location=window.location.href;
}

function order(i){
  console.log(i);
  setOrderStatusId(i);
}

 // function getBackerInformation(id){
 // callAPI("/v1/backers/{0}.json".f(id), "GET",param, onSuccessUpdateBackerAddresses, onApiError);

 // }
 function saveOrderChanges(){

 callAPI("/v1/orders/{0}/update_status_geckoteam.json".f(getKey()), "PUT","", onSuccessSaveOrderChanges, onApiError); 
}

function onSuccessSaveOrderChanges(response){
  bootbox.alert("Changes have been saved successfully", function(result) 
    {  
      if(result==undefined){
      window.location=window.location.href;
    }
      });
}

order_status= urlParameterValue('orderStatus');
console.log(order_status);
switch(order_status)
{
  case '1':
   $("#addOrder").hide();
  
  $("#emailBlock").hide();
  getPendingOrderAccepted();
  break;
  case '2':
   $("#addOrder").hide();
   
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
  
  $("#emailBlock").hide();
  pendingShipment();
  break;
  case '5':
   $("#addOrder").hide();
  
  $("#emailBlock").hide();
  shipmentDone();
  break;
  case '6':
   $("#addOrder").hide();
  
  $("#emailBlock").hide();
  inCompleteAddress();
  break;
   case '7':
   $("#addOrder").hide();
  
  $("#emailBlock").hide();
 perkNotMentioned();
  break;
   case '8':
   $("#addOrder").hide();
  
  $("#emailBlock").hide();
  shippingNotPaid();
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


function addNewPerk(){
   var $form = $("#addPerk");
  var $inputs = $form.find("input, select, button, textarea");
  var param =  $form.serializeObject(); 
  console.log(JSON.stringify(param));
  addPerk(param.order_id,JSON.stringify(param));
}

function addPerk(id,param){
  callAPI("/v1/orders/{0}/update_perk.json".f(id), "PUT",param, onSuccessAddPerk, onApiError);
}

function onSuccessAddPerk(response){
    bootbox.alert("Perk has been added successfully", function(result) 
    {  
      if(result==undefined){
         a=window.location.href;
      console.log(a);
       window.location=a;
    }
      });
     }  


  function inCompleteAddress() {
  callAPI("/v1/orders/order_status_details2.json?status=Incomplete address&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

  function inCompleteAddressSearch() {
  callAPI("/v1/orders/order_status_details2.json?status=Incomplete address&page="+page+"&q[reference_no_cont]="+searchPledge_id, "GET","", onSuccessInCompleteData, onApiError);
}


   function perkNotMentioned() {
  callAPI("/v1/orders/order_status_details2.json?status=Perk not mentioned&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

   function perkNotMentionedSearch() {
  callAPI("/v1/orders/order_status_details2.json?status=Perk not mentioned&page="+page+"&q[reference_no_cont]="+searchPledge_id, "GET","", onSuccessInCompleteData, onApiError);
}


   function shippingNotPaid() {
  callAPI("/v1/orders/order_status_details2.json?status=Shipping not paid&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}
   
   function shippingNotPaidSearch() {
  callAPI("/v1/orders/order_status_details2.json?status=Shipping not paid&page="+page+"&q[reference_no_cont]="+searchPledge_id, "GET","", onSuccessInCompleteData, onApiError);
}

function onSuccessInCompleteData(response) {  
console.log(response.data);
//setShipmentDone(response.data);
$("#loading").hide();
if(response.data.length<10){
$("#increment").removeAttr('href');
}
drawDatatable(response.data);
  }

for (var i = perkArray.length - 1; i >= 0; i--) {
  perkArray[i]=0;
};
function resetPerkValueArray(){
for (var i =perkValue.length - 1; i >= 0; i--) {
  perkValue[i]=0;
};
}
  function selectedPerk1(i,val){
   perkArray[0]=i;
$("#perkValue1").html("$"+i);
perkValue[0]=val;
  }
  function selectedPerk2(i,val){
 perkArray[1]=i; 
 perkValue[1]=val;
$("#perkValue2").html("$"+i);
  }
  function selectedPerk3(i,val){
   perkArray[2]=i;
   perkValue[2]=val;
$("#perkValue3").html("$"+i);
  }
  function selectedPerk4(i,val){
    perkArray[3]=i;
    perkValue[3]=val;
$("#perkValue4").html("$"+i);
  }
  function selectedPerk5(i,val){
    perkArray[4]=i;
    perkValue[4]=val;
$("#perkValue5").html("$"+i);
  }
  function selectedPerk6(i,val){
    perkArray[5]=i;
    perkValue[5]=val;
$("#perkValue6").html("$"+i);
  }

  function addPerks(){
    amount=0;
  for (var i = perkArray.length - 1; i >= 0; i--) {
    amount= parseInt(perkArray[i]) + amount;
  };
if(amount>addPerkTotalAmount){
clearPerksModalDialog();
 clearPerksAmount();
  resetPerkValueArray();
  for (var i = perkArray.length - 1; i >= 0; i--) {
    perkArray[i]=0;
  };
  bootbox.alert("The total amount of the selected perks  exceeds the amount paid.Please reselect the perks")
}
else{
  console.log(perkValue);
  var perksIds=new Array();
  j=0;
  for (var i = 0; i < perkValue.length; i++) {
       
       if(perkValue[i]!=0){
           perksIds[j]=perkValue[i];
           j++;
       }
  };
  console.log(perksIds);
  var param={
   order_id: addPerkOrderId,
   perk_ids: perksIds.toString()
  }
  console.log(param);
     callAPI("/v1/orders/split_the_order.json", "POST",JSON.stringify(param), onSuccessSplitPerk, onApiError);
  
}
  }

function onSuccessSplitPerk(response){
    bootbox.alert("Perks have been successfully added", function(result) 
    {  
      if(result==undefined){
       window.location=window.location.href;
      }
     });

}
  function clearPerksModalDialog()
  {
      document.getElementById('select3-option').selectedIndex = 0;
  document.getElementById('select4-option').selectedIndex = 0;
  document.getElementById('select5-option').selectedIndex = 0;
  document.getElementById('select6-option').selectedIndex = 0;
  document.getElementById('select7-option').selectedIndex = 0;
  document.getElementById('select8-option').selectedIndex = 0;
  }

  function clearPerksAmount(){
  $("#perkValue1").empty();
  $("#perkValue2").empty();
  $("#perkValue3").empty();
  $("#perkValue4").empty();
  $("#perkValue5").empty();
  $("#perkValue6").empty();
  }

  $( "#search" ).click(function() {
  searchemail=$("#searchEmail").val();
  searchPledge_id=$("#searchPledge").val();
  searchPerk=$("#searchPerk").val();
  order_status= urlParameterValue('orderStatus');
console.log(order_status);
switch(order_status)
{
  case '1':
  getPendingOrderAcceptedSearch();
  break;
  case '2':
  pendingActionCustomerSearch();
  break;
  case '3':
  getPendingActionGeckoTeamSearch();
  break;
  case '4':
  pendingShipmentSearch();
  break;
  case '5':
  shipmentDoneSearch();
  break;
  case '6':
  inCompleteAddressSearch();
  break;
   case '7':
 perkNotMentionedSearch();
  break;
   case '8':
  shippingNotPaidSearch();
  break;
  default:
  
}
});