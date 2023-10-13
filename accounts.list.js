

function doGet() { 
  Logger.log("Function started");
}

function fetchAccountsFromBPPAPI() {
    Logger.log("fetchAccountsFromBPPAPI started"); 
    
    var tokenData = getAccessToken();
    if (!tokenData.access_token) { // Check if access_token exists in the response
      Logger.log('Authentication required.');
      return;
    }
  
    var baseURL = "https://mybusinessaccountmanagement.googleapis.com/v1/accounts";
    Logger.log(baseURL);
  
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
      Logger.log("Error fetching accounts: " + error.message);
    }
  }
