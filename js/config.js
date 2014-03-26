var MESSAGE =
{
	
}

var CONFIG = 
{
	url: "http://107.20.189.200:3001",
	contentType: "application/json",	/* Consider as default parameter for web-portal */
	dataType: "json",					/* Consider as default parameter for web-portal */
	isDebugging : true,
	expireDeviceCookie : 5,			/* Login.js :- expire device cookie information, it considers as days */
	cookieSecure : false,
	width : 800,
	height : 400,
	jwPlayerSessionRetry:6,
	bufferLength:1                      /* jwPlayer buffer size before playing video */
}




var SERVER_RESPONSE = 
{
	"Code": 
			[
					{"id_0": 0,   "message_0": "No connection.\n Please verify Network"},
					{"id_401": 401, "message_401": "Your email or password is invalid."},
					{"id_404": 404, "message_404": ""},
					{"id_422": 422, "message_422": ""},
					{"id_500": 500, "message_500": "Internal Server Error.\n"},
			],
			
	"Exception": 
			[
					{"id_parsererror": "parsererror",   "message_parsererror": "Requested JSON parse failed."},
					{"id_timeout": "timeout",   	"message_timeout": "Time out error"},
					{"id_abort": "abort",   		"message_abort": "Ajax request aborted."},
			],
			
	"Default" : ""
}






function onServerAPIError(jResponse, sException)
{  
	var sMessage = "";  
	var oResult = jQuery.parseJSON(jResponse.responseText);
	var iCount = 0;
	
	for (iCount = 0 ; iCount < SERVER_RESPONSE.Code.length; iCount++)
	{
		if(jResponse.status == SERVER_RESPONSE.Code[iCount].id)
		{
			sMessage = SERVER_RESPONSE.Code[iCount].message + oResult.message;
			break;
		}
	}
	if(iCount == SERVER_RESPONSE.Code.length)
	{
		for (iCount = 0 ; iCount < SERVER_RESPONSE.Exception.length; iCount++)
		{
			if(sException == SERVER_RESPONSE.Exception[iCount].id)
			{
				sMessage = SERVER_RESPONSE.Exception[iCount].message + oResult.message;
				break;
			}
		}
		
		if(iCount == SERVER_RESPONSE.Exception.length)
		{
			sMessage = SERVER_RESPONSE.Default + oResult.message;
		}
	}

	bootbox.alert(sMessage, function(result) /* Paresh :: ask Swathi */
    {
      $.gritter.add({
        title: 'Callback!',
        text: "I'm just a BootBox Alert callback!"
      });
    });
iSubmit=1;
}




