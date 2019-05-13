const process = require('process');
const path = require('path');
const webpack = require('webpack');
const { VENDORS_VERSION } = require('./common/config');


module.exports = {
  entry: {
    vendors: ['vue', 'vuex', 'vue-i18n', 'vue-router', 'axios', 'lodash'],
  },

  output: {
    path: path.resolve(__dirname, 'libs'),
    filename: `[name]_${VENDORS_VERSION}.js`,
    library: '[name]_[hash]',
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist', 'dll', '[name].manifest.json'),
      name: '[name]_[hash]',
    }),
  ],
};
