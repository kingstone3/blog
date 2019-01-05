const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    blog: '../../browser/src/js',
  },

  output: {
    path: path.resolve(__dirname, '../../browser/dist/js'),
    filename: 'chunk_[name].js',
    chunkFilename: 'chunk_[name].js',
    publicPath: '/dist/js'
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use:  ['babel-loader?cacheDirectory']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ],
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      'vue': 'vue/dist/vue.js'
    }
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
    new HtmlWebpackPlugin({
      template: '../../server/templates/index.template',
      filename: `${__dirname}/../../server/templates/pug/index.pug`,
      inject: false,
    }),

    new WebpackNotifierPlugin({
      title: 'Webpack Finished',
      alwaysNotify: true,
    }),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh/),
  ],
};
