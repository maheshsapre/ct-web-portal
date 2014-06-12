function changePassword()
{
  var $form = $("#changePassword");
  var $inputs = $form.find("input, select, button, textarea");
     $("#changePassword_authentication_token").val(getKey()); 
  var param =  $form.serializeObject(); 

  console.log(param);
  changePasswordInfo(JSON.stringify(param));
}

function changePasswordInfo(param) {
  callAPI("/v1/backers/current_backer.json", "PUT", param, onSuccessChangePasswordInfo, onApiError);
}

function  onSuccessChangePasswordInfo(response) {  
   bootbox.alert("updated");
  }