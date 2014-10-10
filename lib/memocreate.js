/*

this will hold our classes for CREATING TXN MEMOS FOR LEDGER
** this will mirror .processor/memostore.js

usage:
  memo =
  tx.tx_json.Memos = [ { Memo: memo.getMemo() } ]

 */

Memo = function(data) {
  /*
   this assembles the ledger-ready memoObj
   data is the input
   it is the assembled wufi obj ready to be stringified and hexified
   getMemo() returns the ledger-ready memoObj
   tx.Memos = [ { Memo: { MemoType: type, MemoData: data } } ]
   */

  this._memoType = 'wufi';
  this.memoData = data;

  var dataType = Object.prototype.toString.call(this.memoData);
  if (dataType === '[object Undefined]' || dataType === '[object Null]' || dataType === '[object Function]') {
    this.memoData = '';
  } else {
    this.memoData = JSON.stringify(this.memoData);
  }
};

Memo.prototype.getMemo = function() {
  // returns the stringified and hexified memoObj
  return {
    MemoType: utils.stringToHex(this._memoType),
    MemoData: utils.stringToHex(this.memoData)
  }
};


IdentityMemo = function() {
  /* called by client when:
    // they first register their username (
    // they update profile with bio, name, location

  it needs to create the data Object to be stringified and hexified
  then, store it as one of it's own properties

  */
  /*
  * needs to keep track of characters in memo
  * needs to store in ledger:
    // 1. username
    // 2. profile:
      // > username
      // > proof url
    //
  */



  // TODO: **** DEFINE THE UPDATE/CREATE MEMO ****

  this.setUsername = function() {
    // at the end of this func: we must
      // create this.Memo as a plaintext Memo obj

  };

  /*
  after everything is set, run:
  this.memo = new Memo(this.data)
  this.getMemo = memo.getMemo;

  then when you're ready to share wufi:

  */

};


