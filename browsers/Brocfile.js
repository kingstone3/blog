const AssetRev = require('broccoli-asset-rev');

var assetNode = new AssetRev('dist', {
  extensions: ['css', 'png', 'jpg', 'gif', 'svg'],
  replaceExtensions: ['css', 'pug'],
  exclude: [

  ],
});

module.exports = assetNode;
