var searchemail;
var searchPerk;
var perkArray=new Array(6);
var perkValue=new Array(6);
var page=1;
var filterPerk=new Array();
var iPerk=-1;
var id= urlParameterValue( 'id' );

$(document).ready(function(){
  $("#adminPanel").hide();
  $("#tracking-wizard").hide();
  $("#orderstable").hide();
  $("#addressConfirmedText").hide();
  $("#unConfirmAddress").hide();
  $("#addressConfirmed").hide();
  $("#addressDetails").empty();
  $("#trackingDetails").empty();
  $("#changeAddress").show();
  $("#confirmAddress").show();
  $('#admin3').addClass("active");

  //$("#orderSelection").append('<div class="m-b"><div class="row"><div class="col-lg-6"><select id="select{0}-option" class="col-xs-12 form-control" name="perk"><optgroup label="Select a perk"><option value="">Select aaaa</option><option onClick="javascript:selectedPerk({0}, 5,1);" value="1">Detachable Key Chain</option><option onClick="javascript:selectedPerk({0}, 8,2);" value="2">DSLR Camera Trigger Cable</option><option onClick="javascript:selectedPerk({0}, 8,25);" value="25">DSLR Canon Camera</option><option onClick="javascript:selectedPerk({0}, 8,26);" value="26">DSLR Nikon 1 Camera</option><option onClick="javascript:selectedPerk({0}, 8,27);" value="27">DSLR Nikon 2 Camera</option> <option onClick="javascript:selectedPerk({0}, 8,28);" value="28">DSLR Nikon 3 Camera</option><option onClick="javascript:selectedPerk({0}, 20,3);" value="3">Early Gecko</option><option onClick="javascript:selectedPerk({0}, 25,4);" value="4">Gecko </option><option onClick="javascript:selectedPerk({0}, 40,5);" value="5">Gecko * 2</option><option onClick="javascript:selectedPerk({0}, 75,6);" value="6">Gecko * 4</option><option onClick="javascript:selectedPerk({0}, 100,7);" value="7">Gecko * 6</option><option onClick="javascript:selectedPerk({0}, 7,8);" value="8">Gecko Gateway Coupon</option><option onClick="javascript:selectedPerk({0}, 995,9);" value="9">Gecko Geek</option><option onClick="javascript:selectedPerk({0}, 995,10);" value="10">Gecko Re-Seller Pack</option><option onClick="javascript:selectedPerk({0}, 60,11);" value="11">Gecko Trio </option><option onClick="javascript:selectedPerk({0}, 5,12);" value="12">Luggage Tag</option><option onClick="javascript:selectedPerk({0}, 25,13);" value="13">Pink Gecko * 1 </option><option onClick="javascript:selectedPerk({0}, 200,14);" value="14">VB Geeks </option><option onClick="javascript:selectedPerk({0}, 8,16);" value="16">Shipping Charges </option><option onClick="javascript:selectedPerk({0}, 0,17);" value="17">Donation </option></optgroup></select></div><div class="col-lg-2"><div id="perkValue{0}"></div></div></div></div>'.f(0));
  // $("#orderSelection").append('<div class="m-b"><div class="row"><div class="col-lg-6"><select id="select{0}-option" class="col-xs-12 form-control" name="perk"><optgroup label="Select a perk"><option value="1">Detachable Key Chain</option><option value="2">DSLR Camera Trigger Cable</option></optgroup></select></div><div class="col-lg-2"><div id="perkValue{0}"></div></div></div></div>'.f(0));

  setCurrentUserName();
  loggedInrole();

  var id = urlParameterValue( 'id' );
  if(id!=""){
    getBackerOrdersId(id);
  }

  if(getRoles()!="admin"){
    getBackerOrders();
    getCurrentUser();
  }
  
  clearPerksModalDialog();
  resetPerkValueArray();
});

function changeEmail()
{
  var $form = $("#change-email-form");
  var $inputs = $form.find("input, select, button, textarea");
  var param =  $form.serializeObject(); 
  param["api_key"] = getKey();
  if(getRoles()=="admin"){
    param['backer_id'] = $("#backer_id").val();
  }
  callAPI("/v1/backers/update_backer.json", "PUT", JSON.stringify(param), onSuccessBckerEmailChange, onApiError); 
}

function onSuccessBckerEmailChange(response){
  location.reload();
}

function getBackerOrdersId(id){
  $("#backer_id").val(id);
  callAPI("/v1/orders/{0}/backer_information.json".f(id), "GET",getKeyQueryFormat(), onSuccessGetBackerOrders, onApiError);
}

function getBackerOrders() {
  callAPI("/v1/orders/current_backer_orders.json", "GET",getKeyQueryFormat(), onSuccessGetBackerOrders, onApiError);
}
function onSuccessGetBackerOrders(response) { 
  setBackerOrdersAction(response.data);
  drawDatatable(response.data);

  if (response.data.length > 0) {
    $("#address_Orderid").val(response.data[0].address_id);
    $("#backer_id").val(response.data[0].backer_id);
    $("#email").html(response.data[0].backer.email);
    $("#current-email").val(response.data[0].backer.email);
    if(getRoles()!="admin"){
      callAPI("/v1/backers/backer_information.json", "GET", getKeyQueryFormat(), onSuccessGetTrackerInfo, onApiError);
    }
    else{
      callAPI("/v1/backers/backer_information.json?backer_id={0}".f(response.data[0].backer_id), "GET", getKeyQueryFormat(), onSuccessGetTrackerInfo, onApiError);
    }
  }
  else  {
    $("#loading").hide();
  }
}
function onSuccessGetTrackerInfo(response){
  populateTrackingDetails(response.data);
  populateAddressDetails(response.data);
  populateEditorForm(response.data);
  populateVerificationDetails(response.data);

  if(getRoles() =="admin"){
    $("#adminPanel").show();
  }

// show the hidden sections as appropriate
$("#orderstable").show();
$("#tracking-wizard").show();
$("#loading").hide();
}

function deleteBackerAccount(){
  var id = $("#backer_id").val();
  callAPI("/v1/backers/{0}/delete_backer.json?api_key={1}".f(id, getKey()), "DELETE", "", onDeleteBackerAccount, onApiError);
}

function confirmBackerAddress(status){
  var param= {};
  param['api_key'] = getKey();
  param['address_confirmed'] = status;
  if(getRoles()=="admin"){
    param['backer_id'] = $("#backer_id").val();
  }
  callAPI("/v1/backers/update_backer.json", "PUT", JSON.stringify(param), onSuccessConfirmBackerAddress, onApiError);	
}

function onDeleteBackerAccount(response){
  window.location="backers.html?page=1";
}

function onSuccessConfirmBackerAddress(response){
  if (response.data.address_confirmed == true)
  {
    $("#changeAddress").hide();
    $("#confirmAddress").hide();
    if(getRoles()=="admin"){
      $("#unConfirmAddress").show();
    }
    $("#addressConfirmed").show();
    $("#addressConfirmedText").val("confirmed");
    $("#address_not_confirmed").hide();
  }
  else
  {
    $("#changeAddress").show();
    $("#confirmAddress").show();
    $("#unConfirmAddress").hide(); 
    $("#addressConfirmed").hide();
    $("#address_not_confirmed").show();
  }
}

function getShipmentStatusLine(data){
  switch(data)
  {
    case "shipment_scheduled" : status = 'Shipmnet status: <span class="label bg-info">Shipment Scheduled</span><br>';  break;
    case "shipped": status = 'Shipmnet status: <span class="label bg-success">Shipped</span><br>';  break;
    default: status = 'Shipmnet status: <span class="label bg-warning">No information available</span><br>'; break;
  }
  return status;
}

function getTrackingNumberLine(data){
  switch((data + "").toLowerCase())
  {
    case "cnrpost": 
    tracking_url = '<a style="color:blue" target="_blank" href="http://www.17track.net/en/result/post.shtml?nums={0}">{0} (Click here)</a>'.f(data.tracking_number);
    break;
    case "pfc post":
    tracking_url = '<a style="color:blue" target="_blank" href="http://www.17track.net/en/result/post.shtml?nums={0}">{0} (Click here)</a>'.f(data.tracking_number);
    break;
    default: 
    tracking_url = (data? data.tracking_number: "No Tracking Details");
    break;
  }
  return tracking_url;
}

function populateTrackingDetails(data){
// display the tracking information
var status = getShipmentStatusLine(data.shipping_status);
var tracking_url = getTrackingNumberLine(data.shipping_service);

$("#trackingDetails").empty();
$("#trackingDetails").append(status);
if (data.shipping_service) $("#trackingDetails").append('Shipping Service: <strong>{0}</strong><br>'.f(data.shipping_service));
if (data.tracking_number) $("#trackingDetails").append('Tracking Number: <strong>{0}</strong><br>'.f(tracking_url));
if (data.shipping_date) $("#trackingDetails").append('Shipping Date: <strong>{0}</strong><br>'.f( $.formatDateTime("MM dd, yy", new Date(data.shipping_date))));
}

function populateAddressDetails(data){
  $("#addressDetails").empty();
  if (data.address.name) $("#addressDetails").append('Name: <strong>{0}</strong><br>'.f(data.address.name));
  if (data.address.address_line_1) $("#addressDetails").append('Address: <br>     <strong>{0}</strong><br>'.f(data.address.address_line_1));
  if (data.address.address_line_2) $("#addressDetails").append('&#09;<strong>{0}</strong><br>'.f(data.address.address_line_2));
  if (data.address.city) $("#addressDetails").append('&#09;<strong>{0}</strong><br>'.f(data.address.city));
  if (data.address.state) $("#addressDetails").append('&#09;<strong>{0}</strong><br>'.f(data.address.state));
  if (data.address.country) $("#addressDetails").append('&#09;<strong>{0}</strong><br>'.f(data.address.country));
  if (data.address.zip_code) $("#addressDetails").append('Postal Code: <strong>{0}</strong><br>'.f(data.address.zip_code));
  if (data.address.phone) $("#addressDetails").append('Phone/Mobile: <strong>{0}</strong><br>'.f(data.address.phone));

  var str= data.address.country;

  if (str){
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    });
  }

  $("#select2-option > option").each(function() {
    if(str==this.value)
      document.getElementById('select2-option').selectedIndex = this.index;
  });

  if (data.address_confirmed)
  {
    $("#changeAddress").hide();
    $("#confirmAddress").hide();
    $("#addressConfirmed").show();

    if(getRoles()=="admin"){
      $("#unConfirmAddress").show();
    }
  }
  else
  {
    $("#changeAddress").show();
    $("#confirmAddress").show();
    $("#unConfirmAddress").hide();
    $("#addressConfirmed").hide();
  }
}

function populateEditorForm(data){
// populate the editor form
$("#name").val(data.address.name);
$("#address_id").val(data.address.id);
$("#address_line_1").val(data.address.address_line_1);
$("#address_line_2").val(data.address.address_line_2);
$("#city").val(data.address.city);
$("#state").val(data.address.state);
$("#zip_code").val(data.address.zip_code);
$("#phone_no").val(data.address.phone);
$("#updateAddress_authentication_token").val(getKey()); 
}

function populateVerificationDetails(data){
// show the verification messages
$("#shipping_not_paid").hide();
$("#split_required").hide();
$("#address_not_confirmed").hide()
$("#perk_is_undefined").hide();
$("#no_problems").hide();

var errorList = data.verification_details;
if (errorList)
{
  if (errorList.length == 0) 
  {
    $("#no_problems").show();
  }
  else
  {
    for(var i=0; i < errorList.length; i++)
    {
      $("#" + errorList[i]).show();
    }
  }
}
else
{
  $("#no_problems").show();
}  
}

function updateAddresses()
{
  var $form = $("#updateAddresses");
  var $inputs = $form.find("input, select, button, textarea");
  var param =  $form.serializeObject(); 
  param["api_key"] = getKey();

  updateBackerAddresses(param.address_id,JSON.stringify(param));
}

function  updateBackerAddresses(id,param){
  callAPI("/v1/addresses/{0}.json".f(id), "PUT", param, onSuccessUpdateBackerAddresses, onApiError);
}

function onSuccessUpdateBackerAddresses(response){
  window.location=window.location.href;
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
  setOrderStatusId(i);
}

function addNewPerk(){
  var $form = $("#addPerk");
  var $inputs = $form.find("input, select, button, textarea");
  var param =  $form.serializeObject(); 
  param["api_key"] = getKey();
  callAPI("/v1/orders/{0}/update_perk.json".f(param.order_id), "PUT",JSON.stringify(param), onSuccessAddPerk, onApiError);
}

function onSuccessAddPerk(response){
  bootbox.alert("Perk has been added successfully", function(result) 
  {  
    location.reload();
  });
}  

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

function onDeleteOrder()
{
  callAPI("/v1/orders/{0}/delete.json?api_key={1}".f(addPerkOrderId, getKey()), "DELETE",  "" , onSuccessDeleteOrder, onApiError);
}

function onSuccessDeleteOrder(response){
  bootbox.alert("Order is deleted successfully.", function(result) 
  {  
    location.reload();
  });
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
    bootbox.alert("The total amount of the selected perks exceeds the actual amount paid. Please reselect the perks.")
  }
  else{
    var perksIds=new Array();
    j=0;
    for (var i = 0; i < perkValue.length; i++) {

      if(perkValue[i]!=0){
        perksIds[j]=perkValue[i];
        j++;
      }
    };
    var param={
      order_id: addPerkOrderId,
      perk_ids: perksIds.toString(),
      api_key: getKey()
    }

    callAPI("/v1/orders/split_the_order.json", "POST",JSON.stringify(param), onSuccessSplitPerk, onApiError);
  }
}

function onSuccessSplitPerk(response){
  bootbox.alert("Perks have been successfully added", function(result) 
  { 
    location.reload(); 
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

function selectedPerk(i,val){
  var found = jQuery.inArray(val, filterPerk);
  if (found >= 0) {
    filterPerk.splice(found, 1);
  } else {
    filterPerk.push(val);
  }
}

