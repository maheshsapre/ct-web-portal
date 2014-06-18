var userEmail;
var shippingErrorMessage;
function getKey() {
  $.cookie.json = false;
  return $.cookie("xsTk");
}

function setKey(value) {
  $.cookie("xsTk", value, { expires: 5 }); // 5 days expiry
}

function clearKey()
{  
  $.cookie("xsTk", "", { expires: 5 });
}


function getRoles() {
  $.cookie.json = false;
  return $.cookie("xsTr");
}

function setRole(value) {
  $.cookie("xsTr", value, { expires: 5 }); // 5 days expiry
}

function clearRole()
{  
  $.cookie("xsTr", "", { expires: 5 });
}

// function getPendingActionsGeckoTeam() {
//   $.cookie.json = true;
//   return $.cookie("xsTA");
// }

// function setPendingActionGeckoTeam(value) {
//   console.log(value);
//    $.cookie.json = true;
//   $.cookie("xsTA", value, { expires: 5 }); // 5 days expiry
// }

// function clearPendingActionsGeckoTeam()
// {  
//   $.cookie("xsTA", "", { expires: 5 });
// }

// function getPendingOrdersAccepted() {
//   $.cookie.json = true;
//   return $.cookie("xsTL");
// }

// function setPendingOrderAccepted(value) {
//   console.log(value);
//    $.cookie.json = true;
//   $.cookie("xsTL", value, { expires: 5 }); // 5 days expiry
// }

// function clearPendingOrderAccepted()
// {  
//   $.cookie("xsTL", "", { expires: 5 });
// }

// function getPendingShipment() {
//   $.cookie.json = true;
//   return $.cookie("xsTH");
// }

// function setPendingShipment(value) {
//   console.log(value);
//    $.cookie.json = true;
//   $.cookie("xsTH", value, { expires: 5 }); // 5 days expiry
// }

// function clearPendingShipment()
// {  
//   $.cookie("xsTH", "", { expires: 5 });
// }
// function getShipmentDone() {
//   $.cookie.json = true;
//   return $.cookie("xsTD");
// }

// function setShipmentDone(value) {
//   console.log(value);
//    $.cookie.json = true;
//   $.cookie("xsTD", value, { expires: 5 }); // 5 days expiry
// }

// function clearShipmentDone()
// {  
//   $.cookie("xsTD", "", { expires: 5 });
// }

// function getPendingActionCustomer() {
//   $.cookie.json = true;
//   return $.cookie("xsTP");
// }

// function setPendingActionCustomer(value) {
//    $.cookie.json = true;
//   $.cookie("xsTP", value, { expires: 5 }); // 5 days expiry
// }

// function clearPendingActionCustomer()
// {  
//   $.cookie("xsTP", "", { expires: 5 });
// }


function getOrderStatus() {
  $.cookie.json = true;
  return $.cookie("xsTS");
}

function setOrderStatus(value) {
   $.cookie.json = true;
  $.cookie("xsTS", value, { expires: 5 }); // 5 days expiry
}

function clearOrderStatus()
{  
  $.cookie("xsTS", "", { expires: 5 });
}
function getOrderStatusId() {
  $.cookie.json = true;
  return $.cookie("xsTI");
}

function setOrderStatusId(value) {
   $.cookie.json = true;
  $.cookie("xsTI", value, { expires: 5 }); // 5 days expiry
}

function clearOrderStatusId()
{  
  $.cookie("xsTI", "", { expires: 5 });
}

// function getBackerInformation() {
//   $.cookie.json = true;
//   return $.cookie("xsTB");
// }

// function setBackerInfo(value) {
//   console.log(value);
//    $.cookie.json = true;
//   $.cookie("xsTB", value, { expires: 5 }); // 5 days expiry
// }

// function clearBackerInfo()
// {  
//   $.cookie("xsTB", "", { expires: 5 });
// }

function getBackerOrdersAction() {
  $.cookie.json = true;
  return $.cookie("xsTO");
}

function setBackerOrdersAction(value) {
   $.cookie.json = true;
  $.cookie("xsTO", value, { expires: 5 }); // 5 days expiry
}

function clearBackerOrdersAction()
{  
  $.cookie("xsTO", "", { expires: 5 });
}

function getKeyQueryFormat() {
 $.cookie.json = false;
 return 'authentication_token={0}&api_key={0}'.f($.cookie("xsTk"));
 //return 'api_key=owQPBHkrMwKW9SY7DtpP';
 }

 function getApiKeyQueryFormat() {
 $.cookie.json = false;
 return 'api_key={0}'.f($.cookie("xsTk"));
 //return 'api_key=owQPBHkrMwKW9SY7DtpP';
 }

function getCurrentUserName() {
$.cookie.json = false;
  return $.cookie("xsUsr");
 
}

function setCurrentUser(value) {
  $.cookie.json = true;
  $.cookie("xsUsr", value, { expires: 1 }); // 1 day expiry

}

function clearCurrentUser()
{
  $.cookie("xsUsr", "", { expires: 1 });
}

function getErrorMessage() {
$.cookie.json = false;
  return $.cookie("xsUsm");
 
}

function  setErrorMessage(value) {
  $.cookie.json = true;
  $.cookie("xsUsm", value, { expires: 1 }); // 1 day expiry

}

function clearErrorMessage()
{
  $.cookie("xsUsm", "", { expires: 1 });
}

function getSearchEmail() {
  return $.cookie("xsEm");
}

function setSearchEmail(value) {
   $.cookie.json = false;
  $.cookie("xsEm", value, { expires: 5 }); // 5 days expiry
}

function clearSearchEmail()
{  
  $.cookie("xsEm", "", { expires: 5 });
}
function getSearchPledgeId() {
  return $.cookie("xsPi");
}

function setSearchPledgeId(value) {
   $.cookie.json = false;
  $.cookie("xsPi", value, { expires: 5 }); // 5 days expiry
}

function clearSearchPledgeId()
{  
  $.cookie("xsPi", "", { expires: 5 });
}

function getBackerArray() {
  return $.cookie("xsPa");
}

function setBackerArray(value) {
   $.cookie.json = false;
  $.cookie("xsPa", value, { expires: 5 }); // 5 days expiry
}

function clearBackerArray()
{  
  $.cookie("xsPa", "", { expires: 5 });
}

String.prototype.format = String.prototype.f = function() {
  var s = this,
  i = arguments.length;

  while (i--) {
    s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
  }
  return s;
}; 

function getCurrentUser(){

 callAPI("/v1/backers/current_backer.json", "GET", getKeyQueryFormat(), onSuccessGetCurrentUser,onApiError);
}


function onSuccessGetCurrentUser(response) {
  currentUser = response.data.email;
  setCurrentUser(currentUser);
  userEmail=response.data.email;
 
   $("#personalInfoEmail").val(userEmail); 
      $("#first_name").val(response.data.first_name); 
         $("#last_name").val(response.data.last_name); 
		    $("#me").empty();
  $("<label />", { text: currentUser }).appendTo("#me");
}

function setCurrentUserName(){
     $("#me").empty();
    $("<label />", { text: getCurrentUserName() }).appendTo("#me");
}

function process(option) {
	var resource = "";
	switch(option)
	{
		case "INDIA_SHIPPING_PAID":
			resource = "/v1/backers/backer_details?q%5Bshipping_paid_true%5D=1&q%5Baddresses_country_cont%5D=India&size=10000";
			break;
		case "INDIA_SHIPPING_NOT_PAID":
			resource = "/v1/backers/backer_details?q%5Bshipping_paid_false%5D=1&q%5Baddresses_country_cont%5D=India&size=10000";
			break;
		case "USA_ALL":
			resource = "/v1/backers/backer_details?q%5Baddresses_country_cont%5D=United%20States&size=100000";
			break;
		case "NON_USA_ALL":
			resource = "/v1/backers/backer_details?q%5Baddresses_country_not_cont%5D=United%20States&size=100000";
			break;
		case "NON_USA_SHIPPING_PAID":
			resource =  "/v1/backers/backer_details?q%5Bshipping_paid_true%5D=1&q%5Baddresses_country_not_in%5D=United%20States%2CIndia&size=10000";
			break;
		case "NON_USA_SHIPPING_NOT_PAID":
			resource = "/v1/backers/backer_details?q%5Bshipping_paid_false%5D=1&q%5Baddresses_country_not_in%5D=United%20States%2CIndia&size=10000";
			break;
		case "UNDEFINED_PERK":
			resource = "/v1/orders/order_details.json?q%5Bperk_id_eq%5D=15&size=10000";
			break;
		case "ORDER_REQUIRES_SPLIT":
			resource = "/v1/orders/order_details.json?q%5Bsplit_true%5D=1&size=10000";
			break;
		case "SHIPPED_ORDERS":
			resource = "/v1/orders/order_details.json?q%5Border_status_id_eq%5D=5&size=10000";
			break;
		case "UNSHIPPED_ORDERS":
			resource = "/v1/orders/order_details.json?q%5Border_status_id_not_eq%5D=5&size=10000";
			break;
		case "MULTIPLE_ADDRESSES":
			resource = "/v1/backers/multiple_address_backers.json?&size=10000";
			break;
		default: 
			resource = "undefined";
	}
 
  var serverUrl= CONFIG.url + resource + "&" + getKeyQueryFormat(); 
//$.get(serverUrl);
window.open(serverUrl, "_blank");
} 

function callAPI(resource, httpMethod, param, successHandler, errorHandler) {
  var serverUrl= CONFIG.url + resource; 

  // console.log( httpMethod + " " + serverUrl);
  // console.log(  param);
  
  $.ajax({
    type: httpMethod,
    url: serverUrl ,
    contentType: "application/json",
    data: param,
    dataType: "json",
    success: successHandler,
    error: errorHandler
  });
} 
function onApiError(response, exception) {  

 var message = "";  
  var result = jQuery.parseJSON(response.responseText);
  switch(response.status)
  {
    case 0:
            message = SERVER_RESPONSE.Code[0].message_0;
            break;
    case 401:
          
            message = SERVER_RESPONSE.Code[1].message_401;
            break;
    case 404:
            message = SERVER_RESPONSE.Code[2].message_404+ result.message;
            break;
    case 422:
            message =  result.message;
            break;
    case 500:
            message = SERVER_RESPONSE.Code[4].message_500 + result.message;
            break;

    default :
           if (exception === 'parsererror') {
              message =  SERVER_RESPONSE.Exception[0].message_parsererror+ result.message;
            } else if (exception === 'timeout') {
              message =  SERVER_RESPONSE.Exception[1].message_timeout+ result.message;
            } else if (exception === 'abort') {
              message =  SERVER_RESPONSE.Exception[2].message_abort+ result.message;
            } else {
              message = SERVER_RESPONSE.Default + result.message;
            }   
            break;
  }
  bootbox.alert(message);
 $("#loading").hide();
}

function onApiError1(response, exception){
  if(response.status==400){
    var result = jQuery.parseJSON(response.responseText);
	shippingErrorMessage=result.message;
	$("#verificationDetails").append("<p class=' list-group-item icon-warning-sign '>"+shippingErrorMessage+"</p>");
  }
  else{
    bootbox.alert(result.message);
  }
}
function checkCookie(){
  key=getKey();
if(key==""||key==undefined){
  window.location="signin.html";
}
}

function getRole(){
  var param = {
    token:getKey()
  }
  callAPI("/v1/backers/role.json", "GET", param, onSuccessGetRole, onApiError); 
}

function onSuccessGetRole(response){
  setRole(response.data.role);
  if(response.data.role=="admin"){
 window.location="dashboard.html";
}
else{
window.location="orders.html";
}
}

function loggedInrole(){

role=getRoles();
 if(role=="admin"){
  $("#admin").show();
    $("#admin1").show();
  
	$("#tracking-wizard").hide();
    $("#saveOrders").hide();   
}
else{
   $("#actionButton").hide();
   $("#emailSearch").hide();
    $("#pledgeIdSearch").hide();
   $("#admin3").show();
      $("#admin2").show();
}
}

function urlParameterValue( name ){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
    var regexS = "[\\?&]"+name+"=([^&#]*)";  
    var regex = new RegExp( regexS );  
    var results = regex.exec( window.location.href ); 
    if( results == null )    return "";  
    else    return results[1];}

function logout(){
   clearKey();
   clearRole();
   clearOrderStatus();
   clearBackerOrdersAction();
   clearErrorMessage();
   clearCurrentUser();
   window.location="signin.html";
}

function myFunction()
  {   
    var val=getKey();
  
    if(val==""||val==undefined)
    {  
      window.location="signin.html";
    }

  }

function cancel(){
	if(getRoles()!="admin"){
		window.location="orders.html";
	}
	else
	{
		window.location="backers.html?page=1";
	}
}


  
  