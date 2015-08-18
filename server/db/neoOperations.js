Meteor.neo4j.methods({
  /*
  define queries that our clients can run

  each prop is a function that returns the string of our queries
  ex: return 'MATCH (a:Player {_id:{playerId}}) DELETE a'
    > this will match a doc in Player based on an obj with a prop
      playerId, then delete it
   */
});

/*
TODO: neo4j cypher injection attack (either from simpleSchemas or elsewhere)
  addresses are all base58 (use some regex in the)
  values and limits are all floats
 */

neoOperations = {
  createUser: createUser,
  // upsertEdge: upsertTrustline,
  upsertEdge: upsertTrustlineSync,
  updateTrustlineWithPayment: updateTrustlineWithPayment
};

var createUserQuery = [
  'CREATE (:User {_id: {mongoId},',
    'username: {username},',
    'address: {address}});'
].join(' ');

function createUser(user, callback) {
  // saves:
  // user.id, username and stellar address

  neoQuery(createUserQuery, {
    mongoId: user._id,
    username: user.username,
    address: user.profile.stellar.address
  }, callback);
}

var originalTrustlineUpsertQuery = [
  'MATCH (s {address: {sourceAddr}}),',
    '(t {address: {targetAddr}})',
  'MERGE (s)-[limit:TRUST]->(t)',
  'ON MATCH SET limit.prevAmount = limit.amount,',
    'limit.amount = {amount}',
  'ON CREATE SET limit.amount = {amount},',
    'limit.prevAmount = 0,',
    'limit.source = {sourceAddr},',
    'limit.target = {targetAddr}',
  'RETURN limit;'
].join(' ');

var trustlineUpsertQuery = [
  'MATCH (s:User {address: {sourceAddr}}),',
    '(t:User {address: {targetAddr}})',
  'MERGE (s)-[limit:TRUST]->(t)',
  'ON MATCH SET',
    'limit.prevSourceLimit = limit.currSourceLimit,',
    'limit.currSourceLimit = {newLimit},',
    'limit.prevTargetBalance = limit.currTargetBalance,',
    'limit.currTargetBalance = limit.prevTargetBalance + ({newLimit} - limit.prevSourceLimit)',
  'ON CREATE SET',
    'limit.source = {sourceAddr},',
    'limit.target = {targetAddr},',
    'limit.prevSourceLimit = 0,',
    'limit.currSourceLimit = {newLimit},',
    'limit.prevTargetBalance = 0,',
    'limit.currTargetBalance = {newLimit}',
  'RETURN limit;'
].join(' ');

function upsertTrustline(sourceAddr, targetAddr, limit, callback) {
  neoQuery(trustlineUpsertQuery, {
    newLimit: limit,
    sourceAddr: sourceAddr,
    targetAddr: targetAddr
  }, callback);
}

function upsertTrustlineSync(sourceAddr, targetAddr, limit, callback) {
  return neoQuerySync(trustlineUpsertQuery, {
    newLimit: limit,
    sourceAddr: sourceAddr,
    targetAddr: targetAddr
  });
}

// NOTE: sum of pair of targetBalances should equal sum of pair of trustLine limits
// NOTE: limits exist entirely independently of balances, there are no relations anymore
var paymentTrustlineUpdateQuery = [
  'MATCH (s:User {address: {sourceAddr}}),',
    '(t:User {address: {targetAddr}})',
  'MERGE (s)-[limit:TRUST]->(t)',
  'ON MATCH SET',
    'limit.prevTargetBalance = limit.currTargetBalance,',
    'limit.currTargetBalance = limit.prevTargetBalance + {value}',
  'ON CREATE SET',
    'limit.source = {sourceAddr},',
    'limit.target = {targetAddr},',
    'limit.prevSourceLimit = 0,',
    'limit.currSourceLimit = 0,',
    'limit.prevTargetBalance = 0,',
    'limit.currTargetBalance = {value}',
  'RETURN limit;'
].join(' ');

function updateTrustlineWithPayment(keyAddress, counterpartyAddress, value, callback) {
  neoQuery(paymentTrustlineUpdateQuery, {
    value: value,
    sourceAddr: counterpartyAddress,
    targetAddr: keyAddress
  }, callback);
}

function updateTrustlineWithPaymentSync(keyAddress, counterpartyAddress, value, callback) {
  return neoQuerySync(paymentTrustlineUpdateQuery, {
    value: value,
    sourceAddr: counterpartyAddress,
    targetAddr: keyAddress
  });
}