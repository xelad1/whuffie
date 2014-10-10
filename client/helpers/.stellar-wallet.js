// this will contain our stellar-wallet code
// this should:

// for the proof of concept:
/*
  create key and addr and send to server, store privately (meaning other clients can't pull them
  store key and addr in Session
 */

// eventually:
/*
  generate blob from username + passphrase [+ email]
    perhaps warpwallet-style
  generate recovery code
    ??
  blob is :
    stringified
    encrypted by key derived from username + passphrase
    encrypted by key derived from username + recovery code
    stored in the db and sent to user on login
 */