const path = require('path');
const webpack = require('webpack');
const { JS_VENDORS_VERSION } = require('./common/config');

module.exports = {
  entry: {
    common_vendors: ['vue', 'vuex', 'vue-router', 'vue-i18n', 'axios', 'lodash', 'sockjs-client'],
  },

  output: {
    path: path.resolve(__dirname, 'libs'),
    filename: `[name]-${JS_VENDORS_VERSION}.js`,
    library: '[name]_[hash]',
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'dll', `[name]-${JS_VENDORS_VERSION}.manifest.json`),
      name: '[name]_[hash]',
    }),
  ],
};
