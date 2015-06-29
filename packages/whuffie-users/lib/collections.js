/**
 * Schema for Whuffie profiles
 * @type {SimpleSchema}
 */
UserWhuffieProfileSchema = new SimpleSchema({
  firstName: {
    type: String,
    defaultValue: '',
    optional: false
  },
  lastName: {
    type: String,
    defaultValue: '',
    optional: true
  }
});

/**
 * Schema for Stellar profiles
 * @type {SimpleSchema}
 * TODO: make server-secure by storing ONLY address, public_key, and public_key_hex
 * TODO: store stellar-wallet blob (w/ password reset bells and whistles)
 */
UserStellarProfileSchema = new SimpleSchema({
  address: {
    type: String,
    //regEx:  // make it length 34 and base58 or whatever
    label: 'Stellar Address',
    unique: true,
    index: true,
    optional: false
  },
  master_seed: {
    type: String
  },
  master_seed_hex: {
    type: String
  },
  public_key: {
    type: String,
    label: 'Stellar Public Key'
  },
  public_key_hex: {
    type: String,
    label: 'Stellar Public Key Hex'
  }
});

/**
 * Schema for Users in Meteor.users
 * @type {SimpleSchema}
 */
UserSchema = new SimpleSchema({
  profile: {
    type: Object,
    optional: false
  },

  'profile.whuffie': {
    type: UserWhuffieProfileSchema,
    label: 'Whuffie Profile',
    optional: false
  },

  'profile.stellar': {
    type: UserStellarProfileSchema,
    label: 'Stellar Profile',
    optional: false
  }

});

Meteor.users.attachSchema(UserSchema);