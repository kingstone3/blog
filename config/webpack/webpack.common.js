const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {
  entry: {
    blog: '../../browser/src/js',
    components: '../../browser/src/js/components',
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
    extensions: ['.js', '.vue', '.json']
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
    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: '../../server/templates/index.template',
      filename: `${__dirname}/../../server/templates/pug/index.pug`,
      inject: false,
    }),

    new HtmlWebpackPlugin({
      template: '../../server/templates/components.template',
      filename: `${__dirname}/../../server/templates/pug/components.pug`,
      inject: false,
    }),

    new WebpackNotifierPlugin({
      title: 'Webpack Finished',
      alwaysNotify: true,
    }),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh/),
  ],
};
