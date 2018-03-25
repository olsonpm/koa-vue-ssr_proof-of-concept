'use strict'

//---------//
// Imports //
//---------//

import path from 'path'
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
import webpack from 'webpack'

import babelConfig from '../babel/client'
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

const clientConfig = Object.assign({}, commonConfig, {
  //
  // HACK workaround due to https://github.com/webpack/webpack/issues/4303
  // __dirname is the project root instead of the directory containing this file
  //
  entry: [path.join(__dirname, 'entry/client.js')],
})

clientConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    ),
    'process.env.VUE_ENV': '"client"',
  }),
  new VueSSRClientPlugin()
)

//
//---------//
// Exports //
//---------//

export default clientConfig
