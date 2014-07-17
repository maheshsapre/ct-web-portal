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

function drawDatatable(tableData){

/* Render the backers table */
$('[data-ride="datatables2"]').each(function() {
  var oTable = $(this).dataTable( {
    "bProcessing": true,
    "aaData":tableData,
    "info": true,
    "bInfo": true, 
    "paging": true,
    "bFilter": true,
    "ordering": true,
    "bRetrieve":true,
    "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col col-sm-6'p>>",
    "sPaginationType": "full_numbers",
    "bPaginate": true,
    "fnDrawCallback": function () {
      $("[data-ride='datatables2'] tbody tr td:nth-child(3)").click(function () {
        var position = oTable.fnGetPosition(this); 
        RowID = oTable.fnGetData(position); 
        sessionStorage.setItem("ModuleDetailID", RowID.ModuleDetailID); 
      });
    },
    "aoColumns": [
    { "mData": null, "sTitle" : "Name", "bSortable" : true, "bVisible": true } ,
    { "mData": "email", "sTitle" : "Email", "bSortable" : true, "bVisible": true , "sWidth" : "15%"} ,
    { "mData": "address_confirmed", "sTitle" : "Address Confirmed", "bSortable" : true, "bVisible": true , "sWidth" : "15%"} ,
    { "mData": "shipping_status", "sTitle" : "Shipping Status", "bSortable" : true, "bVisible": true , "sWidth" : "20%"} ,
    { "mData": "address.country", "sTitle" : "Country", "bSortable" : true, "bVisible": true , "sWidth" : "15%"} 
    ],
    "aoColumnDefs":[
    {
      "aTargets": [ 0 ],

      "mRender": function ( url, type, full )  {
        return   full.first_name + " " + full.last_name;
      }
    },
    {
      "aTargets": [ 1 ]
      , "bSortable": false
      , "mRender": function ( url, type, full )  {
        return  '<a style="color:blue" target="_blank" href="orders.html?id='+full.id+'&page=1">' + url + '</a>';
      }
    },
    {
      "aTargets": [ 3 ]
      , "bSortable": false
      , "mRender": function ( url, type, full )  {
        var tracking_url = null;
        switch(full.shipping_service)
        {
          case "CNRPOST": 
          tracking_url = '<a style="color:blue" target="_blank" href="http://www.17track.net/en/result/post.shtml?nums={0}">{1}</a>'.f(full.tracking_number, full.tracking_number);
          break;
          case "PFC Post":
          tracking_url = '<a style="color:blue" target="_blank" href="http://www.17track.net/en/result/post.shtml?nums={0}">{1}</a>'.f(full.tracking_number, full.tracking_number);
          break;
          default: 
          if (full.shipping_service != null){
            tracking_url = "{0}<br>{1}<br>{2}".f(full.shipping_status, full.shipping_service, full.tracking_number);
          }
          else
          {
            tracking_url = full.shipping_status;
          }
          break;
        }

        return  tracking_url;
      }
    }
    ]
  } );
});
}
