var addressId;
var addPerkOrderId;
var addPerkTotalAmount;
var opendingActionCustomer;
var filters=new Array();
var backerIds=new Array();
var addressIdArray=new Array();
var i=0;
var gfull;

function showHelp()
{
	window.open("https://geckotag.zendesk.com", "_blank");
}

function toggleCheckboxBacker(gfull){
	var found = jQuery.inArray(gfull, backerIds);
	if (found >= 0) {
// Element was found, remove it.
backerIds.splice(found, 1);
} else {
// Element was not found, add it.
backerIds.push(gfull);
}
}

function toggleCheckbox(gfull){
	var found = jQuery.inArray(gfull, filters);
	if (found >= 0) {
// Element was found, remove it.
filters.splice(found, 1);
} else {
// Element was not found, add it.
filters.push(gfull);
}
}
function drawDatatable(tableData){



//backerInfo=getBackerInformation();
backerOrder=getBackerOrdersAction();



$('#docs pre code').each(function(){
	var $this = $(this);
	var t = $this.html();
	$this.html(t.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
});

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

$(document).on('click', '.the-icons a', function(e){
	e && e.preventDefault();
});

$(document).on('change', 'table thead [type="checkbox"]', function(e){
	e && e.preventDefault();
	var $table = $(e.target).closest('table'), $checked = $(e.target).is(':checked');
	$('tbody [type="checkbox"]',$table).attr('checked', $checked);
});

$(document).on('click', '[data-toggle^="progress"]', function(e){
	e && e.preventDefault();

	$el = $(e.target);
	$target = $($el.data('target'));
	$('.progress', $target).each(
		function(){
			var $max = 50, $data, $ps = $('.progress-bar',this).last();
			($(this).hasClass('progress-mini') || $(this).hasClass('progress-small')) && ($max = 100);
			$data = Math.floor(Math.random()*$max)+'%';
			$ps.css('width', $data).attr('data-original-title', $data);
		}
		);
});

function addNotification($notes){
	var $el = $('#panel-notifications'), $n = $('.count-n:first', $el), $item = $('.list-group-item:first', $el).clone(), $v = parseInt($n.text());
	$('.count-n', $el).fadeOut().fadeIn().text($v+1);
	$item.attr('href', $notes.link);
	$item.find('.pull-left').html($notes.icon);
	$item.find('.media-body').html($notes.title);
	$item.hide().prependTo($el.find('.list-group')).slideDown().css('display','block');
}
var $noteMail = {
	icon: '<i class="icon-envelope-alt icon-2x text-default"></i>',
	title: 'Added the mail app, Check it out.<br><small class="text-muted">2 July 13</small>',
	link: 'mail.html'
}
var $noteCalendar = {
	icon: '<i class="icon-calendar icon-2x text-default"></i>',
	title: 'Added the calendar, Get it.<br><small class="text-muted">10 July 13</small>',
	link: 'calendar.html'
}
var $noteTimeline = {
	icon: '<i class="icon-time icon-2x text-default"></i>',
	title: 'Added the timeline, view it here.<br><small class="text-muted">1 minute ago</small>',
	link: 'timeline.html'
}
window.setTimeout(function(){addNotification($noteMail)}, 2000);
window.setTimeout(function(){addNotification($noteCalendar)}, 3500);
window.setTimeout(function(){addNotification($noteTimeline)}, 5000);

// fullcalendar
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
var addDragEvent = function($this){
// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
// it doesn't need to have a start or end
var eventObject = {
title: $.trim($this.text()), // use the element's text as the event title
className: $this.attr('class').replace('label','')
};

// store the Event Object in the DOM element so we can get to it later
$this.data('eventObject', eventObject);

// make the event draggable using jQuery UI
$this.draggable({
	zIndex: 999,
revert: true,      // will cause the event to go back to its
revertDuration: 0  //  original position after the drag
});
};
$('.calendar').each(function() {
	$(this).fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		editable: true,
droppable: true, // this allows things to be dropped onto the calendar !!!
drop: function(date, allDay) { // this function is called when something is dropped

// retrieve the dropped element's stored Event Object
var originalEventObject = $(this).data('eventObject');

// we need to copy it, so that multiple events don't have a reference to the same object
var copiedEventObject = $.extend({}, originalEventObject);

// assign it the date that was reported
copiedEventObject.start = date;
copiedEventObject.allDay = allDay;

// render the event on the calendar
// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

// is the "remove after drop" checkbox checked?
if ($('#drop-remove').is(':checked')) {
// if so, remove the element from the "Draggable Events" list
$(this).remove();
}

}
,
events: [
{
	title: 'All Day Event',
	start: new Date(y, m, 1)
},
{
	title: 'Long Event',
	start: new Date(y, m, d-5),
	end: new Date(y, m, d-2),
	className:'bg-primary'
},
{
	id: 999,
	title: 'Repeating Event',
	start: new Date(y, m, d-3, 16, 0),
	allDay: false
},
{
	id: 999,
	title: 'Repeating Event',
	start: new Date(y, m, d+4, 16, 0),
	allDay: false
},
{
	title: 'Meeting',
	start: new Date(y, m, d, 10, 30),
	allDay: false
},
{
	title: 'Lunch',
	start: new Date(y, m, d, 12, 0),
	end: new Date(y, m, d, 14, 0),
	allDay: false
},
{
	title: 'Birthday Party',
	start: new Date(y, m, d+1, 19, 0),
	end: new Date(y, m, d+1, 22, 30),
	allDay: false
},
{
	title: 'Click for Google',
	start: new Date(y, m, 28),
	end: new Date(y, m, 29),
	url: 'http://google.com/'
}
]
});
});
$('#myEvents').on('change', function(e, item){
	addDragEvent($(item));
});

$('#myEvents li').each(function() {
	addDragEvent($(this));
});

// fuelux datagrid
var DataGridDataSource = function (options) {
	this._formatter = options.formatter;
	this._columns = options.columns;
	this._delay = options.delay;
};

DataGridDataSource.prototype = {

	columns: function () {
		return this._columns;
	},

	data: function (options, callback) {
		var url = 'js/data/datagrid.json';
		var self = this;

		setTimeout(function () {

			var data = $.extend(true, [], self._data);

			$.ajax(url, {
				dataType: 'json',
				async: false,
				type: 'GET'
			}).done(function (response) {

				data = response.geonames;
// SEARCHING
if (options.search) {
	data = _.filter(data, function (item) {
		var match = false;

		_.each(item, function (prop) {
			if (_.isString(prop) || _.isFinite(prop)) {
				if (prop.toString().toLowerCase().indexOf(options.search.toLowerCase()) !== -1) match = true;
			}
		});

		return match;
	});
}

// FILTERING
if (options.filter) {
	data = _.filter(data, function (item) {
		switch(options.filter.value) {
			case 'lt5m':
			if(item.population < 5000000) return true;
			break;
			case 'gte5m':
			if(item.population >= 5000000) return true;
			break;
			default:
			return true;
			break;
		}
	});
}

var count = data.length;

// SORTING
if (options.sortProperty) {
	data = _.sortBy(data, options.sortProperty);
	if (options.sortDirection === 'desc') data.reverse();
}

// PAGING
var startIndex = options.pageIndex * options.pageSize;
var endIndex = startIndex + options.pageSize;
var end = (endIndex > count) ? count : endIndex;
var pages = Math.ceil(count / options.pageSize);
var page = options.pageIndex + 1;
var start = startIndex + 1;

data = data.slice(startIndex, endIndex);

if (self._formatter) self._formatter(data);

callback({ data: data, start: start, end: end, count: count, pages: pages, page: page });
}).fail(function(e){

});
}, self._delay);
}
};

$('#MyStretchGrid').each(function() {
	$(this).datagrid({
		dataSource: new DataGridDataSource({
// Column definitions for Datagrid
columns: [
{
	property: 'toponymName',
	label: 'Name',
	sortable: true
},
{
	property: 'countrycode',
	label: 'Country',
	sortable: true
},
{
	property: 'population',
	label: 'Population',
	sortable: true
},
{
	property: 'fcodeName',
	label: 'Type',
	sortable: true
},
{
	property: 'geonameId',
	label: 'Edit',
	sortable: true
}
],

	// Create IMG tag for each returned image
	formatter: function (items) {
			$.each(items, function (index, item) {
				item.geonameId = '<a href="#edit?geonameid='+item.geonameId+'"><i class="icon-pencil"></i></a>';
			});
		}
})
	});
});

// Render the Backers table
$('[data-ride="datatables2"]').each(function() {


console.log(tableData);


	var oTable = $(this).dataTable( {
		"bProcessing": true,
		"aaData":tableData,
		"info": true,
		"bInfo": true, // hides "Showing 1 of N entries"
		"paging": true,
		"bFilter": true,
		"ordering": true,
		"bRetrieve":true,
		"sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col col-sm-6'p>>",
		"sPaginationType": "full_numbers",
		"bPaginate": true,
		"fnDrawCallback": function () {
			$("[data-ride='datatables2'] tbody tr td:nth-child(3)").click(function () {
			var position = oTable.fnGetPosition(this); // getting the clicked row position
			RowID = oTable.fnGetData(position); 
			sessionStorage.setItem("ModuleDetailID", RowID.ModuleDetailID); // HTML 5 Session Storage;
			});
		},
		"aoColumns": [
		// {
			// "mData": null,
			// "sClass": "center",
			// "sDefaultContent": '<input id="checked" type="checkbox" </input>'
		// },
		{ "mData": "id", "bVisible":    false  },
		{ "mData": "first_name" },
		{ "mData": "last_name" },
		{ "mData": "email" },
		{ "mData": "address_confirmed" },
		{ "mData": "shipping_status" },
		{ "mData": "address.country" }
		],
		"aoColumnDefs":[{
			"aTargets": [ 3 ]
			, "bSortable": false
			, "mRender": function ( url, type, full )  {
				return  '<a style="color:blue" target="_blank" href="orders.html?id='+full.id+'&page=1">' + url + '</a>';
			}
		},
		{
			"aTargets": [ 0 ]
			, "bSortable": false
			, "mRender": function ( url, type, full )  {
				gfull=full;
				return  '<input id="checked" onchange="toggleCheckboxBacker('+gfull.id+')" type="checkbox" </input>';
			}
		}
		]
	} );
});

// Render the Orders table
$('[data-ride="datatables3"]').each(function() {
	var isAdmin = getRoles()=="admin"? true : false;
	var oTable = $(this).dataTable( {
		"bDestroy":true,
		"bProcessing": true,
		"info": false,
		"bInfo": false, // hides "Showing 1 of N entries"
		"paging": false,
		"aaData":tableData,
		"ordering": false,
		"bRetrieve":true,
		"sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col col-sm-6'p>>",
		"sPaginationType": "full_numbers",
		"bFilter": false,
		"bPaginate": false,
		"bPaginate": false,
		"aoColumnDefs": [{ "bSortable": false, "aTargets": [ 0 ] }],
		"fnFooterCallback": function ( nRow, aaData, iStart, iEnd, aiDisplay ) {
			var iTotalMarket = 0;
			for ( var i=0 ; i<aaData.length ; i++ )
			{
				iTotalMarket = parseInt(aaData[i].amount) + iTotalMarket;
			}
			/* Calculate the market share for browsers on this page */
			var iPageMarket = 0;
			for ( var i=iStart ; i<iEnd ; i++ )
			{
				iPageMarket += aaData[ aiDisplay[i] ][5]*1;
			}

			/* Modify the footer row to match what we want */
			var nCells = nRow.getElementsByTagName('th');
			nCells[1].innerHTML = iTotalMarket;
		},


		"fnDrawCallback": function () {
			$("#example tbody tr td:nth-child(8)").click(function () {
			var position = oTable.fnGetPosition(this); // getting the clicked row position
			RowID = oTable.fnGetData(position[0]); 
			$("#address_id").val(RowID.address_id);
			$("#address_Orderid").val(RowID.address_id);
			$("#backer_id").val(RowID.backer_id);
			$("#order_source").val(RowID.order_source);
			$("#refrence_number").val(RowID.reference_no);
});

			$("#example tbody tr td:nth-child(4)").click(function () {
		var position = oTable.fnGetPosition(this); // getting the clicked row position
		RowID = oTable.fnGetData(position[0]); 
		$("#order_idPerk").val(RowID.id);
		addPerkOrderId=RowID.id;
		addPerkTotalAmount=RowID.amount;
		clearPerksModalDialog();
		clearPerksAmount();
		resetPerkValueArray()
});

			$("#example tbody tr td:nth-child(5)").click(function () {
			var position = oTable.fnGetPosition(this); // getting the clicked row position
			RowID = oTable.fnGetData(position[0]); 
			$("#order_idPerk").val(RowID.id);
			addPerkOrderId=RowID.id;
			addPerkTotalAmount=RowID.amount;
			clearPerksModalDialog();
			clearPerksAmount();
			resetPerkValueArray()
});
		},


		"aaSorting": [],
		"aoColumns": [
		{
			"mData": null,
			"sClass": "center", "bVisible":    false,
			"sDefaultContent": '<input id="checked" type="checkbox" </input>'
		},
		{ "mData": "reference_no" } ,
		{ "mData": "backer.email",		"bVisible":    false } ,
		{ "mData": "perk.name" } ,
		{ "mData": "order_date",  "bVisible":    false},
		{ "mData": "amount" } ,
		{ "mData": "amount_difference",				"bVisible":    false  },
		{ "mData": "shipping_applicable",				"bVisible":    false },
		{ "mData": "shipping_paid",				"bVisible":    false },
		{ "mData": "order_status.name", "bVisible":    false },
		{ "mData": "notes",				"bVisible":    false } ,				
		{ "mData": "backer_id",				"bVisible":    false  } ,
		{ "mData": "created_at",				"bVisible":    false  } ,
		{ "mData": "id",				"bVisible":    false  },
		{ "mData": "order_source",				"bVisible":    false   } ,
		{ "mData": "address_id",				"bVisible":    false  },
		{ "mData": "perk_id",				"bVisible":    false  } ,
		{ "mData": "quantity",				"bVisible":    false  },
		{ "mData": "updated_at" ,				"bVisible":    false },
		{ "mData": null,            "bVisible":    isAdmin ,     "sClass": "center",
		"sDefaultContent": '<a  class="icon-edit" data-toggle="modal"  href="#modalAddPerk"></a><a id="splitPerkButton"  class="icon-strikethrough" data-toggle="modal"  href="#modalSelectPerks"></a><a  class="icon-remove" data-toggle="modal"  href="javascript:onDeleteOrder();"></a>'
		}
	],
	"aoColumnDefs":[{
		"aTargets": [ 2 ]
		, "bSortable": false
		, "mRender": function ( url, type, full )  {
			if(getRoles()=="admin")
				return   '<a style="color:blue" href="orders.html?id='+full.backer_id+'&page=1">' + url + '</a>';
			else
				return '<div>' + url + '</div>';
		}
	},
	{
		"aTargets": [ 3 ]
		, "bSortable": false
		, "mRender": function ( url, type, full )  {
			return   full.perk.name;
		}
	}
,
{
	"aTargets": [ 5 ]
	, "bSortable": false
	, "mRender": function ( url, type, full )  {
		gfull=full;
		if(full.split==true){
			return  full.amount;
		}
		else{
			return '<div>' + full.amount + '</div>';
		}
	}
},
{
	"aTargets": [ 0 ]
	, "bSortable": false
	, "mRender": function ( url, type, full )  {
		gfull=full;
		return  '<input id="checked" onchange="toggleCheckbox('+gfull.id+')" type="checkbox" </input>';

	}
}]

} );
role=getRoles();
if(role!="admin"){
	oTable.fnSetColumnVis( 0, false );	
	$("#backerLink").removeAttr('href')
}
});

if ($.fn.select2) {
	$("#select2-option").select2();
	$("#select2-tags").select2({
		tags:["red", "green", "blue"],
		tokenSeparators: [",", " "]}
		);
}
}