function signin()
{
  var $form = $("#loginForm");
  var $inputs = $form.find("input, select, button, textarea");
  var param =  $form.serializeObject();  
  createToken(param);

}

function createToken(param) {
	  console.log(param);
  callAPI("/v1/backers/authentication_token.json", "GET", param, onSuccessCreateToken, onApiError);
}

function onSuccessCreateToken(response) {  
  setKey(response.data.authentication_token);
 setRole(response.data.role);
 setCurrentUser(response.data.name);
 if(response.data.role=="admin")
  	 window.location="dashboard.html";
 else
 	window.location="orders.html?page=1";
  }