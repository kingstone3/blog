const webpack = require('webpack');
const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common');


module.exports = Merge(commonConfig, {
  mode: 'production',

  output: {
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/dist/',
  },
})
