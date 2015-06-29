/*
	contains:
		additional collections (e.g. Products)
		Mongo-stored Neo4j collections
 */

Sellables = new Meteor.Collection('sellables');

neoDB = {
	// Meteor.neo4j.query returns a reactive Object 
		// contains all props saved to Neo4j 
  //Users: Meteor.neo4j.query('MATCH (user:User) RETURN user, count(user)'),

	Users: Meteor.neo4j.collection('users')
  //Limits: Meteor.neo4j.query('MATCH ()-[limit:TRUST]->() WHERE limit.amount > 0 RETURN limit')
};
