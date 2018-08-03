const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');


module.exports = {
  entry: {

  },

  output: {
    path: path.resolve(__dirname, '../../browser/dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/dist/'
  },

  module: {
    rules: [
      {
        test:    /\.js(x)?$/,
        exclude: /node_modules/,
        use:  ['babel-loader?cacheDirectory'],
      },
    ],
  },

  resolve: {
    extensions: ['.jsx', '.js'],
  },

  plugins: [
    new WebpackNotifierPlugin({
      title:        'Webpack Finished',
      alwaysNotify: true,
    }),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh/),

    new webpack.optimize.CommonsChunkPlugin({
      name: '',
      chunks: [

      ],
    }),
  ],
};
