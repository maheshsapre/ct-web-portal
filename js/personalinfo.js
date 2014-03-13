function personalInfo()
{
  var $form = $("#personalInfo");
  var $inputs = $form.find("input, select, button, textarea");
 
  console.log(getKey());
  a=getKey();
   $("#personalInfo_authentication_token").val(getKey()); 
   console.log(userEmail);
   $("#personalInfoEmail").val(userEmail); 


  console.log(param);
   var param =  $form.serializeObject(); 
  updatePersonalInfo(JSON.stringify(param));
}

function updatePersonalInfo(param) {
  callAPI("/v1/backers/current_backer.json", "PUT", param, onSuccessupdatePersonalInfo, onApiError);
}

function onSuccessupdatePersonalInfo(response) {  
  console.log(response.data.first_name); 
  setCurrentUser(response.data.first_name);
  setCurrentUserName();
   bootbox.alert("updated");
  }