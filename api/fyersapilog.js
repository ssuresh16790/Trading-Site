// const FyersAPI = require("fyers-api-v3").fyersModel;

// // Create a new instance of FyersAPI
// var fyers = new FyersAPI.fyersModel();

// // Set your APPID obtained from Fyers (replace "xxx-1xx" with your actual APPID)
// fyers.setAppId("91P6FGY43I-100");

// // Set the RedirectURL where the authorization code will be sent after the user grants access
// fyers.setRedirectUrl(
//   "https://www.google.com/"
// );

// // Define the authorization code and secret key required for generating access token
// const authcode ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkubG9naW4uZnllcnMuaW4iLCJpYXQiOjE3MDI4OTEwOTYsImV4cCI6MTcwMjkyMTA5NiwibmJmIjoxNzAyODkwNDk2LCJhdWQiOiJbXCJ4OjBcIiwgXCJ4OjFcIiwgXCJ4OjJcIiwgXCJkOjFcIiwgXCJkOjJcIiwgXCJ4OjFcIiwgXCJ4OjBcIl0iLCJzdWIiOiJhdXRoX2NvZGUiLCJkaXNwbGF5X25hbWUiOiJYRjAxNTk4Iiwib21zIjoiSzEiLCJoc21fa2V5IjoiMTk3MjlmYzM5ZWM5ZGJhM2E1MWZiYWJhMzI5N2E2MmU0MTg2Y2JiZjExMGFlNTM1MzEwYmJiNDEiLCJub25jZSI6IiIsImFwcF9pZCI6IjkxUDZGR1k0M0kiLCJ1dWlkIjoiNGQ5ODFmNDYxNDM1NDgzYmE5YjkxN2QyYTJjY2I5NmEiLCJpcEFkZHIiOiIwLjAuMC4wIiwic2NvcGUiOiIifQ.Wb-XRo3HxPWCn_aVrlxrqk0lwCylJnw3Szw9W4VmwSk"
// const secretKey = "4LV9RE1T1L"; 
// fyers
//   .generate_access_token({ secret_key: secretKey, auth_code: authcode })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
