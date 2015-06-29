Meteor.methods({
  getCard: getCard,
  createCard: createCard
});

/**
 * Fetches a card from Cards
 */
function getCard() {

}

/**
 * Inserts a card into Cards
 * > called when user successfully submits a trustSet transaction
 *
 *
 */
function createCard() {
  /*
  TODO: guarantee integrity of the txn
    see:  https://github.com/sunny-g/whuffie/issues/15
    solution:
      check txn hash against ledger either through:
        • get request for txn info
        • check against our own db of txns
   */

}
