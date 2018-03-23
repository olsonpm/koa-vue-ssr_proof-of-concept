'use strict'

//---------//
// Imports //
//---------//

import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

//
//------//
// Init //
//------//

const isProd = process.env.NODE_ENV === 'production',
  vueLoaderConfig = getVueLoaderConfig()

//
//------//
// Main //
//------//

export default babelLoaderOptions => ({
  mode: 'development',
  devtool: isProd
    ? '#cheap-module-source-map'
    : '#cheap-module-inline-source-map',
  output: {
    filename: '[name].chunkhash.js',
    //
    // HACK workaround due to https://github.com/webpack/webpack/issues/4303
    // __dirname is the project root instead of the directory containing
    //   this file
    //
    path: path.join(__dirname, 'dist/vue'),
    publicPath: '/dist/vue',
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: !!isProd && 'warning',
  },
  plugins: isProd ? getProdPlugins() : [new FriendlyErrorsPlugin()],
  module: {
    rules: [
      {
        loader: 'vue-loader',
        options: vueLoaderConfig,
        test: /\.vue$/,
      },
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelLoaderOptions,
        test: /.js$/,
      },
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
        },
        test: /\.(png|jpg|gif|svg)$/,
      },
    ],
  },
})

//
//------------------//
// Helper Functions //
//------------------//

function getProdPlugins() {
  return [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'common.[chunkhash].css',
    }),
  ]
}

function getVueLoaderConfig() {
  return {
    extractCSS: process.env.NODE_ENV === 'production',
    preserveWhitespace: false,
    postcss: [
      autoprefixer({
        browsers: ['last 3 versions'],
      }),
    ],
  }
}
