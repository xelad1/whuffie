var DDPClient = require('ddp');
// var login = require('ddp-login');  // https://github.com/vsivsi/ddp-login

var ddpHost = 'localhost';
var ddpPort = 8080;

////////////////////////////////////////////////////////////
/*	DDP INITIALIZATION STUFF	*/
////////////////////////////////////////////////////////////
// when publishing to meteor's site, update this info accordingly
// since this run locally but our meteor server won't

var ddpClient = new DDPClient({
  // production notes:
  /*

   // logging in with username (NOTE: use ddp-login)
   ddpclient.call(
   "login",
   [{
   user : { username : "username" },
   password : "password"
   }],
   function (err, result) { ... }
   );

   //

   */
  host: ddpHost,
  port: ddpPort,
  auto_reconnect: true,
  auto_reconnect_timer: 500,
  use_ssl: false,
  maintain_collections: false
});

/*
ddpClient.connect(function(err) {
  if (err) {
    console.log('There\'s been an error connecting to the Meteor server...');
    return;
  }
  console.log('Connecting to the Meteor server on port ' + ddpPort + '...');
});
*/

// define the ddp call to the server
function insertTxn(txn) {
  ddpClient.call(
    'addTxn',     // method name
    [txn],        // array of parameters

    // returns the method call results
    function(err, result) {
      if (err) {
        console.log('There was an error calling addTxn: ' + err);
      } else {
        // result returns undefined
        console.log('Successfully called and returned from addTxn: ' + result);
      }
    },

    // fires when the server is finished with the called method
    function() {
      console.log('Updated DB successfully!');
    }
  );
}

function createUser(userInfo) {
  ddpClient.call(
    'addUser',
    [userInfo],
    function(err, res) {
      if (err) {
        console.log('There was an error creating the user: ' + err);
      } else {
        console.log('Successfully called and returned from addUser: ' + res);
      }
    },
    function() {
      console.log('Updated DB successfully!')
    }
  )
}

// EXPORTS

exports.ddpPort = ddpPort;
exports.ddpClient = ddpClient;
exports.insertTxn = insertTxn;
exports.createUser = createUser;