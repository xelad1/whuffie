1. build a base class for specific txns that can be used to
    a. parse Memos from the ledger so their attributes can be stored appropriately in the DB
        ex:
            function identityTxn () {
                this.memo = {};   // keeps the memo txn obj
                this.store = {};  // keeps the db obj
                storeDbData: function(ledger_msg) {
                // sets obj attrs so the obj can be inserted
                    var data = {};
                    data.username = ledger_msg.username;
                    ...
                    return data
                },
                storeMemo: function(a, b, c) {
                // sets the txn-specific info for memo
                    var memoObj = {};
                    memoObj.a = a;
                    ...
                    return memoObj
                }
            }

            if ledger_txn is identityTxn:
                var txn = new identityTxn();
                // this should create a new obj w/ the right attr
                insertTxn(txn.storeDbData(msg_json));

    b. create the right Memos to be used in txns
        ex:
            // this will create our memo obj based on the txn's needed memo props
            var txn = new identityTxn();
            var idMemo = txn.storeMemo(all, my, memo, inputs);
            tx.tx_json.Memos = [ { Memo: idMemo } ]

2.