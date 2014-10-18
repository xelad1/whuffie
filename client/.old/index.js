// helpers help fill in the model
// events give data to the controller funcs that do the logics

Template.txns.helpers({
	txnsList: function() {
		return Transactions.find({}, {sort: {date: -1}});
	}
});

Template.txn.helpers({
	age: ageString,

	amount: function() {
		return this.amount/1e6;
	}
});

/*
Template.txn.created = function() {
	$(this.firstNode).fadeIn();
}
*/

Template.sendSTR.events({
	'click input#submit-txn': submitSTRTxn
});

Template.config.helpers({
	myAddr: function() {
		return Session.get('myAddr')
	}
});

Template.config.events({
	'click input#submit-config' : updateConfig
});

//////////////////////////////////////////////////////////
/////////////////// FAMO.US RELATED //////////////////////
//////////////////////////////////////////////////////////

Template.fam.rendered = function() {

	mainContext = Engine.createContext();
	var surface = new Surface({
		content: '<ul>' +
			'<li>item1</li>' +
			'<li>item2</li>' +
			'</ul>',
		size: [75, 75],
		properties: {
			color: 'black',
			textAlign: 'center',
			fontSize: '10px',
			backgroundColor: 'orange'
		}
	});

	var modifier = new Modifier({
		origin: [0, 0],
		align: [0, 0]
	})

	mainContext.add(modifier).add(surface);
};

Template.fav.rendered = function() {

	// var mainContext = Engine.createContext();
	var surface = new Surface({
		content: '<ul>' +
			'<li>item3</li>' +
			'<li>item4</li>' +
			'</ul>',
		size: [100, 100],
		properties: {
			color: 'white',
			textAlign: 'center',
			fontSize: '25px',
			backgroundColor: 'lightblue'
		}
	});

	var modifier = new Modifier({
		origin: [0, 0],
		align: [0, 0],
		// transform: Transform.translate(200, 100, 0)
	});

	mainContext.add(modifier).add(surface);

	surface.on('click', function() {
		surface.setContent('CLICKED')
	})
};

/*
Template.fav.events({
	'click': function(e, t) {
		var famousComponent = famousCmp.dataFromTpl(t);
		famousComponent.setContent('clicked!');
	}
})
*/
/////////////////////////////////////////////////////////

