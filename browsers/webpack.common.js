const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackDevServerOutput = require('webpack-dev-server-output');
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {
  entry: {
    website_account: ['./website-account/js/'],
    website_admin: ['./website-admin/js/'],

    // 网站上线后删除这个 bundle
    components: ['./common/components/'],
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
        use:  ['babel-loader?cacheDirectory']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
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
            use: ['raw-loader', 'pug-plain-loader']
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
    extensions: ['.js', '.vue', '.json']
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

    new HtmlWebpackPlugin({
      template: './website-admin/templates/index.template',
      filename: `${__dirname}/./dist/website-admin/templates/pug/index.pug`,
      inject: false,
    }),

    new HtmlWebpackPlugin({
      template: './website-admin/templates/components.template',
      filename: `${__dirname}/./dist/website-admin/templates/pug/components.pug`,
      inject: false,
    }),

    // 网站上线后删除这个操作
    new HtmlWebpackPlugin({
      template: './website-account/templates/index.template',
      filename: `${__dirname}/./dist/website-account/templates/pug/index.pug`,
      inject: false,
    }),

    new webpack.HotModuleReplacementPlugin(),

    new WebpackDevServerOutput({
      path: './dist/js',
      isDel: true
    }),

    new WebpackNotifierPlugin({
      title: 'Webpack Finished',
      alwaysNotify: true,
    }),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|zh/),
  ],
};
