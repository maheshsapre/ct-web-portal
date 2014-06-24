var backerInfo;
var page=1;

function increment(){
	
	/*if(page>1){
	 a=getBackerArray();
	 alert(a);
	backerIds= a.concat(backerIds);
	setBackerArray(backerIds);
	alert(backerIds);
	
}*/
	$("#loading").show();
	page=parseInt(page)+1;
	if(page>0){
		$("#decrement").attr('href','increment()');
	}

window.location="backers.html?page="+page;

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
	window.location="backers.html?page="+page;
	pendingActionGeckoTeam();
}

var page = urlParameterValue( 'page' );

function getBackerInfo() {
	

	callAPI("/v1/backers.json?page="+page, "GET", getApiKeyQueryFormat(), onSuccessGetBackerInfo, onApiError);
}

function searchBackerInfo() {
	$("#searchEmail").val(urlParameterValue('q[email_cont]'));
	$("#searchCountry").val(urlParameterValue('q[addresses_country_cont]'));
	$("#searchNotCountry").val(urlParameterValue('q[addresses_country_not_cont]'));
	$("#searchOrderReference").val(urlParameterValue('q[orders_reference_no_cont]'));
	$("#searchAddressConfirmed").attr('checked', ( urlParameterValue('q[address_confirmed_eq]') == "1" ? true : false));
	$("#searchPerkName").val(urlParameterValue('q[orders_perks_name_cont]'));
	

	var url = "/v1/backers.json" + window.location.search;
	console.log(url);	
	callAPI(url, "GET", getApiKeyQueryFormat(), onSuccessSearchGetBackerInfo, onApiError);
}

function onSuccessGetBackerInfo(response) {  
$("#loading").hide();
	if(response.data.length<10){
		$("#increment").removeAttr('href');
	}
	drawDatatable(response.data);
}

function onSuccessSearchGetBackerInfo(response) {  
	$("#loading").hide();
	drawDatatable(response.data);
}

function onSearchBacker() {
	
	var url = "&q[address_confirmed_eq]=" + ($("#searchAddressConfirmed").is(':checked') ? 1 : 0);
	if ($.trim($("#searchEmail").val()).length > 0) url = url + "&q[email_cont]="+ encodeURIComponent($("#searchEmail").val());
	if ($.trim($("#searchCountry").val()).length > 0) url = url + "&q[addresses_country_cont]="+ encodeURIComponent($("#searchCountry").val());
	if ($.trim($("#searchNotCountry").val()).length > 0) url = url + "&q[addresses_country_not_cont]="+ encodeURIComponent($("#searchNotCountry").val());
	if ($.trim($("#searchPerkName").val()).length > 0) url = url + "&q[orders_perks_name_cont]="+ encodeURIComponent($("#searchPerkName").val());
	if ($.trim($("#searchOrderReference").val()).length > 0) url = url + "&q[orders_reference_no_cont]="+ encodeURIComponent($("#searchOrderReference").val());    	
	
	window.location="backers.html?" + url + "&page=1&search=1&size=10"  ;
}


function checkText(){
  var txt=$("#validateText").val();
  if(txt=="Send email now"){
    $("#loading").show();
    sendEmailToBackers();
  }
  else{
   bootbox.alert("Enter the proper text");
 }
}

function checkBackerLength(){
$("#validateText").val("");
if(backerIds.length==0){
		$("#alertMessage").html("<p style='color:red;'>Emails will be sent to all the backers.");
	}
	else{
		$("#alertMessage").html("<p style='color:red;'>Emails will be sent to  "+backerIds.length+" backers.");

}
}

function sendEmailToBackers(){
	var txt=$("#validateText").val();
	

  if(txt=="Send email now"){
 var $form = $("#sendEmail");
  var $inputs = $form.find("input, select, button, textarea");
  var param1 =  $form.serializeObject(); 
  a=backerIds.toString();
  if(backerIds.length!=0){
  var param = {
   "user_ids" : a,
    "email_type" : param1.email_type
 };
}
else{
	 var param = {
    "email_type" : param1.email_type
 };
}
 console.log(param);
  sendEmail(JSON.stringify(param));
  }
  else{
  	bootbox.alert("please enter the proper text");
  }
}

function  sendEmail(param){
	$("#loading").show();
    callAPI("/v1/backers/send_email.json", "POST",param, onSuccessSendEmail, onApiError);
}
function onSuccessSendEmail(response){
  $("#loading").hide();
     bootbox.alert(response.data, function(result) 
    {  
      if(result==undefined){
     window.location=window.location.href;
    }
      });
}
