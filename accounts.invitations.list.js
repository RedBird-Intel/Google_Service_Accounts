// This script will list all invitations for the Service Account ID

//The _Serv.Acct.Auth script steps must be called first to authenticate.

function doGet() {
    Logger.log("Function started");
  }
  
  function fetchAccountInvitations() {
    Logger.log("fetchAccountInvitations started"); 
    
    var tokenData = getAccessToken();
    if (!tokenData.access_token) { // Check if access_token exists in the response
      Logger.log('Authentication required.');
      return;
    }
  
    // The URL endpoint for fetching account invitations.  Insert your Service Account ID from log data produced by the accounts.list script.

    var baseURL = "https://mybusinessaccountmanagement.googleapis.com/v1/accounts/ + <Service Acct ID> + /invitations";  
        
    var headers = {
      Authorization: 'Bearer ' + tokenData.access_token, // Directly use the access token
      'Content-Type': 'application/json'
    };
  
    var options = {
      headers: headers,
      method: "GET",
      muteHttpExceptions: false
    };
  
    try {
      var response = UrlFetchApp.fetch(baseURL, options);
      var jsonResponse = JSON.parse(response.getContentText());
      Logger.log(jsonResponse);
    } catch (error) {
      Logger.log("Error fetching account invitations: " + error.message);
    }
  }
  