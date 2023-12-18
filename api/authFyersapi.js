// const FyersAPI = require("fyers-api-v3")

// // Create a new instance of FyersAPI
// var fyers = new FyersAPI.fyersModel();

// // Set your APPID obtained from Fyers (replace "xxx-1xx" with your actual APPID)
// fyers.setAppId("91P6FGY43I-100");

// // Set the RedirectURL where the authorization code will be sent after the user grants access
// fyers.setRedirectUrl(
//   "https://www.google.com/"
// );

// // Define the authorization code and secret key required for generating access token
// const authcode =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkubG9naW4uZnllcnMuaW4iLCJpYXQiOjE3MDI4ODc3NTYsImV4cCI6MTcwMjkxNzc1NiwibmJmIjoxNzAyODg3MTU2LCJhdWQiOlsieDowIiwieDoxIiwieDoyIiwiZDoxIiwiZDoyIiwieDoxIiwieDowIl0sInN1YiI6ImF1dGhfY29kZSIsImRpc3BsYXlfbmFtZSI6IlhGMDE1OTgiLCJvbXMiOiJLMSIsImhzbV9rZXkiOm51bGwsIm5vbmNlIjoiIiwiYXBwX2lkIjoiOTFQNkZHWTQzSSIsInV1aWQiOiJiZGE0MDQxOTIzM2Q0OTg1YWVkMTk0NmJiYzdhMWI0YSIsImlwQWRkciI6IjQ5LjIwNC4yMzMuMCwgMTYyLjE1OC41NS41MyIsInNjb3BlIjoiIn0.HkcXdq7GTtyTIE1bYBLH2nUbkdY0uvfjcHEQUKdbD-c"; // Replace with the actual authorization code obtained from the user
// const secretKey = "4LV9RE1T1L"; 
// fyers
//   .generate_access_token({ secret_key: secretKey, auth_code: authcode })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
