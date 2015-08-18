/**
 * @namespace Cards
 * @type {Meteor.Collection}
 */
Cards = new Meteor.Collection('cards');

/**
 * Schema for comments in comment threads (can be modelled after reddit/hn-style comments)
 * @type {SimpleSchema}
 */
// TODO: break out comments to their own package, keep a reference in Card
CommentSchema = new SimpleSchema({
  // TODO: include some way of gifting/nixing within comments

  // TODO: some kind of user info
  authorUsername: {
    type: String,
    label: 'Comment Author Username',
    optional: true
  },

  authorId: {
    type: String
  },

  commentMessage: {
    type: String,
    label: 'Comment Message',
    min: 1,
    max: 500,
    optional: true
  }

  /*
  replies: {
    type: [CommentSchema],
    optional: true
  }
   */
});

/**
 * Schema for Cards
 * @type {SimpleSchema}
 * TODO: which user info should be included and indexed?
 * TODO: when complete, set `optional` to false for appropriate fields
 */
Cards.schema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },

  sourceUserAddress: {
    type: String,
    label: 'Source User Address',
    optional: true
  },

  sourceUsername: {
    type: String,
    label: 'Source Username',
    optional: true
  },

  sourceUserId: {
    type: String
  },

  targetUserAddress: {
    type: String,
    label: 'Target User Address',
    optional: true
  },

  targetUsername: {
    type: String,
    label: 'Target Username',
    optional: true
  },

  targetUserId: {
    type: String
  },

  cardMessage: {
    type: String,
    label: 'Card Message',
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

  isDeleted: {
    type: Boolean,
    defaultValue: false,
    optional: true
  },

  isVerified: {
    type: Boolean,
    defaultValue: false,
    optional: true
  },

  transactionMetadata: {
    type: Object, // TODO: define schema for txn metadata
    optional: true
  }
});

Cards.attachSchema(Cards.schema);
