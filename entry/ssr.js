//---------//
// Imports //
//---------//

import createApp from '../create/app'

//
//------//
// Main //
//------//

export default context => {
  return new Promise((resolve, reject) => {
    try {
      const { app, router, store } = createApp()

      context.state = store.state

      router.onReady(() => {
        context.statusCode = 200
        if (store.state.showError) context.statusCode = 500
        else if (store.state.showNotFound) context.statusCode = 404
        resolve(app)
      })
      router.onError(reject)
      router.push(context.url)
    } catch (error) {
      error.message =
        'Error occurred while synchronously resolving the app' +
        `\n\n${error.message}`

      reject(error)
    }
  })
}
