'use strict';

var React = require('react-native');
//var ReactMotion = require('react-motion/native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  LinkingIOS,
  TouchableOpacity
} = React;

//var {
//  Motion,
//  spring
//} = ReactMotion;

var ddp = require('./app/config/ddp');
var WhuffieIdentity = require('./app/components/identity');
//var ShaderDemo = require('./app/components/glDemo');

var whuffie = React.createClass({
  componentDidMount: function() {
    ddp.initialize()
      .then(function(success) {
        console.log('success initializing ddp connection', success);
      })
      .catch(function(err) {
        console.log('error initializing ddp connection', err);
      });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          WHUFFIE
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>

        {/* <ShaderDemo width={100} height={100} shader={'color'}/> */}
        <WhuffieIdentity />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

AppRegistry.registerComponent('whuffie', () => whuffie);
