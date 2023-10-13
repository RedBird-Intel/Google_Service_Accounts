
// Script to authenticate a Google Service Account to use it in an API request.  

function doGet() {
  Logger.log("Function started");
}

// This function identifies the location of the Service Account JSON File.  "Your File ID" applies to if the file is located in Google Drive.  

function getServiceAccountJson() {
  var fileId = '<XXXX>'; // Your file's ID
  var file = DriveApp.getFileById(fileId);
  var jsonString = file.getBlob().getDataAsString();
  return JSON.parse(jsonString);
}

function getAccessToken() {
  var serviceAccount = getServiceAccountJson();
  var privateKey = serviceAccount.private_key;
  var CLIENT_EMAIL = "<XXXXXX>"; // Add in your Service Account email here
  var TOKEN_URL = "https://oauth2.googleapis.com/token";
  var SCOPES = [  
    'https://www.googleapis.com/auth/spreadsheets',          // This is just an exhaustive list of scopes I used across this project, you can include/exclude based on your own needs
    'https://www.googleapis.com/auth/script.external_request',
    'https://www.googleapis.com/auth/bigquery',
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/business.manage',
    'https://businessprofileperformance.googleapis.com'
  ];

  var header = {
    "alg": "RS256",
    "typ": "JWT"
  };

  var claimSet = {
    "iss": CLIENT_EMAIL,
    "scope": SCOPES.join(' '),
    "aud": TOKEN_URL,
    "exp": Math.floor((new Date().getTime() + 3600 * 1000) / 1000),
    "iat": Math.floor((new Date().getTime()) / 1000)
  };
  
  var toSign = Utilities.base64EncodeWebSafe(JSON.stringify(header)) + "." + Utilities.base64EncodeWebSafe(JSON.stringify(claimSet));
  var signature = Utilities.computeRsaSha256Signature(toSign, privateKey);
  var jwt = toSign + "." + Utilities.base64EncodeWebSafe(signature);

  var options = {
    "method": "POST",
    "headers": { "Content-Type": "application/x-www-form-urlencoded" },
    "payload": {
      "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
      "assertion": jwt
    }
  };
  
  var response = UrlFetchApp.fetch(TOKEN_URL, options);
  return JSON.parse(response.getContentText());
}

function testServiceAccountAuthentication() {
  var tokenData = getAccessToken();
  
  if (tokenData.access_token) {
    Logger.log("Successfully authenticated. Access token acquired.");
    Logger.log("Access Token: " + tokenData.access_token);
  } else {
    Logger.log("Authentication failed. No access token was acquired.");
    Logger.log(tokenData);
  }
}