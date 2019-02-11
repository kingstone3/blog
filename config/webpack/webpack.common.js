const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {
  entry: {
    website: '../../browsers/website/js',
    website_account: '../../browsers/website-account/js',

    // 网站上线后删除这个 bundle
    components: '../../browsers/common/components',
  },

  output: {
    path: path.resolve(__dirname, '../../browsers/dist/js'),
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
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.pug$/,
        oneOf: [
          // 这条规则应用到 Vue 组件内的 `<template lang="pug">`
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          // 这条规则应用到 JavaScript 内的 pug 导入
          {
            use: ['raw-loader', 'pug-plain-loader']
          }
        ]
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
      template: '../../browsers/website/templates/index.template',
      filename: `${__dirname}/../../browsers/dist/website/templates/pug/index.pug`,
      inject: false,
    }),

    new HtmlWebpackPlugin({
      template: '../../browsers/website/templates/components.template',
      filename: `${__dirname}/../../browsers/dist/website/templates/pug/components.pug`,
      inject: false,
    }),

    // 网站上线后删除这个操作
    new HtmlWebpackPlugin({
      template: '../../browsers/website-account/templates/index.template',
      filename: `${__dirname}/../../browsers/dist/website-account/templates/pug/index.pug`,
      inject: false,
    }),

    new WebpackNotifierPlugin({
      title: 'Webpack Finished',
      alwaysNotify: true,
    }),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh/),
  ],
};
