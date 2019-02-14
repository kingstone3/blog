const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: {
    website_account: './website-account/bin/www.js',
    website_admin: './website-admin/bin/www.js',
  },

  output: {
    path: path.resolve(__dirname, './dist'),
  },

  target: 'node',

  externals: {
    express: 'commonjs express'
  },

  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use:  ['babel-loader?cacheDirectory']
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.json']
  },
};
