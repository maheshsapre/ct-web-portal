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
  callAPI("/v1/backers/current_backer/change_password.json", "PUT", param, onSuccessChangePasswordInfo, onApiError);
}

function  onSuccessChangePasswordInfo(response) { 
      bootbox.alert("Password has been changed successfully.Please Login", function(result) 
    {  
      if(result==undefined){
       window.location="signin.html";
      }
     });


  }