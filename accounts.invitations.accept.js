//This script will accept the invitation sent to the service account.

function doGet() {
  Logger.log("Function started");
}

function acceptInvitation(invitationName) {
  Logger.log("Accepting invitation: " + invitationName); 
  
  var tokenData = getAccessToken();
  if (!tokenData.access_token) { // Check if access_token exists in the response
    Logger.log('Authentication required.');
    return;
  }

  // The URL endpoint for accepting an invitation
  var baseURL = "https://mybusinessaccountmanagement.googleapis.com/" + invitationName + ":accept";
  
  var headers = {
    Authorization: 'Bearer ' + tokenData.access_token, // Directly use the access token
    'Content-Type': 'application/json'
  };

  var options = {
    headers: headers,
    method: "POST",
    muteHttpExceptions: false
  };

  try {
    var response = UrlFetchApp.fetch(baseURL, options);
    var jsonResponse = JSON.parse(response.getContentText());
    Logger.log(jsonResponse);
  } catch (error) {
    Logger.log("Error accepting invitation: " + error.message);
  }
}

function acceptAllInvitations() {
  var invitations = [
    "v1/accounts/ + <Account_ID> + /invitations/ <Invitation_ID> ", // Add in your Account and Invitation ID's from prior scripts.
    
  ];
  
  for (var i = 0; i < invitations.length; i++) {
    acceptInvitation(invitations[i]);
  }
}
