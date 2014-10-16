/*

this will hold our classes for CREATING TXN MEMOS FOR LEDGER
** this will mirror .processor/memostore.js

later, the classes written here will form the basis of an NPM module
  for creating and sending wufi-compliant txns
for now however, these classes will be project- and Meteor-specific

 */

Memo = function(data) {
  /*
  this assembles the ledger-ready memoObj

  depending on the txn type (post, identity, deals, etc)
    you will have different requirements for the input data obj
  requirements should be handled in some client-side validation lib

  getMemo() returns the ledger-ready memoObj
  tx.Memos = [ { Memo: { MemoType: type, MemoData: data } } ]
   */

  this.memoType = 'wufi';

  var dataType = Object.prototype.toString.call(data);
  if (dataType !== '[object Object]') {
    this.memoData = JSON.stringify(data);
  } else {
    this.memoData = '';
  }
};

Memo.prototype.getMemo = function() {
  // returns the stringified and hexified memoObj
  return {
    MemoType: utils.stringToHex(this.memoType),
    MemoData: utils.stringToHex(this.memoData)
  }
};

//////////////////////////////////////////////////

StellarTransaction = function(rcvr, amt, memoObj) {
  // if info can be passed in the same as in a TrustSet txn, then this is all we need

  // assumes remote has been created from Remote
  this._remote = remote;
  this.tx = this._remote.transaction();

  // rcvr = Session.get rcvr address
  // if amt > 0
    // amt = getShareLimit(rcvr) + amt
  // else if abs(amt) <= getShareLimit(rcvr)

  this.tx.payment({});

  this.tx.tx_json.Memos = [ { Memo: memoObj } ];

  // tx.setFlags ??

};

StellarTransaction.prototype.submit = function(callback) {

  if (this._remote._connected) {
    this.tx.submit(callback);
  }
};

/*
ShareTxn.prototype.getShareLimits = function(address) {

  remote.connect(function() {
    remote.requestAccountLines(address);

    remote.disconnect();
  })
};
*/

//////////////////////////////////////////////////
// UI CLIENT-SIDE validation objects
/*
what do we need to validate against?
  simple share txn:
    username
    amount
      amount !> 1000000 WFI   // arbitrary but whatever for now
    message
      length !> 200 char
*/
//////////////////////////////////////////////////

