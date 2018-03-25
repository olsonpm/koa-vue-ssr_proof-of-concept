'use strict'

//---------//
// Imports //
//---------//

import webpackNodeExternals from 'webpack-node-externals'
import path from 'path'
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin'

import babelConfig from '../babel/server'
import getCommonConfig from './common'

//
//------//
// Init //
//------//

const commonConfig = getCommonConfig(babelConfig)

//
//------//
// Main //
//------//

const ssrConfig = Object.assign({}, commonConfig, {
  //
  // HACK workaround due to https://github.com/webpack/webpack/issues/4303
  // __dirname is the project root instead of the directory containing this file
  //
  devtool: 'source-map',
  entry: path.join(__dirname, 'entry/server.js'),
  target: 'node',
  externals: webpackNodeExternals({
    whitelist: /\.css$/,
  }),
})

ssrConfig.output.libraryTarget = 'commonjs2'
ssrConfig.plugins.push(new VueSSRServerPlugin())

//
//---------//
// Exports //
//---------//

export default ssrConfig
