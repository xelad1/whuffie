Meteor.methods({
	
	// this method is called from the stellard listener
	'addTxn': function(txn) {
		// console.log('Adding a txn to our collection...');
		Transactions.insert(txn);
	},

  'addUser': function(userInfo) {
    Users.insert(userInfo);
  },

  'isUser': function(id) {
    return Users.find({ _id: id })
  }

  /*
  'updateUser': function(newUserInfo) {
    // find user
    // merge existing user obj with newUserInfo
  }
   */
	
});