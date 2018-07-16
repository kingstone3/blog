const webpack = require('webpack');
const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common');


module.exports = Merge(commonConfig, {
  mode: 'development',

  output: {
    chunkFilename: '[name].[chunkhash].js',
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      comments: false
    }),
  ]
})
