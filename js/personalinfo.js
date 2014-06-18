function personalInfo()
{
  var $form = $("#personalInfo");
  var $inputs = $form.find("input, select, button, textarea");
 

  a=getKey();
   $("#personalInfo_authentication_token").val(getKey()); 
   $("#personalInfoEmail").val(userEmail); 
   var param =  $form.serializeObject(); 
  updatePersonalInfo(JSON.stringify(param));
}

function updatePersonalInfo(param) {
  callAPI("/v1/backers/current_backer.json", "PUT", param, onSuccessupdatePersonalInfo, onApiError);
}

function onSuccessupdatePersonalInfo(response) {  
  setCurrentUser(response.data.email);
  setCurrentUserName();
   
  }