var orderStatus;

$(document).ready(function()
{

	var options = { 
		beforeSend: function() 
		{
			$("#progress").show();
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

			alert("hi");
			$("#bar").width('100%');
			$("#percent").html('100%');

		},
		error: function()
		{       $("#loader").remove();
		$("#message").html("<font color='red'> ERROR: unable to upload files</font>");

	},
	complete: function(response) 
	{   $("#loader").remove();


	alert(response);
	if(response.status==200){  
		$("#uploadError").css('display','none');
		$("#uploadSuccess").css('display','block');
	}
	else {
		$("#uploadResult").append(response.status + ": " + response.statusText + "<br/>");
		$("#uploadSuccess").css('display','none');
		$("#uploadError").css('display','block');

		if (response.responseText != "")
		{
			var obj = JSON.parse(response.responseText);
			if(obj.code==9107){
				$("#basicInfo").empty().append("<tr><th>Line</th><th>Error</th></tr>");
				for(i=0;i<obj.message.length;i++){
					basic=obj.message[i];
					$("#basicInfo").append("<tr><td>"+basic.line+"</td><td>"+ basic.error+"</td></tr>");
				}
			}
			else
			{
				$("#uploadResult").append(obj.message + "<br/>");
			}
		}
		return;
	}
}

}; 



$( "#select-upload-type" ).change(function() {

	var datatype = $("#select-upload-type").val();
	$("#data_type").val(datatype);
	$("#api_key").val(getKey());


	$("#uploadButton").show();
	var csv = "#";
	switch(datatype)
	{
		case "indiegogo": 
		csv = "https://s3.amazonaws.com/gecko-api-server-resources/backers/sample_files/indegiego_csv.csv";
		break;
		case "shopify": 
		csv = "https://s3.amazonaws.com/gecko-api-server-resources/backers/sample_files/1.shopify_list.csv";
		break;
		case "shipped": 
		csv = "https://s3.amazonaws.com/gecko-api-server-resources/backers/sample_files/2.Tracking+Nos.csv";
		break;
		case "scheduled": 
		csv = "https://s3.amazonaws.com/gecko-api-server-resources/backers/sample_files/scheduled_shippment_date.csv";
		break;
		case "merge_emails": 
		csv = "https://s3.amazonaws.com/gecko-api-server-resources/backers/sample_files/Two_email_ids_need_to_be_merged_23.06.14.csv";
		break;
		case "payu_money": 
		csv = "#";
		break;
		default:
		csv = "#";

		$("#uploadButton").hide();
		break;
	}
	$("#download_sample").attr("href", csv);
});
});

function getFileAction(){
	$("#backerCsv").attr("action",CONFIG.url+"/v1/backers/upload_data");
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
$( "#massNotification" ).click(function() {
	$("#validateText").val("");

});


$( "#deleteButton" ).click(function() {
	$("#validateDeleteText").val("")

});

$(document).ready(function() {
	$("#loading").hide();
	setCurrentUserName();
	loggedInrole();
	$("#order_source").val("igg");
	$("#api_key").val(getKey());
	getFileAction();
	$('#admin').addClass("active");
});

function submitUploadForm(){
	$("#api_key").val(getKey());
	$("#backerCsv").append('<div id="loader"></div> ');
	$("#fileButton").click();
}
function submit(option){
	$("#data_type").val(option);
	$("#api_key").val(getKey());
	$("#backerCsv").append('<div id="loader"></div> ');
	$("#fileButton-" + option).click();
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



function sendEmailToBackers(){
	var $form = $("#sendEmail");
	var $inputs = $form.find("input, select, button, textarea");
	var param =  $form.serializeObject(); 
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

function mergeEmails()
{
	var $form = $("#merge-form");
	var $inputs = $form.find("input, select, button, textarea");
	var param =  $form.serializeObject(); 
	param["api_key"] = getKey();

	mergeEmailAccounts(JSON.stringify(param));
}



function mergeEmailAccounts(param)
{
	callAPI("/v1/backers/merge_backers.json", "POST", param, onSuccessEmailAccounts, onApiError);	
}

function onSuccessEmailAccounts(response){
	bootbox.alert("Done! Accounts merged.");
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