// creates connection to Neo4j db
	// takes optional str of db URL 
		// (or uses env vars NEO4J_URL or GRAPHENEDB_URL)
Meteor.N4JDB = new Meteor.Neo4j('http://localhost:7474');

// GLOBAL
// wrappers for query functions
neoQuery = Meteor.N4JDB.query;
neoQuerySync = Meteor.wrapAsync(Meteor.N4JDB.query, Meteor.N4JDB);