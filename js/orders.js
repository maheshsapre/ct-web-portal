var searchemail;
var searchPerk;
var perkArray=new Array(6);
var perkValue=new Array(6);
var page=1;
var orderList=new Array();
var filterPerk=new Array();
var iPerk=-1;
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
   $("#saveOrders").hide();
   $("#orderstable").hide();
  
  
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
     if(response.data[i].notes && response.data[i].notes!="Success" && response.data[i].notes!="" ){
      var str =   response.data[i].notes;
	  
      var res = str.replace("Shipping not paid.","");
	  $("#orderstable").show();
		$("#saveOrders").show();
	  if(res.trim().length!=0){
        $("#alert1").append("<p style='font-size:15px;'>Pledge Id: "+response.data[i].reference_no+" - "+ res +"<p>");
		$("#warning").show();
      }
    }
  }
  
}
$("#loading").hide();
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
 callAPI("/v1/orders/update_order_status.json", "PUT",param, onSuccessOrderStatus, onApiError);  
}
}

function onSuccessOrderStatus(response){
 window.location=window.location.href;
}

function order(i){
  console.log(i);
  setOrderStatusId(i);
}

function saveOrderChanges(){
 callAPI("/v1/orders/{0}/update_status_geckoteam.json".f(getKey()), "PUT","", onSuccessSaveOrderChanges, onApiError); 
}

function displaySaveOrderChangesForBackers(){

 callAPI("/v1/orders/{0}/update_status_geckoteam.json".f(getKey()), "PUT","",onSuccessDisplaySaveOrderChanges, onApiError1); 
}

function onSuccessDisplaySaveOrderChanges(response){
 // $("#warning").show();
 //  $("#alert1").append("<p style='font-size:15px;'>Success</p>")
 //  console.log(response.data.message);
}

function onSuccessSaveOrderChanges(response){
  bootbox.alert("Changes have been saved successfully", function(result) 
  {  
    if(result==undefined){
      window.location=window.location.href;
    }
  });
}

function getInformation(){
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
    case '9':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getgecko_2Orders();
    break;
    case '10':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getgecko_6Orders();
    break;
    case '11':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getgecko_4Orders();
    break;
    case '12':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getgeckoOrders();
    break;
    case '13':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getearly_geckoOrders();
    break;
    case '14':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getpink_geckoOrders();
    break;
    case '15':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getgecko_gateway_couponOrders();
    break;
    case '16':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getvb_geckoOrders();
    break;
    case '17':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getluggage_tagOrders();
    break;
    case '18':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getkey_chainOrders();
    break;
    case '19':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getgecko_trioOrders();
    break;
    case '20':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getgecko_reseller_packOrders();
    break;
    case '21':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getgecko_geekOrders();
    break;
    case '22':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getdslr_cameraOrders();
    break;
    case '23':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getundefinedOrders();
    break;
    case '24':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getshipping_chargesOrders();
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
  searchPledge_id=getSearchPledgeId();
  console.log(searchPledge_id);
  callAPI("/v1/orders/order_status_details2.json?status=Incomplete address&page="+page+"&q[reference_no_cont]="+searchPledge_id, "GET","", onSuccessSearchData, onApiError);
}


function perkNotMentioned() {
  callAPI("/v1/orders/order_status_details2.json?status=Perk not mentioned&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

function perkNotMentionedSearch() {
  searchPledge_id=getSearchPledgeId();
  console.log(searchPledge_id);
  callAPI("/v1/orders/order_status_details2.json?status=Perk not mentioned&page="+page+"&q[reference_no_cont]="+searchPledge_id, "GET","", onSuccessSearchData, onApiError);
}


function shippingNotPaid() {
  callAPI("/v1/orders/order_status_details2.json?status=Shipping not paid&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

function shippingNotPaidSearch() {
  searchPledge_id=getSearchPledgeId();
  console.log(searchPledge_id);
  callAPI("/v1/orders/order_status_details2.json?status=Shipping not paid&page="+page+"&q[reference_no_cont]="+searchPledge_id, "GET","", onSuccessSearchData, onApiError);
}

function onSuccessInCompleteData(response) {  
  $("#loading").hide();
  if(response.data.length<10){
    $("#increment").removeAttr('href');
  }
  drawDatatable(response.data);
}
function onSuccessSearchData(response) {  
  $("#loading").hide();
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
  //searchemail=$("#searchEmail").val();
  searchPledge_id=$("#searchPledge").val();
 //searchPerk=$("#searchPerk").val();
 console.log(searchPledge_id);
 setSearchPledgeId(searchPledge_id);
 order_status= urlParameterValue('orderStatus');
 window.location="orders.html?orderStatus="+order_status+"&page="+page+"&search=1";
});

function getSearchInformation(){
  order_status= urlParameterValue('orderStatus');
  switch(order_status)
  {
    case '1':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getPendingOrderAcceptedSearch();
    break;
    case '2':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    pendingActionCustomerSearch();
    break;
    case '3':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    getPendingActionGeckoTeamSearch();
    break;
    case '4':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    pendingShipmentSearch();
    break;
    case '5':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    shipmentDoneSearch();
    break;
    case '6':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    inCompleteAddressSearch();
    break;
    case '7':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    perkNotMentionedSearch();
    break;
    case '8':
    $("#addOrder").hide();
    $("#emailBlock").hide();
    shippingNotPaidSearch();
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


}

function    getgecko_2Orders(){
 callAPI("/v1/orders/orders_filter.json?order_types=5&page="+page, "GET","", onSuccessInCompleteData, onApiError);

}


function  getgecko_6Orders(){
 callAPI("/v1/orders/orders_filter.json?order_types=7&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

function  getgecko_4Orders(){
  callAPI("/v1/orders/orders_filter.json?order_types=6&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}
function getgeckoOrders(){
  callAPI("/v1/orders/orders_filter.json?order_types=4&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

function getearly_geckoOrders(){
 callAPI("/v1/orders/orders_filter.json?order_types=3&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

function getpink_geckoOrders(){
 callAPI("/v1/orders/orders_filter.json?order_types=13&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

function getgecko_gateway_couponOrders(){
 callAPI("/v1/orders/orders_filter.json?order_types=8&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

function getvb_geckoOrders(){
 callAPI("/v1/orders/orders_filter.json?order_types=14&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

function getluggage_tagOrders(){
 callAPI("/v1/orders/orders_filter.json?order_types=12&page="+page, "GET","", onSuccessInCompleteData, onApiError);
} 

function getkey_chainOrders(){
 callAPI("/v1/orders/orders_filter.json?order_types=1&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}
function getgecko_trioOrders(){
 callAPI("/v1/orders/orders_filter.json?order_types=11&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

function getgecko_reseller_packOrders(){
  callAPI("/v1/orders/orders_filter.json?order_types=10&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

function getgecko_geekOrders(){
  callAPI("/v1/orders/orders_filter.json?order_types=9&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

function getdslr_cameraOrders(){
  callAPI("/v1/orders/orders_filter.json?order_types=2&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

function getundefinedOrders(){
 callAPI("/v1/orders/orders_filter.json?order_types=15&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

function getshipping_chargesOrders(){
 callAPI("/v1/orders/orders_filter.json?order_types=16&page="+page, "GET","", onSuccessInCompleteData, onApiError);
}

function filterOrder(){
  var $form = $("#filterOrder");
  var $inputs = $form.find("input, select, button, textarea");
  var param =  $form.serializeObject(); 
  console.log(param);

  console.log(filterPerk);
  a=filterPerk.toString();
  var param={
    "order_types" : a,
    "address_completion":param.address_completion,
    "perk_completion" :param.perk_completion,
    "shipping_completion":param.shipping_completion,
    "shipping_status":param.shipping_status
  };
  setFilterPerk(param);
  order_status= urlParameterValue('orderStatus');
  window.location="orders.html?orderStatus="+order_status+"&page="+page+"&filter=1";
  console.log(JSON.stringify(param));
  
}

function selectedPerk(i,val){

  var found = jQuery.inArray(val, filterPerk);
  if (found >= 0) {
    // Element was found, remove it.
    filterPerk.splice(found, 1);
  } else {
            // Element was not found, add it.
            filterPerk.push(val);
          }

        }

        function uncheckTheCheckbox() {
         document.getElementById("check1").checked = false;
         document.getElementById("check2").checked = false;
         document.getElementById("check3").checked = false;
         document.getElementById("check4").checked = false;
         document.getElementById("check5").checked = false;
         document.getElementById("check6").checked = false;
         document.getElementById("check7").checked = false;
         document.getElementById("check8").checked = false;
         document.getElementById("check9").checked = false;
         document.getElementById("check10").checked = false;
         document.getElementById("check11").checked = false;
         document.getElementById("check12").checked = false;
         document.getElementById("check13").checked = false;
         document.getElementById("check14").checked = false;
         document.getElementById("check15").checked = false;
       }


       function getFilteredData(){
        param=getFilterPerk();
        callAPI("/v1/orders/orders_filter.json", "GET",param, onSuccessGetFilterData, onApiError);
      }

      function  onSuccessGetFilterData(response){
        $("#addOrder").hide();
    $("#emailBlock").hide();
              console.log(response.data);
              $("#loading").hide();
      //setPendingShipment(response.data);
      if(response.data.length<10){
        $("#increment").removeAttr('href');
      }
      drawDatatable(response.data)
    }

    