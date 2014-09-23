/*
this should hold our classes for DB ENTRIES FROM MEMOS
from our responses from the ledger, we will create appropriate objs containing:
	txn information
	anything necessary to displaying the post
		(info like the image/video name may need to be provided separately)
		this would mean that video and image sharing will come after textpost and (maybe) article sharing

 */

var stellar = require('stellar-lib');
var utils = stellar.utils;

exports.BasicSTRTransaction = BasicSTRTransaction;
exports.UserInfo = UserInfo;
exports.Memo = Memo;

function Memo(msg) {
  // gets passed in the Memo obj of the Memos array
  // this should be inherited from

  var memo = msg.transaction.Memos[0].Memo;
  this.memotype = utils.hexToString(memo.MemoType);
  this.memodata = JSON.parse(utils.hexToString(memo.MemoData));
}

function BasicSTRTransaction(msg) {
	// this is a basic class for storing simple STRTransactions
	// the main changes you'll see will be additions to the Memo obj of the Memos array
  // msg == json of the received message

  var day_zero = 946684800;

	this.type = 'BasicSTRTransaction';    // ??? why ???

	this._id = msg.transaction.hash;
	this.sender = msg.transaction.Account;
	this.receiver = msg.transaction.Destination;
	this.amount = msg.transaction.Amount;
	this.ledger = msg.ledger_index;
	this.date = new Date((day_zero + msg.transaction.date) * 1000);

	var memoObj = new Memo(msg);
	this.memotype = memoObj.memotype;
	this.memodata = memoObj.memodata;
}

function UserInfo(msg, memoObj) {
  /*
  this will be our User obj, sent to the server's Users collection
  ** WHEN USED: **
  * make sure you validate the msg

  two halves of data:
    what comes from the memos that needs to be stored
    what comes from the rest which proves the authenticity of the entry's info

  both halves are needed when:
    creating an obj for a new user
    creating an obj that will be used to update a user
  */

  var day_zero = 946684800;

  //////////////////////
  // memo info:
  // derived from memoObj.memodata;

  // TODO: **** DEFINE OUR METHOD OF STORING IDENTITY INFO IN TXNS, IT IS THE NECESSARY NEXT STEP ****

  /////////////////////
  // authenticity info:
  // this.hash = msg.transaction.hash;

  this.createUser = function() {
    // creates the obj that will be the user's db entry
    return this.user = {
      _id: msg.transaction.Account,
      username: memoObj.memodata.username,
      basics: memoObj.memodata.basics,    // should be obj w/ bio, location, first and last names

      payments: [{
        type: 'stellar',
        address: msg.transaction.Account,
        proof: {    // proves that this username is associated w/ this addr
          ledger_index: msg.ledger_index,
          tx_hash: msg.transaction.hash
        }
      }],

      openspecs_version: '0.3'
      // wufi_schema_version: '0.1'
    }
  }


}

////////////////////////////////////////////
////////////////////////////////////////////

// EXAMPLE OF SUCCESSFUL TXN RESPONSE (to subscribing client)
/*
{ engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied.',
  ledger_hash: '96025F2881FFA900F475D5B316EDC199CEEAABBF19F5D59CFB41726CF4CA0B9D',
  ledger_index: 3,
  meta:
    { AffectedNodes: [ [Object], [Object] ],
      TransactionIndex: 0,
      TransactionResult: 'tesSUCCESS'
    },
  status: 'closed',
	transaction:
    { Account: 'ganVp9o5emfzpwrG5QVUXqMv8AgLcdvySb',
      // we input 10000 into submitTxn
      Amount: '10000000000',
      Destination: 'gM4Fpv2QuHY4knJsQyYGKEHFGw3eMBwc1U',
      Fee: '15',
      Flags: 2147483648,
      LastLedgerSequence: 11,

      Memos: [ {
				Memo: {
					MemoType: 'str',
					MemoData: 'str'
				}
      } ],

      Sequence: 1,
      SigningPubKey: 'BE3900393891A2A2244E28A82C43BA94CA94DD6BFE36D523576A22BFF86055D4',
      TransactionType: 'Payment',
      TxnSignature: 'F26A24E0763800034FD08342E4D029DC8C258377898B66542A57FF24DF9A3DCB9CD03300DA3B0918FE4216543450152AC7299577FBF9209E09B364ED75EBD109',
      date: 462938250,
      hash: '1B5BA850F4A98A452BDDE6A2A2D607BB990D4921F66341D8F5F01E16765A9894'
    },
  type: 'transaction',
  validated: true
}

 */
// EXAMPLE OF SUCCESSFUL TXN RESPONSE (on stellard server)
/*
{ id: 3,
	result:
	{ engine_result: 'tesSUCCESS',
		engine_result_code: 0,
		engine_result_message: 'The transaction was applied.',
		tx_blob: '12000022800000002400000001201B0000000B6140000002540BE40068400000000000000F7320BE3900393891A2A2244E28A82C43BA94CA94DD6BFE36D523576A22BFF86055D47440F26A24E0763800034FD08342E4D029DC8C258377898B66542A57FF24DF9A3DCB9CD03300DA3B0918FE4216543450152AC7299577FBF9209E09B364ED75EBD109811437B1B26BE3C91C55D51586C3F0E5C4B03E9CEA7F8314DF8286CDBB009AA5C29F526B5C3B4C480B44EABEF9EA7C04747970657D0474657874E1F1',
		tx_json:
		{ Account: 'ganVp9o5emfzpwrG5QVUXqMv8AgLcdvySb',
			Amount: '10000000000',
			Destination: 'gM4Fpv2QuHY4knJsQyYGKEHFGw3eMBwc1U',
			Fee: '15',
			Flags: 2147483648,
			LastLedgerSequence: 11,
			Memos: [Object],
			Sequence: 1,
			SigningPubKey: 'BE3900393891A2A2244E28A82C43BA94CA94DD6BFE36D523576A22BFF86055D4',
			TransactionType: 'Payment',
			TxnSignature: 'F26A24E0763800034FD08342E4D029DC8C258377898B66542A57FF24DF9A3DCB9CD03300DA3B0918FE4216543450152AC7299577FBF9209E09B364ED75EBD109',
			hash: '1B5BA850F4A98A452BDDE6A2A2D607BB990D4921F66341D8F5F01E16765A9894' }
	},
	status: 'success',
	type: 'response'
}
*/
