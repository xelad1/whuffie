/*

    rootAddr = "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh"; 
    rootSec = "snoPBrXtMeMyMHUVTgbuqAfg1SUTb";
    
    function sign_share_tx(secret, senderAddr, destAddr, amount) {
        var tx_JSON, tx, unsigned;
        tx_JSON = {
            "TransactionType": "TrustSet",
            "Account": senderAddr,
            "LimitAmount": {
                "currency": "WFI",
                "value": amount,
                "issuer": destAddr
            }
        };
        tx = new ripple.Transaction();
        tx.tx_json = tx_JSON;
        tx._secret = secret;
        tx.complete();
        unsigned = tx.serialize().to_hex();
        tx.sign();
        return tx.serialize().to_hex();
    }
    tx_blob = sign_share_tx(rootSec, rootAddr, "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV", 100);
    console.log(tx_blob);
})();
*/

/*
function signtx(secret, tx_in) {
  var tx_JSON = JSON.parse(tx_in);
  var tx = new ripple.Transaction();
  tx.tx_json = tx_JSON;
  tx._secret = secret;
  tx.complete();
  var unsigned = tx.serialize().to_hex();
  tx.sign();
  return (tx.serialize().to_hex());
}
  var tx = '{ "TransactionType" : "Payment", 
              "Account" : "raSv7ZM4KvK99REGHfPSGn8QpdpJWtNTrN", 
              "Destination" : "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV", 
              "Amount" : "10", "Fee" : "10", "Sequence" : 1 }';
  var signature = signtx('sxxxxxxxxxxxxxx',tx);

*/

Meteor.startup(function() {

	if (typeof stellar !== 'undefined') {
		lib_name = 'Stellar';
	}

	Session.set('myAddr', "ganVp9o5emfzpwrG5QVUXqMv8AgLcdvySb");
	Session.set('mySecret', "s3q5ZGX2ScQK2rJ4JATp7rND6X5npG3De8jMbB7tuvm2HAVHcCN");

	Amount = stellar.Amount;
	Remote = stellar.Remote;
	utils = stellar.utils;

	remote = new Remote({
		trusted: false,
		local_signing: true,
		local_fee: true,
		fee_cushion: 1.5,
		// max_fee: 15,
		servers: [
			{
				host: "127.0.0.1",
				port: 6006,   // admin websockets
				secure: false
			}
		]
	});
	// set remote addr and secret on startup, then connect
	remote.set_secret(Session.get('myAddr'), Session.get('mySecret'));

});

function Memo(type, data) {
	// tx.Memos = [ { Memo: { MemoType: type, MemoData: data } } ]

	this.MemoType = utils.stringToHex(type);
	this.MemoData = utils.stringToHex(data);
}

str500 = '######################################################################################################################################################################################################################### this string is exactly 500 characters long ###############################################################################################################################################################################################################################################';
str400 = '####################################################################################################################################################################### this string is exactly 400 characters long #############################################################################################################################################################################################';

submitTxn = function(amt, memoType, memoData) {
	/*
		step 1: declare our vars of addrs and amts
		step 2: w/in remote.connect, create txn and fill out and submit txn
		step 3: w/in tx.submit, if res, remote.disconnect()
	 */
	var rcvrAddr = 'gM4Fpv2QuHY4knJsQyYGKEHFGw3eMBwc1U';
	amt = Amount.from_human(amt + 'STR');

	//
	remote.connect(function() {

		var tx = remote.transaction();

		tx.payment({
			from: Session.get('myAddr'),
			to: rcvrAddr,
			amount: amt
		});

		var memoObj = new Memo(memoType, memoData);
		tx.tx_json.Memos = [ { Memos: memoObj } ];

		console.log('sending the txn...');

		tx.submit(function (err, res) {
			if (err) {
				console.log('error: ' + err.result_message);
			}
			else if (res) {
				console.log('successful txn submission!');

				remote.disconnect();
			}
		});
	});
};





/* 	SOME FUNCTIONS TO REMEMBER

request_server_info(callback)
	can tell you the reserve costs
	they should be in the response obj

request_account_info(addr, callback)
	tells you an xrp balance

since you can't return anything out of a callback,
	you'll have to call a second function within the callback   to do the stuff to the value you would have otherwise returned

*/

/*

# testing the share function
tx_blob = sign_share_tx(rootSec, rootAddr, "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV", 100)
console.log(tx_blob)
# share_submit_request = remote.request_submit(tx_blob)

*/