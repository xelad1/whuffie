1. build a base class for specific txns that can be used to
    a. parse Memos from the ledger so their attributes can be stored appropriately in the DB
        ex:
            function identityStoreTxn () {
                this.memo = null;
                storeDbData: function(ledger_msg) {
                // sets obj attrs so the obj can be inserted
                    this.username = ledger_msg.username;
                    ...
                },
                storeMemo: function(special, inputs) {
                // creates memo prop, then sets the txn-specific info
                    this.memo.special = special;
                    ...
                }
            }

            if ledger_txn is identityStoreTxn:
                txn = new identityStoreTxn;
                txn.storeDbData(msg_json)
                // this should create a new obj w/ the right attr
                insertTxn(txn);

    b. create the right Memos to be used in txns
        ex:
            // this will create our memo obj based on the txn's needed memo props
            txn = new identityStoreTxn();
            txn.storeMemo(special, inputs);

            tx.tx_json.Memos = [ txn.memo ]

2.