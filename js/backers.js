var backerInfo;
var page=1;

function increment(){
$("#loading").show();
 page=parseInt(page)+1;
 if(page>0){
 $("#decrement").attr('href','increment()');
 }
 window.location="backers.html?page="+page;
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
window.location="backers.html?page="+page;
 pendingActionGeckoTeam();
}



 var page = urlParameterValue( 'page' );

function getBackerInfo() {
  callAPI("/v1/backers.json?page="+page, "GET", getApiKeyQueryFormat(), onSuccessGetBackerInfo, onApiError);
}

function onSuccessGetBackerInfo(response) {  
//setBackerInfo(response.data);
$("#loading").hide();
if(response.data.length<10){
$("#increment").removeAttr('href');
}
drawDatatable(response.data);
  }

