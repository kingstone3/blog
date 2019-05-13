const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');


module.exports = Merge(commonConfig, {
  mode: 'production',

  output: {
    filename: 'chunk_[name].[hash].js',
    chunkFilename: 'chunk_[name].[chunkhash].js',
  },

  plugins: [
    new ParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false,
          comments: false,
        },
        compress: {
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true,
        }
      },
    }),
  ],
})
