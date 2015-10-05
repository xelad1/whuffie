var githubAuthCredentials = Meteor.settings.private.identityProviders.github;

Meteor.methods({
  /**
   *
   * @param credentialToken
   * @param credentialSecret
   * @returns {String} - access token from Github
   */
  'Github.getAccessToken': function(credentialToken, credentialSecret) {
    var credentials = Github.retrieveCredential(credentialToken, credentialSecret);
    return credentials.serviceData.accessToken;
  },

  /**
   *
   * @param code
   * @returns {String} - access token from Github
   */
  'Github.getAccessTokenNative': function(code) {
    var response = HTTP.post('https://github.com/login/oauth/access_token', {
      data: {
        code: code,
        client_id: githubAuthCredentials.clientId,
        client_secret: githubAuthCredentials.clientSecret
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    // TODO: try catch block goes here
    return JSON.parse(response.content).access_token;
  },

  'Github.retrieveClientId': function() {
    return githubAuthCredentials.clientId;
  },

  'Github.verifyClaim': function() {
    return true;
  }
});

/*
fetch('https://github.com/login/oauth/access_token', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    code: code,
    client_id: config.github.client_id,
    client_secret: config.github.client_secret
  })
 */