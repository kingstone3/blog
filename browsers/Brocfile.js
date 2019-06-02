const mime = require('mime');
const AssetRev = require('broccoli-asset-rev');
const { CSS_VENDORS_VERSION, IMAGES_VENDORS_VERSION } = require('./common/config');

var assetNode = new AssetRev('dist', {
  extensions: ['css', 'png', 'jpg', 'gif', 'svg', 'ico'],
  replaceExtensions: ['css', 'pug'],
  customHash(buffer, pathToFile) {
    const fileType = mime.getType(pathToFile);

    switch (fileType) {
      case 'text/css': {
        return CSS_VENDORS_VERSION;
      }
      case 'image/svg+xml': {
        return IMAGES_VENDORS_VERSION;
      }
      case 'image/vnd.microsoft.icon': {
        return IMAGES_VENDORS_VERSION;
      }
    }
  },
  exclude: ['css/*'],
});

module.exports = assetNode;
