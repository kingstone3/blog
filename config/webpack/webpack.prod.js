const webpack = require('webpack');
const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common');


module.exports = Merge(commonConfig, {
  mode: 'production',

  output: {
    filename: 'chunk_[name].[hash].js',
    chunkFilename: 'chunk_[name].[chunkhash].js',
  },
})
