// creates connection to Neo4j db
	// takes optional str of db URL 
		// (or uses env vars NEO4J_URL or GRAPHENEDB_URL)
Meteor.N4JDB = new Meteor.Neo4j('http://localhost:7474');

// GLOBAL
// wrappers for query functions
//neoQuery = Meteor.N4JDB.query;
neoQuery = Meteor.neo4j.query;
// neoQuerySync = Meteor.wrapAsync(Meteor.N4JDB.query, Meteor.N4JDB);
neoQuerySync = Meteor.wrapAsync(Meteor.neo4j.query, Meteor.neo4j);

/*
neoQuerySync = function(query, options) {
  Future = Npm.require('fibers/future');
  var myFuture = new Future();
  
  // call the function and store its result
  Meteor.N4JDB(query, options, function (error, results){
    if (error){
      myFuture.throw(error);
    } else {
      myFuture.return(results);
    }
  });

  return myFuture.wait();
}
 */