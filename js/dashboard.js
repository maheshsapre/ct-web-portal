var orderStatus;

$(document).ready(function()
{

  var options = { 
    beforeSend: function() 
    {
      $("#progress").show();
      //clear everything
      $("#bar").width('0%');
      $("#message").html("");
      $("#percent").html("0%");
    },
    uploadProgress: function(event, position, total, percentComplete) 
    {
      $("#bar").width(percentComplete+'%');
      $("#percent").html(percentComplete+'%');
      
      
    },
    success: function() 
    {
      $("#bar").width('100%');
      $("#percent").html('100%');

    },
    complete: function(response) 
    {   $("#loader").remove();
      var obj = JSON.parse(response.responseText);
      console.log(obj.data);
      console.log(obj.message);
      if(obj.status==200){  
        $("#uploadError").css('display','none');
        $("#uploadSuccess").css('display','block');
        callAPI("/v1/orders/order_status_summary.json", "GET", getKeyQueryFormat(), onSuccessStatusSummary, onApiError);
        callAPI("/v1/orders/perk_summary.json", "GET", getKeyQueryFormat(), onSuccessPerksummary, onApiError);
        callAPI("/v1/orders/total_backers_and_orders.json", "GET", getKeyQueryFormat(), onSuccessTotalBackers, onApiError);
        
      }
      if(obj.status==400){ 
        $("#loader").remove();
        if(obj.code==9110){
        $("#uploadSuccess").css('display','none');
        $("#uploadError").css('display','block');
        setErrorMessage(obj.message);
      }
        //drawDatatable(obj.message);
        if(obj.code==3003){
         $("#basicInfo").empty().append("<tr><th>Line</th><th>Pledge Id</th><th>error</th></tr>");
     for(i=0;i<obj.message.length;i++){
      basic=obj.message[i];
    $("#basicInfo").append("<tr><td>"+basic.line+"</td><td>"+basic.pledge_id+"</td><td>"+ basic.error+"</td></tr>");
    }
     callAPI("/v1/orders/order_status_summary.json", "GET", getKeyQueryFormat(), onSuccessStatusSummary, onApiError);
        callAPI("/v1/orders/perk_summary.json", "GET", getKeyQueryFormat(), onSuccessPerksummary, onApiError);
        callAPI("/v1/orders/total_backers_and_orders.json", "GET", getKeyQueryFormat(), onSuccessTotalBackers, onApiError);
  }
         // $("#csvErrorTable").css('display','block');
        return;
      }
    //$("#message").html("<font color='green'>"+response.responseText+"</font>");
  },
  error: function()
  {       $("#loader").remove();
    $("#message").html("<font color='red'> ERROR: unable to upload files</font>");

  }
  
}; 

$("#backerCsv").ajaxForm(options);

});


function getFileAction(){
  
  $("#backerCsv").attr("action",CONFIG.url+"/v1/backers/upload_csv.json");
  
}


function onSuccessStatusSummary(response){
  orderStatus=response.data;
  setOrderStatus(response.data);
  if(orderStatus.order_accepted!=0)
    $("#orderAccepted").addClass("badge bg-success");

  if(orderStatus.pending_action_customer!=0)
   $("#pendingActionCustomer").addClass("badge bg-success");

 if(orderStatus.pending_action_customer!=0)
   $("#pending_action_gecko_team").addClass("badge bg-success");

 if(orderStatus.pending_action_gecko_team!=0)
   $("#pendingActionGeckoTeam").addClass("badge bg-success");

 if(orderStatus.pending_shippment!=0)
  $("#pendingShipment").addClass("badge bg-success");

if(orderStatus.shipped!=0)
  $("#shipped").addClass("badge bg-success");

if(orderStatus.incomplete_address!=0)
  $("#inCompleteAddress").addClass("badge bg-success");

if(orderStatus.undefined_perk!=0)
  $("#PerkNotMentioned").addClass("badge bg-success");

if(orderStatus.shipping_not_paid!=0)
  $("#ShippingNotPaid").addClass("badge bg-success");

$("#orderAccepted").html(orderStatus.order_accepted);
$("#pendingActionCustomer").html(orderStatus.pending_action_customer);
$("#pendingActionGeckoTeam").html(orderStatus.pending_action_gecko_team);
$("#pendingShipment").html(orderStatus.pending_shippment);
$("#shipped").html(orderStatus.shipped);
$("#inCompleteAddress").html(orderStatus.incomplete_address);
$("#PerkNotMentioned").html(orderStatus.undefined_perk);
$("#ShippingNotPaid").html(orderStatus.shipping_not_paid);
}

function onSuccessPerksummary(response){
  if(response.data.key_chain!=0)
    $("#key_chain").addClass("badge bg-success");

  if(response.data.dslr_camera!=0)
   $("#dslr_camera").addClass("badge bg-success");

 if(response.data.early_gecko!=0)
   $("#early_gecko").addClass("badge bg-success");

 if(response.data.gecko!=0)
   $("#gecko").addClass("badge bg-success");

 if(response.data.gecko_2!=0)
  $("#gecko_2").addClass("badge bg-success");

if(response.data.gecko_4!=0)
  $("#gecko_4").addClass("badge bg-success");


if(response.data.gecko_6!=0)
  $("#gecko_6").addClass("badge bg-success");

if(response.data.gecko_geek!=0)
  $("#gecko_geek").addClass("badge bg-success");

if(response.data.gecko_trio!=0)
  $("#gecko_trio").addClass("badge bg-success");

if(response.data.luggage_tag!=0)
  $("#luggage_tag").addClass("badge bg-success");

if(response.data.pink_gecko!=0)
  $("#pink_gecko").addClass("badge bg-success");

if(response.data.gecko_gateway_coupon!=0)
  $("#gecko_gateway_coupon").addClass("badge bg-success");

if(response.data.vb_gecko!=0)
  $("#vb_gecko").addClass("badge bg-success");

if(response.data.gecko_reseller_pack!=0)
  $("#gecko_reseller_pack").addClass("badge bg-success");

if(response.data.shipping_charges!=0)
  $("#shipping_charges").addClass("badge bg-success");

if(response.data.undefined!=0)
  $("#undefined").addClass("badge bg-success");

$("#key_chain").html(response.data.key_chain);
$("#dslr_camera").html(response.data.dslr_camera);
$("#early_gecko").html(response.data.early_gecko);
$("#gecko").html(response.data.gecko);
$("#gecko_2").html(response.data.gecko_2);
$("#gecko_4").html(response.data.gecko_4);
$("#gecko_6").html(response.data.gecko_6);
$("#gecko_gateway_coupon").html(response.data.gecko_gateway_coupon);
$("#gecko_geek").html(response.data.gecko_geek);
$("#gecko_trio").html(response.data.gecko_trio);
$("#luggage_tag").html(response.data.luggage_tag);
$("#pink_gecko").html(response.data.pink_gecko);
$("#vb_gecko").html(response.data.vb_gecko);
$("#gecko_reseller_pack").html(response.data.gecko_reseller_pack);
$("#undefined").html(response.data.undefined);
$("#shipping_charges").html(response.data.shipping_charges);


}

function onSuccessTotalBackers(response){

  $("#orders").html(response.data.orders);
  $("#backers").html(response.data.backers);
   $("#loading").hide();
}

$(document).ready(function() {
 callAPI("/v1/orders/order_status_summary.json", "GET", getKeyQueryFormat(), onSuccessStatusSummary, onApiError);
 callAPI("/v1/orders/perk_summary.json", "GET", getKeyQueryFormat(), onSuccessPerksummary, onApiError);
 callAPI("/v1/orders/total_backers_and_orders.json", "GET", getKeyQueryFormat(), onSuccessTotalBackers, onApiError);


});

function sendEmailToBackers(){
 var $form = $("#sendEmail");
  var $inputs = $form.find("input, select, button, textarea");
  var param =  $form.serializeObject(); 
  console.log(param);
  sendEmail(JSON.stringify(param));
}

function  sendEmail(param){
    callAPI("/v1/backers/send_email.json", "POST",param, onSuccessSendEmail, onApiError);
}

function onSuccessSendEmail(response){
  $("#loading").hide();
     bootbox.alert("Mails have been sent successfully", function(result) 
    {  
      if(result==undefined){
     window.location=window.location.href;
    }
      });
}

function deleteBackerData(){

var txt=$("#validateDeleteText").val();
if(txt=="Delete backer information"){
    $("#loading").show();
     callAPI("/v1/backers/delete_all.json", "DELETE", "", onSuccessDeleteBackerData, onApiError); 
}
else{
   bootbox.alert("Enter the proper text");
}
}


function onSuccessDeleteBackerData(response){
  window.location="dashboard.html";
}