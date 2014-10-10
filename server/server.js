Meteor.methods({
	
	// this method is called from the stellard listener
	'addTxn': function(txn) {
		// console.log('Adding a txn to our collection...');
		Transactions.insert(txn);
	},

  'insertUserInfo': function(userInfo) {
    UsersPublic.insert(userInfo);
  },

  'setUserInfo': function(userInfo, id) {
    UsersPublic.update(
      { "_id": id },
      { $set: userInfo }
    );
  },

  // pushUserInfo
    // pushes new payment and profile info into their arrays in db

  /*
  'updateUser': function(newUserInfo) {
    // find user
    // merge existing user obj with newUserInfo
  }
   */




  // discussion on server holding keys vs not
    // almost COMPLETELY NON-SENSICAL AND USELESS
    // b/c server can't call client if client isnt on page/logged in:
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  // SERVER-SIDE CONTROL OF CLIENT (for third-party app stuff)
  // (may not be necessary at all)
  /*
  this way (hopefully), you get the best of both worlds of push and pull
  ** you still need to keep the server secure and free from arbitrary cmds

  steps:
    1. define Meteor.method for CALLING the client-share func
    2. define Meteor.clientMethod for sharing/nixing wufi
      >> we can define share limits that would otherwise need 2FA
      >> this could also get the
    3. ON BUTTON PRESSES, user simply shares
    4. WHEN AUTHENTICATED ON ANOTHER SERVICE (e.g. logged in wufi and tw w/ tw)
      >> 'pay with wufi' / share-walls
        - click a button to pay/share
        - service sends API request to our server
        - upon verification (& user login/auth), server calls cli-share-wfi

      >> 'twitter sync'
        - triggers Meteor.call >> Meteor.clientCall(share-wufi-tw-acct, params, from, server)

      >> proofs
        >> github
          - client types in username, gets copypasta
          - client stores it in gist
          - server polls for update on gists, then calls cli-store-proof-txn

   */

  // the only thing 'pull' schemes do is let server charge you when
    // you don't want/have keys and crypto on hand/in browser
  //
  //

});