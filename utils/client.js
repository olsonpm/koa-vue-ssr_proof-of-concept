//------//
// Main //
//------//

//
// just a positive form of 'non-empty'
//
const isLaden = something => {
  return (
    something &&
    (something.length ||
      something.size ||
      (typeof something === 'number' && something > 0) ||
      (typeof something === 'object' && Object.keys(something).length))
  )
}

const logError = err => {
  console.error(err)
}

//
//---------//
// Exports //
//---------//

export { isLaden, logError }
