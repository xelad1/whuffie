Package.describe({
  name: "whuffie:whuffie-identities",
  summary: "A Whuffie package for connecting identities",
  version: "0.0.1",
  git: "https://github.com/sunny-g/whuffie"
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'oauth',
    'oauth2',
    'github',

    'http',
    'whuffie:whuffie-stellar'
  ]);

  api.imply([
    'service-configuration',
    'okgrow:promise'
  ]);

  api.addFiles([
    'lib/github/github-client.js'
  ], ['client']);

  api.addFiles([
    'lib/github/github-server.js'
  ], ['server']);

  api.export([
    'WhuffieIdentity'
  ], ['client']);
});