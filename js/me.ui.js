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
 return 'authentication_token={0}'.f($.cookie("xsTk"));
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
 
  console.log(response.data.first_name);
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

function callAPI(resource, httpMethod, param, successHandler, errorHandler) {

  

  var serverUrl= CONFIG.url + resource; 

  $.ajax({
    type: httpMethod,
    url: serverUrl ,
    contentType: "application/json",
    data: param,
    dataType: "json",
    success: successHandler,
    error: errorHandler
  });
   //alert("api call");

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
    $("#warning").show();
    var result = jQuery.parseJSON(response.responseText);
   shippingErrorMessage=result.message;
  $("#alert1").append("<p style='font-size:15px;'>"+shippingErrorMessage+"</p>")
  }
  else{
    bootbox.alert(result.message);
  }
}
function checkCookie(){
  key=getKey();
console.log(key);
if(key==""||key==undefined){
  window.location="signin.html";
}
}

function getRole(){
  var param = {
    token:getKey()
  }
  console.log(param);
  callAPI("/v1/backers/role.json", "GET", param, onSuccessGetRole, onApiError); 
}

function onSuccessGetRole(response){
  console.log(response.data);
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
  
    $("#warning").hide();
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
  window.location="orders.html";
}


  
  