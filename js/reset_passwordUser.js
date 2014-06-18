

function onSuccessforgotPassword(response){
message="Forgot password link has been sent to your mail.";
  bootbox.alert(message) ;
}



function oncheckTokenExpiryApiError(response,exception){
     bootbox.alert("Link has expired", function(result) 
    {  
      if(result==undefined){
       window.location="http://geckotag.me";
      }
     });
}

function  onSuccessCheckTokenExpiry(response){

 $("#resetPasswordForm").css('visibility','visible');
$("#emailId").val(response.data.email);


}

function checkTokenExpiry(){
 var reset_password_token = urlParameterValue( 'reset_password_token' );
    var param = {
      "reset_password_token" : reset_password_token 
    };
 callAPI("/v1/users/find_by_password_token.json".f(reset_password_token), "GET", param, onSuccessCheckTokenExpiry,oncheckTokenExpiryApiError);
}

function onSuccessResetPassword(response) {  
   clearKey();
message=response.data;
   bootbox.alert(message, function(result) 
    {  
      if(result==undefined){
       window.location="http://geckotag.me";
      }
    });
}


function resetPassword(param) {  

  callAPI("/v1/users/reset_password.json", "POST", param, onSuccessResetPassword, onApiError);

}

function resetPasswordUserForm(){

  var $form = $("#resetUserPassword");
  var $inputs = $form.find("input, select, button, textarea");
  var reset_password_token = urlParameterValue( 'reset_password_token' );
  $("#reset_password").val(reset_password_token);
  var param =  $form.serializeObject();
  resetPassword( JSON.stringify(param));

}

function forgotPasswordUserForm(){
 var $form = $("#forgotUserPassword");
  var $inputs = $form.find("input, select, button, textarea");
  var param =  $form.serializeObject();  
  a=JSON.stringify(param);
 forgotPassword( JSON.stringify(param));
}



function forgotPassword(param){
 
 callAPI("/v1/users/forgot_password.json", "POST", param, onSuccessforgotPassword, onApiError);

}

function onSuccessforgotPassword(response){
message="Forgot password link has been sent to your mail.";
  bootbox.alert(message) ;
}