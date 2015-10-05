var React = require('react-native');

var {
  AppRegistry,
  Text,
  View,
  TouchableOpacity
} = React;

//var Github = require('whuffie-identity');

var WhuffieIdentity = React.createClass({
  auth: function() {
    return ddp.call('Github.retrieveClientId')
      .then(function(clientId) {
        return Github.authorize(clientId);
      })
      .then(function(code) {
        return ddp.call('Github.getAccessTokenNative', [code]);
      })
      .then(function(accessToken) {
        console.log('received accessToken:', accessToken);
        return Github.createGist(accessToken);
      })
      .then(function(gistInfo) {
        console.log('created gist:', gistInfo);
      })
      .catch(function(err) {
        console.log('error connecting user identity to Github', err);
      });
  },

  render: function() {
    return (
      <TouchableOpacity onPress={this.auth}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Auth with Github
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
});

var styles = {
  button: {
    backgroundColor: 'black',
    width: 200,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  }
};

module.exports = WhuffieIdentity;