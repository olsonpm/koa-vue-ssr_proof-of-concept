//---------//
// Imports //
//---------//

import createApp from '../create/app'

//
//------//
// Main //
//------//

export default ctx => {
  return new Promise((resolve, reject) => {
    const { url } = ctx,
      { app, router } = createApp()

    router.push(url)
    router.onReady(() => resolve(app), reject)
  })
}
