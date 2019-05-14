const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackDevServerOutput = require('webpack-dev-server-output');
const { VueLoaderPlugin } = require('vue-loader');
const HappyPack = require('happypack');


module.exports = {
  entry: {
    website_account: ['./website-account/pages/'],
    website_admin: ['./website-admin/pages/'],
  },

  output: {
    path: path.resolve(__dirname, './dist/js/'),
    filename: 'chunk_[name].js',
    chunkFilename: 'chunk_[name].js',
    publicPath: '/dist/js/',
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use:  ['happypack/loader?id=babel']
      },

      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                js: 'happypack/loader?id=babel',
              }
            }
          }
        ]
      },

      // 普通的 `.scss` 文件和 `*.vue` 文件中的
      // `<style lang="scss">` 块都应用它
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
            use: [
              'raw-loader',
              'pug-plain-loader'
            ]
          }
        ]
      },

      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@kazupon/vue-i18n-loader'
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: 'vue/dist/vue.esm.js'
    },
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          name: 'website_vendors',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },

  plugins: [
    new CleanWebpackPlugin(),

    new VueLoaderPlugin(),

    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
    }),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(`${__dirname}/dll/common_vendors.manifest.json`),
    }),

    new HtmlWebpackPlugin({
      template: './website-admin/templates/index.template',
      filename: `${__dirname}/dist/website-admin/templates/pug/index.pug`,
      inject: false,
    }),

    new HtmlWebpackPlugin({
      template: './website-account/templates/index.template',
      filename: `${__dirname}/dist/website-account/templates/pug/index.pug`,
      inject: false,
    }),

    new webpack.HotModuleReplacementPlugin(),

    new WebpackDevServerOutput({
      path: `${__dirname}/dist/js`,
      isDel: true
    }),

    new WebpackNotifierPlugin({
      title: 'Webpack Finished',
      alwaysNotify: true,
    }),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh/),
  ],
};
