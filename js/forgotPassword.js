function forgotPasswordForm(){
 var $form = $("#forgotPassword");
  var $inputs = $form.find("input, select, button, textarea");
  var param =  $form.serializeObject();  
  a=JSON.stringify(param);
 forgotPassword( JSON.stringify(param));
}



function forgotPassword(param){
 
 callAPI("/v1/backers/forgot_password.json", "POST", param, onSuccessforgotPassword, onApiError);

}

function onSuccessforgotPassword(response){
message="Forgot password link sent to your mail.";
  bootbox.alert(message) ;
}



function oncheckTokenExpiryApiError(response,exception){
     bootbox.alert("link has expired", function(result) 
    {  
      if(result==undefined){
       window.location="signin.html";
      }
     });
}

function  onSuccessCheckTokenExpiry(response){

 $("#resetPasswordForm").css('visibility','visible');
$("#emailId").val(response.data.email);


}

function checkTokenExpiry(){
 var reset_password_token = urlParameterValue( 'rt' );
    var param = {
      "reset_password_token" : reset_password_token 
    };
 callAPI("/v1/backers/validate_password_token.json", "GET", param, onSuccessCheckTokenExpiry,oncheckTokenExpiryApiError);

}

function onSuccessResetPassword(response) {  
   clearKey();
message="Password has been reset."
   bootbox.alert(message, function(result) 
    {  
      if(result==undefined){
       window.location="login.html";
      }
    });
}


function resetPassword(param) {  

  callAPI("/v1/users/reset_password.json", "POST", param, onSuccessResetPassword, onApiError);

}

function resetPasswordForm(){

  var $form = $("#resetPassword");
  var $inputs = $form.find("input, select, button, textarea");
  var reset_password_token = urlParameterValue( 'rt' );
  $("#reset_password").val("reset_password_token");
  var param =  $form.serializeObject();
  console.log(param);
  resetPassword( JSON.stringify(param));

}