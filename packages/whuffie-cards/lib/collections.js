/**
 * @namespace Cards
 * @type {Meteor.Collection}
 */
Cards = new Meteor.Collection('cards');

/**
 * Schema for comments in comment threads
 * @type {SimpleSchema}
 */
CommentSchema = new SimpleSchema({
  // TODO: include some way of gifting/nixing within comments

  // TODO: some kind of user info
  authorUsername: {
    type: String,
    label: 'Comment Author Username',
    optional: false
  },

  commentMessage: {
    type: String,
    label: 'Comment Message',
    min: 1,
    max: 500,
    optional: false
  }
});

/**
 * Schema for Cards
 * @type {SimpleSchema}
 * TODO: which user info should be included and indexed?
 * TODO: when complete, set `optional` to false for appropriate fields
 */
CardSchema = new SimpleSchema({
  sourceUserAddress: {
    type: String,
    label: 'Source User Address',
    optional: true
  },

  //sourceUsername: {},

  targetUserAddress: {
    type: String,
    label: 'Target User Address',
    optional: true
  },

  //targetUsername: {}

  cardMessage: {
    type: String,
    label: 'Gift Message',
    max: 140,
    optional: true
  },

  /*
  contentType: {
    type: String,
    label: 'Content Type',
    allowedValues: ['video', 'photo', 'url'], // RegEx.Url
    optional: false
  },

  content: {
    type: ??
  },
   */

  comments: {
    type: [CommentSchema],
    optional: true
  },

  limitChange: {
    type: Number,
    label: 'Gift/Nix Amount',
    optional: true
  },

  ledgerVerified: {
    type: Boolean,
    defaultValue: false,
    optional: true
  },

  transactionMetadata: {
    type: Object, // TODO: define schema for txn metadata
    optional: true
  }
});

Cards.attachSchema(CardSchema);
