Meteor.methods({
  getGithubAccessToken: function(credentialToken, credentialSecret) {
    var credentials = Github.retrieveCredential(credentialToken, credentialSecret);
    return credentials.serviceData.accessToken;
  },

  createGithubProof: function(accessToken) {
    return createGist(accessToken).data.html_url;
  },

  verifyGithubProofs: function() {

  }
});

function createGist(accessToken) {
  // var user = Meteor.user.find(this.userId);
  // var username = user.username;
  // var address = user.address ??

  // TODO: use template whuffieid.md JSON

  return HTTP.call('POST', 'https://api.github.com/gists', {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'User-Agent': 'whuffie'
    },
    data: {
      description: 'example whuffie identity verification gist',
      public: true,
      files: {
        'whuffie.md': {
          content: 'my name on whuffie is +sunny and my address is 1234'
        }
      }
    }
  });
}