const webpack = require('webpack');
const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common');


module.exports = Merge(commonConfig, {
  mode: 'production',

  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/dist/js',
  },
})
