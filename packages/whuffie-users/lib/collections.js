/**
 *
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
 * Schema for Stellar profile schemas
 * TODO: make secure by storing ONLY address, public_key, and public_key_hex
 * @type {SimpleSchema}
 */
UserStellarProfileSchema = new SimpleSchema({
  account_id: {
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
  /**
   * Username
   * @type {String}, between 3 and 15 chars
   */
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/,
    label: 'Username',
    index: true,
    optional: false
  },

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
  },

  /*
  TODO: store stellar wallet blob
   */
});
