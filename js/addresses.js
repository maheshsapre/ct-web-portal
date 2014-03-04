function addresses()
{
  var $form = $("#addresses");
  var $inputs = $form.find("input, select, button, textarea");
   $("#address_authentication_token").val(getKey()); 
     var param =  $form.serializeObject(); 
  console.log(param);
  updateAddresses(JSON.stringify(param));
}

function updateAddresses(param) {
  callAPI("/v1/addresses/register.json", "POST", param, onSuccessupdateUpdateAddresses, onApiError);
}

function onSuccessupdateUpdateAddresses(response) {  
 bootbox.alert("Address has been successfully added");
  getExsisitingAddresses();
  }

  function getExsisitingAddresses(){
  	 callAPI("/v1/addresses/own_addresses.json", "GET", getKeyQueryFormat(), onSuccessGetExsistingAddresses, onApiError);
  }

  function onSuccessGetExsistingAddresses(response){
  	console.log(response.data);
  	address=response.data;
  	 $("#exsistingAddress").empty();
    for (var i=0;i<response.data.length;i++){
      if(response.data[i].status=="Order_Placed"){

      $("#exsistingAddress").append("<div class='col-xs-6'><section class='panel'><div class='panel-body'><div><b>"+address[i].name+"</b></div><div>"+address[i].address_line_1+"</div><div>"+address[i].address_line_2+"</div><div>"+address[i].city+"</div><div>"+address[i].state+"</div><div>"+address[i].country+"</div><div>"+address[i].zip_code+"</div><div class='line m-l m-r'></div><a class='btn btn-danger' href='javascript:orderPlacedAddrress("+address[i].id+")'>Delete</a> <button class='btn btn-white' data-toggle='button'><span class='text'><i class='icon-thumbs-up text-success'></i>Default</span><span class='text-active'><i class='icon-thumbs-down text-danger0'></i>Default</span></button></div></section></div> ");
      }
      else{
    $("#exsistingAddress").append("<div class='col-xs-6'><section class='panel'><div class='panel-body'><div><b>"+address[i].name+"</b></div><div>"+address[i].address_line_1+"</div><div>"+address[i].address_line_2+"</div><div>"+address[i].city+"</div><div>"+address[i].state+"</div><div>"+address[i].country+"</div><div>"+address[i].zip_code+"</div><div class='line m-l m-r'></div><a class='btn btn-danger' href='javascript:deleteAddrress("+address[i].id+")'>Delete</a> <button class='btn btn-white' data-toggle='button'><span class='text'><i class='icon-thumbs-up text-success'></i>Default</span><span class='text-active'><i class='icon-thumbs-down text-danger0'></i>Default</span></button></div></section></div> ");
  }
  }
}

function deleteAddrress(id){
    
    bootbox.confirm("Do you want to delete the address?", function(result) {
if(result==true){
    callAPI("/v1/addresses/{0}/delete_address.json?{1}".f(id, getKeyQueryFormat()), "DELETE", "", onSuccessDeleteAddrress, onApiError); 
    }
});
   

}

function onSuccessDeleteAddrress(response){
	console.log(response.data);
	 getExsisitingAddresses();
}

 function orderPlacedAddrress(){
  bootbox.alert("Order has been placed for this address.Unable to delete.")
 }