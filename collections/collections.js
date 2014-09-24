
// public user db, aside from Meteor.users (login)
  // this will keep everything made public
UsersPublic = new Meteor.Collection('users');
Transactions = new Meteor.Collection('transactions');

// for use with aldeed:collection2
/*
var Schemas = {};

BasicInfoSchema = new SimpleSchema({
  basics: {
    type: Object

  }
});

///////////////
    bio: String,
    firstName: String,
    lastName: String,
    location: String,
  },

  payments: [
    {
      type: String,
      address: String,
      proof: {
        ledger_index: Number,
        tx_hash: String
      }
    }
  ],

  profiles: [
    {
      type: String,
      username: String,
      proof: String,
      profile_page: String
    }
  ],

  openspecs_version:

});

Users.attachSchema(Schemas.User);
*/