const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');


module.exports = {
  entry: {
    blog: '../../browser/src/js',
  },

  output: {
    path: path.resolve(__dirname, '../../browser/dist/js'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/dist/js'
  },

  module: {
    rules: [
      {
        test:    /\.js?$/,
        exclude: /node_modules/,
        use:  ['babel-loader?cacheDirectory'],
      },
    ],
  },

  resolve: {
    extensions: ['.js'],
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          name: 'chunk_vendors',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },

  plugins: [
    new WebpackNotifierPlugin({
      title: 'Webpack Finished',
      alwaysNotify: true,
    }),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh/),
  ],
};
