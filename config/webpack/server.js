'use strict'

//---------//
// Imports //
//---------//

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
  path = require('path'),
  webpackNodeExternals = require('webpack-node-externals')

const babelConfig = require('../babel/server')

//
//------//
// Main //
//------//

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../../server.js'),
  target: 'node',
  devtool: '#cheap-module-inline-source-map',
  node: { __dirname: true },
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, '../..'),
  },
  externals: webpackNodeExternals({
    whitelist: /\.css$/,
  }),
  plugins: [new FriendlyErrorsPlugin()],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelConfig,
        test: /.js$/,
      },
    ],
  },
}
