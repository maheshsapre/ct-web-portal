function signin()
{
	var $form = $("#loginForm");
	var $inputs = $form.find("input, select, button, textarea");
	var param =  $form.serializeObject();  
	createToken(param);
}

function createToken(param) {
	callAPI("/v1/backers/authentication_token.json", "GET", param, onSuccessCreateToken, onApiError);
}

// TODO
function onSuccessCreateToken(response) {  
	setKey(response.data.authentication_token);
	setRole(response.data.role);
	setCurrentUser(response.data.name);
	if(response.data.role=="admin")
		window.location="backers.html?q[email_cont]=   &page=1&search=1&size=1";
	else
		window.location="orders.html?page=1";
}