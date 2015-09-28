Amount = stellar.Amount;
Remote = stellar.Remote;
utils = stellar.utils;

remote = new Remote({
  trusted: false,
  local_signing: true,
  local_fee: true,
  fee_cushion: 1.5,
  max_fee: 15,
  servers: [
    {
      host: stellardCxn.host,
      port: stellardCxn.port,
      secure: stellardCxn.secure
    }
  ]
});

// connect to stellard, sets session vars to Stellar stuff,
// keep stellard cxn alive
remote.connect();
setStellarSession();
Meteor.setInterval(stellardCxnInterval, 10000);

testLogin = function(username) {
  Meteor.loginWithPassword(username, username, function (err) {
    if (err) {
      console.log('error logging in');
    } else {
      console.log('logged in as', username);
      setStellarSession();
    }
  });
};