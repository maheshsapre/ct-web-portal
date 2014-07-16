var backerInfo;
var page=1;

$(document).ready(function()
{
	// $('#data-table-ex').DataTable( {
 //          dom: 'T<"clear">lfrtip',
 //          "tableTools": {
 //            "aButtons": [ "copy", "print" ]
 //        	}
 //        } );

    $('#data-table-ex').dataTable( {
        "sDom": 'T<"clear">lfrtip',
        "oTableTools": {
            "aButtons": [
                "copy",
                "print",
                {
                    "sExtends":    "collection",
                    "sButtonText": "Save",
                    "aButtons":    [ "csv", "xls", "pdf" ]
                }
            ]
        }
    } );




	$('#adminBackers').addClass("active");
	setCurrentUserName();
	var search = urlParameterValue( 'search' );
	if(search==""){
		getBackerInfo();
	}
	else{
		searchBackerInfo();
	}
});

var page = urlParameterValue( 'page' );
function getBackerInfo() {
	callAPI("/v1/backers.json?page="+page, "GET", getApiKeyQueryFormat(), onSuccessGetBackerInfo, onApiError);
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
	if (response.data == "Email sent")
	{
		alert("Search result is sent to the specified email.");
	}
	else
	{
		drawDatatable(response.data);
	}
}

function onSearchBacker() {
	var url = "";	
	if ($.trim($("#shipment-status").val()).length > 0) url = url + "&q[shipping_status_eq]="+ encodeURIComponent($.trim($("#shipment-status").val()));    	
	if ($.trim($("#address_confirmed").val()).length > 0) url = url + "&q[address_confirmed_eq]="+ encodeURIComponent($.trim($("#address_confirmed").val()));    	

	if ($.trim($("#searchEmail").val()).length > 0) url = url + "&q[email_cont]="+ encodeURIComponent($.trim($("#searchEmail").val()));
	if ($.trim($("#searchCountry").val()).length > 0) url = url + "&q[addresses_country_cont]="+ encodeURIComponent($.trim($("#searchCountry").val()));
	if ($.trim($("#searchNotCountry").val()).length > 0) url = url + "&q[addresses_country_not_cont]="+ encodeURIComponent($.trim($("#searchNotCountry").val()));
	if ($.trim($("#searchPerkName").val()).length > 0) url = url + "&q[orders_perks_name_cont]="+ encodeURIComponent($.trim($("#searchPerkName").val()));
	if ($.trim($("#searchOrderReference").val()).length > 0) url = url + "&q[orders_reference_no_cont]="+ encodeURIComponent($.trim($("#searchOrderReference").val()));    	

	if ($.trim($("#shipping_date_gteq").val()).length > 0) url = url + "&q[shipping_date_gteq]="+ encodeURIComponent($.trim($("#shipping_date_gteq").val()));    	
	if ($.trim($("#shipping_date_lteq").val()).length > 0) url = url + "&q[shipping_date_lteq]="+ encodeURIComponent($.trim($("#shipping_date_lteq").val()));    	

	if ($.trim($("#data_format").val()).length > 0) url = url + "&data_format="+ encodeURIComponent($.trim($("#data_format").val()));    	
	if ($.trim($("#report_to").val()).length > 0) url = url + "&report_to="+ encodeURIComponent($.trim($("#report_to").val()));    	
	
	window.location="backers.html?" + url + "&page=1&search=1&size=100000"  ;
}

function searchBackerInfo() {
	$("#searchEmail").val(decodeURIComponent(urlParameterValue('q[email_cont]')));
	$("#searchCountry").val(decodeURIComponent(urlParameterValue('q[addresses_country_cont]')));
	$("#searchNotCountry").val(decodeURIComponent(urlParameterValue('q[addresses_country_not_cont]')));
	$("#searchOrderReference").val(decodeURIComponent(urlParameterValue('q[orders_reference_no_cont]')));
	$("#searchPerkName").val(decodeURIComponent(urlParameterValue('q[orders_perks_name_cont]')))
	$("#shipping_date_gteq").val(decodeURIComponent(urlParameterValue('q[shipping_date_gteq]')))
	$("#shipping_date_lteq").val(decodeURIComponent(urlParameterValue('q[shipping_date_lteq]')))

	$("#shipment-status").val(decodeURIComponent(urlParameterValue('q[shipping_status_eq]')))
	$("#address_confirmed").val(decodeURIComponent(urlParameterValue('q[address_confirmed_eq]')))

	$("#data_format").val(decodeURIComponent(urlParameterValue('data_format')))
	$("#report_to").val(decodeURIComponent(urlParameterValue('report_to')))

	var url = "/v1/backers.json" + window.location.search;
	callAPI(url, "GET", getApiKeyQueryFormat(), onSuccessSearchGetBackerInfo, onApiError);
}

