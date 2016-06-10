setStellarSession = function() {
  //if (!Meteor.user()) { return; }
  // var user = Meteor.user();
  var addr = Meteor.user().profile.stellar.account_id;
  var skey = Meteor.user().profile.stellar.master_seed;
  Session.set('myAddr', addr);
  Session.set('mySecret', skey);
  remote.set_secret(addr, skey);
};

stellardCxnInterval = function() {
  console.log('stellar heartbeat');
  // reconnects to stellard if online
  if (remote.state === 'offline') {
    console.log('reconnecting to stellard');
    remote.connect();
  }

  // guarantees that stellar info stays in Session
  if (!Session.get('myAddr')) {
    setStellarSession();
  }
};

/**
 * Convenience function for submitting transactions
 *
 * @param currencyCode {string}
 * @param txnType {string} - either 'payment' or 'trustSet'
 * @param amt {number} - Absolute sum to pay or to set trust
 * @param rcvrAddr {string}
 * @param options
 * @param memoObj
 * @param preSubmitCallback {function}
 * @param postSubmitCallback {function}
 */
var submitGenericTransaction = function(currencyCode, txnType, amt, rcvrAddr, options, memoObj, preSubmitCallback, postSubmitCallback) {
  if (typeof amt !== 'number' || currencyCode.length > 3) {
    return;
  }

  options = options || null;
  memoObj = memoObj || {};
  preSubmitCallback = preSubmitCallback || function() {
      console.log('running default preSubmitCallback');
    };
  postSubmitCallback = postSubmitCallback || function(err, res) {
      console.log('running default postSubmitCallback, err/res are:', err, res);
    };

  var amtNum = Amount.from_human(amt + currencyCode);
  var tx = remote.transaction();

  var txOptions = Object.create(options);
  txOptions.from = Session.get('myAddr');
  txOptions.to = rcvrAddr;

  tx[txnType](txOptions);
  if (txnType === 'payment') {
    tx.tx_json.amount = amtNum;
  } else if (txnType === 'trustSet') {
    tx.tx_json.LimitAmount = {
      currency: currencyCode,
      value: amt.toString(),
      issuer: rcvrAddr
    };
  }
  tx.tx_json.Memos = [ { Memo: memoObj } ]

  preSubmitCallback();
  tx.submit(function (err, res) {
    postSubmitCallback(err, res);
  });
};

var iterativeDeepeningDepthFirstSearch = function (node, finalDepth) {
  
  for (var maxDepth = 1; maxDepth < 6; maxDepth++) {
    depthFirstSearch(node, maxDepth);
  }
}

var depthFirstSearch = function (node, maxDepth) {

  var childrenLength = node.children.length;
  
  if (maxDepth <= 0) {
    return
  };

  for (var i = 0; i < childrenLength; i++) {
    depthFirstSearch(node.children[i], maxDepth - 1);
  }
}

submitSTRTransaction = submitGenericTransaction.bind(null, 'STR', 'payment');

submitWFITransaction = submitGenericTransaction.bind(null, 'WFI', 'payment');

submitWFITrustTransaction = submitGenericTransaction.bind(null, 'WFI', 'trustSet');