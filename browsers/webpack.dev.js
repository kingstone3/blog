const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common');


module.exports = Merge(commonConfig, {
  mode: 'development',

  watch: true,

  devtool: 'cheap-module-eval-source-map',
});
