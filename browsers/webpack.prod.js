const webpack = require('webpack');
const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = Merge(commonConfig, {
  mode: 'production',

  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      'process.env': JSON.stringify('production')
    }),
    
    new ParallelUglifyPlugin({
      uglifyES: {
        output: {
          beautify: false,
          comments: false,
        },
        compress: {
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true,
        },
      },
    }),
  ],
});
