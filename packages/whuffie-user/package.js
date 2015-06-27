Package.describe({
  name: "whuffie:whuffie-user",
  summary: "Authentication for Whuffie",
  version: "0.0.1",
  git: "https://github.com/sunny-g/whuffie"
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'accounts-base',
    'meteorhacks:npm'
  ], ['client', 'server']);

  Npm.depends({
    "request": "2.53.0"
  });

  api.addFiles([
    'lib/server/auth.js'
  ], ['server']);
});