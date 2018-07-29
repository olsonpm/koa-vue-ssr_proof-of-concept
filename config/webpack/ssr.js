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
  devtool: 'source-map',
  entry: path.resolve(__dirname, '../../entry/ssr.js'),
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
