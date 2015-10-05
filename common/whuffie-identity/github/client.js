var React = require('react-native');
var qs = require('shitty-qs');
// var jsonld = require('whuffie-jsonld').Github;

var {
  LinkingIOS,
  AlertIOS
} = React;

module.exports = {
  createGist: createGist,
  authorize: authorize
};

/**
 * Creates a gist on Github named 'whuffie.jsonld'
 *
 * @param {String} accessToken
 * @returns {Promise}
 */
function createGist(accessToken) {
  return fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify({
      description: 'example whuffie identity verification gist',
      public: true,
      files: {
        'whuffie.jsonld': {
          content: createClaim()
        }
      }
    })
  })
  .then(function(gistInfo) {
    return new Promise(function (resolve, reject) {
      if (gistInfo.status !== 201) {
        reject(gistInfo);
      } else {
        resolve(gistInfo);
      }
    });
  });
}

/**
 * Opens Safari to log the user into their Github, returns auth code
 *
 * @returns {Promise}
 */
function authorize(clientId) {
  return new Promise(function(resolve, reject) {
    LinkingIOS.addEventListener('url', handleUrl);

    LinkingIOS.openURL([
      'https://github.com/login/oauth/authorize',
      '?client_id=', clientId,
      // TODO: possibly reconsider the callback URL
      '&redirect_uri=whuffie://oauth/github',
      '&scope=gist',
      // TODO: MUST refactor to something considerably more random & secure
      '&state=antiestablishmentarianism'
    ].join(''));

    function handleUrl(event) {
      // TODO: get rid of the shitty-qs dependency
      LinkingIOS.removeEventListener('url', handleUrl);
      var code = qs(event.url.match(/\?(.*)/)[1]).code;
      resolve(code);
    }
  });
}

/**
 * Creates and returns a gist-formatted Identity Credential
 * https://web-payments.org/specs/source/identity-credentials/#credentials-and-claims
 *
 * @returns {String}
 */
function createClaim() {
  var content = {
    '@context': 'some url',
    'claim': {
      'id': 'some id',
      'username': 'sunnyg'
    },
    'signature': {}
  };
  return JSON.stringify(content, null, 2);
}

/**
 * @returns {Promise}
 */
/*
function connectToGithub() {
  return Meteor.promise('getGithubAccessToken', token, credentialSecret)
    .then(function(accessToken) {
      // TODO: https://www.notion.so/INJgeq27DcuOY
      //1. create credential JSON-LD object
      //2. createGist with credential object
      var credential;
      return createGist(accessToken, credential);
    })
    .then(function(gistUrl) {
      console.log(gistUrl);
      //3. edit gist contents by adding gistURL to credential obj
      //4. sign hash of updated credential obj
      //  - for now, w/ stellar master key
      //  - add the signature obj to the credential obj
      //5. updateGist with updated credential obj

      // then Meteor.call('verifyGithubProof')
      return gistUrl;
    })
    .then(function() {
      //5. create stellar txn with same credential obj

    })
    .then(function() {
      //6. grab user's identity JSON-LD object from IPFS
      //  - add credential to object
      //  - add txnHash to the credential ???
    })
    .catch(function(err) {
      console.log('error:', err);
    });
}
 */
