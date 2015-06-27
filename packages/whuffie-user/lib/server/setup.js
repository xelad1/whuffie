Meteor.startup(function() {
  Meteor.users._ensureIndex({
    "username": 1,
    "profile.stellar.address": 1
  });
});