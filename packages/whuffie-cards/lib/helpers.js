/**
 * Transformations to get user data when querying Cards
 */
Cards.helpers({
  /**
   * Transforms and returns sourceUser info based on sourceUserAddress
   * @returns {Meteor.user}
   */
  sourceUser: function() {
    return Meteor.users.findOne({'profile.stellar.account_id': this.sourceUserAddress});
  },

  /**
   * Transforms and returns targetUser info based on targetUserAddress
   * @returns {Meteor.user}
   */
  targetUser: function() {
    return Meteor.users.findOne({'profile.stellar.account_id': this.targetUserAddress});
  }
});

/**
 * Transformations to get Cards when querying Users
 */
Meteor.users.helpers({
  /**
   * Transforms user with a list of sent cards
   * @returns {T|any|Cursor}
   */
  sentCards: function() {
    return Cards.find({'sourceUserAddress': this.profile.stellar.account_id});
  },

  /**
   * Transforms user with a list of received cards
   * @returns {T|any|Cursor}
   */
  receivedCards: function() {
    return Cards.find({'targetUserAddress': this.profile.stellar.account_id});
  }
});