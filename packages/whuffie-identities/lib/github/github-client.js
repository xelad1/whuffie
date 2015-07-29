WhuffieIdentity = WhuffieIdentity || {};
WhuffieIdentity.connectToGithub = connectToGithub;

function connectToGithub() {
  Github.requestCredential({
    loginStyle: 'popup',
    requestPermissions: ['gist']
  }, function(tokenOrError) {
    if (tokenOrError && tokenOrError instanceof Error) {
      // Throw a Meteor error
      console.log('error getting the token');
      return;
    }

    var credentialSecret = OAuth._retrieveCredentialSecret(tokenOrError);

    Meteor.promise('getGithubAccessToken', tokenOrError, credentialSecret)
      .then(function(accessToken) {
        return Meteor.promise('createGithubProof', accessToken);
      })
      .then(function(gistInfo) {
        console.log(gistInfo);
        // TODO: create stellar txn with gistInto.html_url
        // then Meteor.call('verifyGithubProof')
      })
      .catch(function(err) {
        console.log('error:', err);
      });
  });
}