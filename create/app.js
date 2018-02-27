//---------//
// Imports //
//---------//

import Vue from 'vue'

import app from './app.vue'
import createRouter from './router'

//
//------//
// Main //
//------//

const createApp = () => {
  const router = createRouter()

  return {
    router,
    app: new Vue({
      router,
      render: createElement => createElement(app),
    }),
  }
}

//
//---------//
// Exports //
//---------//

export default createApp
