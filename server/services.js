Meteor.startup(function () {
  ServiceConfiguration.configurations.upsert(
    { service: "github" },
    {
      $set: {
        clientId: Meteor.settings.private.identityServices.github.clientId,
        secret: Meteor.settings.private.identityServices.github.clientSecret
      }
    }
  );
});