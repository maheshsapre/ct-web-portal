function signup(){
  var $form = $("#signUpForm");
  var $inputs = $form.find("input, select, button, textarea");  
  var param =  $form.serializeObject();
  console.log(param);
  registerUser(JSON.stringify(param));
   }

   function registerUser(param) {
  callAPI("/v1/backers/active_backer_information.json", "POST", param, onSuccessRegisterUser, onApiError);
}

function  onSuccessRegisterUser(response){
	  setKey(response.data.authentication_token);
    setRole("user");
 setCurrentUser(response.data.first_name);
	 window.location="orders.html?page=1";
}

function onSuccessGetBackerInfo(response){

  $("#email").val(response.data.email);
  $("#first_name").val(response.data.first_name);
  $("#last_name").val(response.data.last_name);

}