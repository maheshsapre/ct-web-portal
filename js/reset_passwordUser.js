// function urlParameterValue( name ){
//           name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
//           var regexS = "[\\?&]"+name+"=([^&#]*)";  
//           var regex = new RegExp( regexS );  
//           var results = regex.exec( window.location.href ); 

//           if( results == null )    return "";  
//           else    return results[1];
//         }



// function onSuccessResetPassword(response) {  
//    clearKey();
// message="Password has been reset."
//    bootbox.alert(message, function(result) 
//     {  console.log(result);
//       if(result==undefined){
//        window.location="login.html";
//       }
//     });
// }


// function resetPassword(param) {  
//   callAPI("/v1/users/reset_password.json", "POST", param, onSuccessResetPassword, onResetPasswordApiError);

// }

// function resetPasswordForm(){

//   var $form = $("#validateSubmitForm");
//   var $inputs = $form.find("input, select, button, textarea");
//   var reset_password_token = urlParameterValue( 'reset_password_token' );
 
//   $("#reset_password").val(reset_password_token);
//   var user_id = urlParameterValue( 'user_id' );
//     $("#reset_password_user_id").val(user_id);
//     $("#editPassword_api_key").val(getKey());

//   var param =  $form.serializeObject();
    
//   resetPassword( JSON.stringify(param));

// }

// function forgotPassword(param){
 
//  callAPI("/v1/users/forgot_password.json", "POST", param, onSuccessforgotPassword, onResetPasswordApiError);

// }
// function onSuccessforgotPassword(response){

// message="Forgot password link sent to your mail."
//   bootbox.alert( message, function(result) 
//     {
//       $.gritter.add({
        
//       });
//     });

// }


// function forgotPasswordForm(){
 
//   var $form = $("#forgotPasswordForm");
//   var $inputs = $form.find("input, select, button, textarea");
//   var param =  $form.serializeObject();  
//   console.log(param);
//   a=JSON.stringify(param);
//   console.log(a);

// forgotPassword( JSON.stringify(param));
 

// }

// function onResetPasswordApiError(response, exception) {  
//   var iCount=1;
//   var message = "";  

//   var result = jQuery.parseJSON(response.responseText);
//   if (response.status === 0) {
//     message = 'Not connect.\n Verify Network.';
//   } else if (response.status == 401) {
   
//     message = 'Invalid credentials - access denied.'+ result.message;
       
 
//   } else if (response.status == 404) {
//     message =  result.message;
//   } else if (response.status == 422) {
//     message =  result.message;
//     iCount=0;
//      bootbox.alert(message, function(result) 
//     {  
//       if(result==undefined){
//        window.location="forgot_password.html";
//       }
//     });
//   } else if (response.status == 500) {
//     message = 'Internal Server Error ' + result.message;
//   } else if (exception === 'parsererror') {
//     message = 'Requested JSON parse failed.'+ result.message;
//   } else if (exception === 'timeout') {
//     message = 'Time out error.'+ result.message;
//   } else if (exception === 'abort') {
//     message = 'Ajax redelquest aborted.'+ result.message
//   } else {
//     message = 'Uncaught Error.\n' + result.message;
//   }
// if(iCount==1){
//     bootbox.alert( message, function(result) 
//     {
      
//     });
// }
 
// }



// function oncheckTokenExpiryApiError(response,exception){
//     $("#forgot-passwordbox").hide();
//      bootbox.alert("link has expired", function(result) 
//     {  
//       if(result==undefined){
//        window.location="login.html";
//       }
//      });
//   $("#linkExpiredMessage").show();
  
// }

// function  onSuccessCheckTokenExpiry(response){

// $("#emailId").val(response.data.email);

//  $("#resetPasswordForm").show();

// }

// function checkTokenExpiry(){
//   $("#linkExpiredMessage").hide();
//    $("#resetPasswordForm").hide();
//  var reset_password_token = urlParameterValue( 'reset_password_token' );
//     var param = {
//       "reset_password_token" : reset_password_token 
//     };
//  callAPI("/v1/users/find_by_password_token.json", "GET", param, onSuccessCheckTokenExpiry, oncheckTokenExpiryApiError);

// }


// function forgotPasswordForm(){
//  var $form = $("#forgotPassword");
//   var $inputs = $form.find("input, select, button, textarea");
//   var param =  $form.serializeObject();  
//   a=JSON.stringify(param);
//  forgotPassword( JSON.stringify(param));
// }



// function forgotPassword(param){
 
//  callAPI("/v1/backers/forgot_password.json", "POST", param, onSuccessforgotPassword, onApiError);

// }

function onSuccessforgotPassword(response){
message="Forgot password link has been sent to your mail.";
  bootbox.alert(message) ;
}



function oncheckTokenExpiryApiError(response,exception){
     bootbox.alert("Link has expired", function(result) 
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
 var reset_password_token = urlParameterValue( 'reset_password_token' );
    var param = {
      "reset_password_token" : reset_password_token 
    };
 callAPI("/v1/users/find_by_password_token.json".f(reset_password_token), "GET", param, onSuccessCheckTokenExpiry,oncheckTokenExpiryApiError);
}

function onSuccessResetPassword(response) {  
   clearKey();
message="Password has been reset successfully."
   bootbox.alert(message, function(result) 
    {  
      if(result==undefined){
       window.location="signin.html";
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
  console.log(param);
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