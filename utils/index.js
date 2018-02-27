//---------//
// Imports //
//---------//

import pify from 'pify'

import _fs from 'fs'

//
//------//
// Init //
//------//

const pFs = pify(_fs)

//
//------//
// Main //
//------//

const readFile = fpath => pFs.readFile(fpath, 'utf8')

//
//---------//
// Exports //
//---------//

export * from './client'
export { readFile }
