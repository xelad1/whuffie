// var ripple = require('ripple-lib')
var stellar = require('stellar-lib');
var Websocket = require('ws');
var DDPClient = require('ddp');

var ddpPort = 8080;

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

var ddpClient = new DDPClient({
	host: 'localhost',
	port: ddpPort,
	auto_reconnect: true,
	auto_reconnect_timer: 500,
	use_ssl: false,
	maintain_collections: false
});

ddpClient.connect(function(err) {
	if (err) {
		console.log('There\'s been an error connecting to the Meteor server...');
		return;
	}
	console.log('Connecting to the Meteor server on port ' + ddpPort + '...');
});

// define the ddp call to the server
function insertTxn(txn) {
	ddpClient.call(
		'addTxn',
		[txn],
		function(err, result) {
			if (err) {
				console.log('There was an error calling addTxn: ' + err);
			} else {
				console.log('Successfully called and returned from addTxn: ' + result);
			}
		},
		function() {
			console.log('Updated DB successfully!');
		}
	);
}

////////////////////////////////////////////////////////////
/* THE GOOD STUFF */
////////////////////////////////////////////////////////////
var network_name = process.argv[2];
var ws;
if (network_name === 'local') {
	ws = new Websocket('ws://localhost:5006');  // untrusted access
} else if (network_name === 'livestellar') {
	ws = new Websocket('ws://live.stellar.org:9001');
} else {
	console.log('Incorrect usage');
}

ws.on('open', function() {
	console.log('Connecting to the ' + network_name + ' server using ws...');
	
	// subscribes us to ledger close events
	// ws.send('{"command": "subscribe", "id": 0, "streams": ["ledger"]}');
	
	// subscribes to txn stream, however you only get the txns on ledger close
	ws.send('{"command": "subscribe", "streams": ["transactions"]}');
});

ws.on('message', function(message) {
	
	var msg_json = JSON.parse(message);
	
	if (msg_json.hasOwnProperty('engine_result')) {
		var txn = new STRTransaction(msg_json);
		// console.log(msg_json);
		insertTxn(txn);
	}
});

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

/* class for relevant XRP transaction data */
function STRTransaction(msg) {
	// msg = JSON.parse(msg);
	if (msg.engine_result == 'tesSUCCESS' && msg.transaction.TransactionType == 'Payment') {
		this.sender = msg.transaction.Account;
		this.reciever = msg.transaction.Destination;
		this.amount = msg.transaction.Amount;
		this.ledger = msg.ledger_index;
		this.date = msg.transaction.date;
	}
}

/*
function Memo() {}
*/

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/* this connects to a local stellard and closes the ledger every x seconds */
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
	})(7000);
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
