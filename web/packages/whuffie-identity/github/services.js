Meteor.startup(function () {
  ServiceConfiguration.configurations.upsert(
    { service: "github" },
    {
      $set: {
        clientId: Meteor.settings.private.identityProviders.github.clientId,
        secret: Meteor.settings.private.identityProviders.github.clientSecret
      }
    }
  );
});