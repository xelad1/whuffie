Package.describe({
  name: "whuffie:whuffie-users",
  summary: "Authentication for Whuffie",
  version: "0.0.1",
  git: "https://github.com/sunny-g/whuffie"
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'accounts-base',
    'meteorhacks:npm',
    'aldeed:collection2@2.3.3',
  ], ['client', 'server']);

  Npm.depends({
    "request": "2.53.0"
  });

  api.addFiles([
    'lib/server/signup.js',
    'lib/server/publications.js'
  ], ['server']);

  api.addFiles([
    'lib/collections.js',
    'lib/helpers.js'
  ], ['client', 'server']);
});