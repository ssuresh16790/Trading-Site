const axios = require('axios');

const clientId = 'XF01598';
const clientSecret = '4LV9RE1T1L';
const redirectUri = 'https://www.google.com/';

// Step 1: Get the authorization URL
const getAuthorizationUrl = async () => {
  try {
    const response = await axios.get(`${authEndpoint}/authorize`, {
      params: {
        client_id: clientId,
        clientSecret : clientSecret,
        redirect_uri: redirectUri,
        response_type: 'code',
        grant_type: 'authorization_code',
        state: null,
      },
    });

    const authorizationUrl = response.request.res.responseUrl;
    console.log('Authorization URL:', authorizationUrl);

    // Now you can redirect the user to the authorization URL.
    // After successful authentication and authorization, the user will be redirected back to your specified redirect URI with an authorization code.
  } catch (error) {
    console.error('Error getting authorization URL:', error.response ? error.response.data : error.message);
  }
};

getAuthorizationUrl();
