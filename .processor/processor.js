// var ripple = require('ripple-lib')
var stellar = require('stellar-lib');
var Websocket = require('ws');
var ddp = require('./ddp_setup');     // our ddp funcs and cxn
// var login = require('ddp-login');  // https://github.com/vsivsi/ddp-login

var classes = require('./db-schema');   // imports our unique txn classes

/*
NEED TO:
	1. connect to stellard using websockets
			[COMPLETE]
	2. use the right rpc command to listen to the right txns (or all of them)
			[COMPLETE]
	3. parse them
			[COMPLETE] 
			implement your own payments.js using the browser inspector
			[COMPLETE]
	4. each onmessage event needs to store the parsed txns into the db
			[COMPLETE]
*/
/*
optional:
	4. have user only get the txns pertaining to their Session.address
	5. have user fill out boxes and sign and submit txns and watch them come through
	
bonus:
	6. submit memodata
	7. store and read memodata to and from db
*/

////////////////////////////////////////////////////////////
/*	DDP INITIALIZATION STUFF	*/
////////////////////////////////////////////////////////////
// when publishing to meteor's site, update this info accordingly
// since this run locally but our meteor server won't

ddp.ddpClient.connect(function(err) {
	if (err) {
		console.log('There\'s been an error connecting to the Meteor server...');
		return;
	}
	console.log('Connecting to the Meteor server on port ' + ddp.ddpPort + '...');
});

var network_name = process.argv[2];
var ws;
if (network_name === 'local') {
	ws = new Websocket('ws://localhost:5006');  // untrusted access
} else if (network_name === 'live-stellar') {
	// SSL?
	ws = new Websocket('ws://live.stellar.org:9001');
} else if (network_name === 'test-stellar') {
  // SSL?
	ws = new Websocket('ws://test.stellar.org:9001')
} else {
		console.log('Incorrect usage')
}

ws.on('open', function() {
	console.log('Connecting to the ' + network_name + ' server using ws...');
	
	// subscribes us to ledger close events
	// ws.send('{"command": "subscribe", "id": 0, "streams": ["ledger"]}');
	
	// subscribes to txn stream, however you only get the txns on ledger close
	ws.send('{"command": "subscribe", "streams": ["transactions"]}');
});

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/* THE GOOD STUFF */
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

ws.on('message', function(msg) {
	
	var msg_json = JSON.parse(msg);
	// console.log(msg_json);

	if (isValidTxn(msg_json)) {

	// var memoObj = new classes.Memo(msg_json.transaction.Memos[0].Memo);
		// ergo, we should store a msg_type at the root of the memoObj for fast if/else reference

    // console.log('its a valid txn');

    var memoObj = new classes.Memo(msg_json);
    if ( memoObj.memotype === 'wufi') {

      // console.log('its of memotype wufi');
      // console.log('memoobj looks like this: ' + JSON.stringify(memoObj));

      /* ///////////////////////////
      // if this is a basic STR txn... (this will go away later)

       if (msg_json.transaction.TransactionType === 'Payment') {
       var txn = new classes.BasicSTRTransaction(msg_json);
       insertTxn(txn);
       }
       */

      /////////////////////////////
      // if this is a UserInfo txn...
      // if (memoObj.memodata.type === 'user')
        // if Users.find({ _id: msg_json.transaction.Account })
          // FOLLOW UPDATE PROTOCOL":
          /*

           */

        // else
          // FOLLOW CREATE PROTOCOL:
          /*

           */
      if (memoObj.memodata.type === 'user') {
        // console.log('its of memodata type user');

        if (true) {
          var user = new classes.UserInfo(msg_json, memoObj).createUser();
          ddp.createUser(user);

        }
      }
    }
	}

});

function isValidTxn(msg_json) {
  return msg_json.hasOwnProperty('transaction') &&
    msg_json.status === 'closed' &&   // msg_json.validated ???
    msg_json.engine_result === 'tesSUCCESS';
}


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// closes the local stellard ledger every `timeout` ms
var timeout = 10000;
if (network_name === 'local') {
	(function (interval) {
		var Remote = stellar.Remote;

		var remote = new Remote({
			servers: [
				{
					host: "127.0.0.1",
					port: 6006,	// admin access
					secure: false
				}
			]
		});

		remote.connect(
			// close the ledger every 10 seconds:
			setInterval(function () {
				remote.ledger_accept();
				console.log('\n## Closing ledger... ##');
			}, interval)
		);
	})(timeout);
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////