const webpack = require('webpack');
const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = Merge(commonConfig, {
  mode: 'development',

  watch: true,

  watchOptions: {
    ignored: /node_moudles/,
    poll: 500,
    aggregateTimeout: 600
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new webpack.EnvironmentPlugin({
      'process.env': JSON.stringify('development')
    })
  ]
});
