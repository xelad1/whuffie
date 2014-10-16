// CONTROLLER HELPERS (these help populate the models)
Template.menuSlider.rendered = function() {
  $('#menuSlider').sidebar();
};

Template.shareModal.rendered = function() {
  $('#shareModal').modal();

  // sets up the simple shareModal validation
  // this will run against
  $('#simpleShareModalForm')
    .form(validationRules.simpleShareModalForm, {
      inline: true,
      on: 'blur'
    });
};

// CONTROLLER EVENTS (these manipulate data and models based on user input)
Template.header.events({

  "click .menu-slider-button" : function() {
    $('#menuSlider').sidebar('toggle');
  },

  "click .share-modal-button" : function(e, template) {
    e.preventDefault();

    $('#shareModal')
      .modal('setting', {
        closable: true,
        onDeny : function() {
          console.log('discarding txn...');
        },
        onApprove: function() {
          /*
          the submit-txn button needs to trigger the following:
          - get data from form fields
          - a client-side (UI) check of the data being typed in
          -
          - a creation of the memoObj
          - a creation and submission of the txn to the ledger
          - an animation showing the process proceeding and one upon completion/failure

          therefore,
            which parts need to be bundled in a class?
            which parts can be inherited from other classes?
            which parts are separated into
              validation
              creation
              submission
              animation?
          */

          return true;

        }
      })
      .modal('show');
  }


});

/*
var submitShareTxnFromForm = function(event, template) {

	event.preventDefault();

	var btn = $('#submit-txn');
	btn.button('loading');

	var input_rcvr = template.find('input[id=recipient-addr]');
	var input_amt = template.find('input[id=send-amount]');
  var amt = input_amt.value;

	var rcvr = input_rcvr.value.trim();
	// fetches user's address from mini-contactbook w/in Session
  rcvr = Session.get(rcvr)

	var amt = Amount.from_human(amt + 'WFI');

  // TypedMemo is a class that creates a memoObj from assigned props
    // specific to a type of txn (deal, post, identity, etc)
	var memo = new TypedMemo({
	  msg: blah,
	  blah: blahdy
	...
	});
	var memoObj =

	var info = {
	  from: myAddr,
	  to: rcvr,
	  amount: amt
	}

  // ShareTxn is a class that creates and submits txns
  var tx = new ShareTxn(info, memoObj);

  // callback must:
    parses errors for user
    animate the waiting and success gifs
  tx.submit(function(err, res) {
    if (err) {}
    else {


    }
  });

};

*/

/////////////////////////////////
/*
these are the validation rules
  theyre called in the event handlers per context (simple share, comment share, etc)
  strictly UI based, since a malicious user can do what they want regardless of UI and a benevolent user won't try it

*/

/////////////////////////////////
var validationRules = {};

validationRules.simpleShareModalForm = {
  username: {
    identifier: 'simpleShareModalUsername',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter a username'
      }
    ]
  },

  amount: {
    identifier: 'simpleShareModalAmount',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter an amount to share'
      }
    ]
  },

  message: {
    identifier: 'simpleShareModalMessage',
    rules: [
      {
        type: 'maxLength[200]',
        prompt: 'Please keep your message under 200 characters'
      }
    ]
  }
};