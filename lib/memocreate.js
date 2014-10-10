/*

this will hold our classes for CREATING TXN MEMOS FOR LEDGER
** this will mirror .processor/classes.js

 */

IdentityMemo = function() {
  /* called by client when:
    // they first register their username (
    // they update profile with bio, name, location
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

  // this.Memo = undefined;

  // TODO: **** DEFINE THE UPDATE/CREATE MEMO ****

  this.setUsername = function() {
    // at the end of this func: we must
      // set MemoType and MemoData in plaintext
      // create this.Memo as a Memo obj

  }

};


Memo = function(type, data) {
	// tx.Memos = [ { Memo: { MemoType: type, MemoData: data } } ]

  type = 'wufi';
	this.MemoType = utils.stringToHex(type);

  if (typeof(data) === 'object') {
    data = JSON.stringify(data);
  }
	this.MemoData = utils.stringToHex(data);
};