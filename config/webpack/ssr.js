'use strict'

//---------//
// Imports //
//---------//

import webpackMerge from 'webpack-merge'
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

export default webpackMerge(commonConfig, {
  //
  // HACK workaround due to https://github.com/webpack/webpack/issues/4303
  // __dirname is the project root instead of the directory containing this file
  //
  entry: path.join(__dirname, 'entry/server.js'),
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
  },
  externals: webpackNodeExternals({
    whitelist: /\.css$/,
  }),
  plugins: [new VueSSRServerPlugin()],
})
