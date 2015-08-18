Package.describe({
  name: "whuffie:whuffie-cards",
  summary: "A Whuffie package to deal with gift and nix Cards",
  version: "0.0.1",
  git: "https://github.com/sunny-g/whuffie"
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'whuffie:whuffie-users@0.0.1',

    'aldeed:collection2@2.3.3',
    'dburles:collection-helpers@1.0.3'
  ]);

  api.addFiles([
    'lib/server/methods.js',
    //'lib/server/helpers.js'
  ], 'server');

  api.addFiles([
    'lib/collections.js',
    'lib/helpers.js'
  ], ['client', 'server']);

  api.export(['Cards'], ['client', 'server']);
});