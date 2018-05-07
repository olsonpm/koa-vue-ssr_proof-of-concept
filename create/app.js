//---------//
// Imports //
//---------//

import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import app from './app.vue'
import createRouter from './router'
import createStore from './store'

import { setStore } from '../utils/global-store'

//
//------//
// Main //
//------//

const createApp = () => {
  const store = createStore()
  setStore(store)

  const router = createAndInitRouter(store)
  sync(store, router)

  return {
    router,
    store,
    app: new Vue({
      router,
      store,
      render: createElement => createElement(app),
    }),
  }
}

//
//------------------//
// Helper Functions //
//------------------//

function createAndInitRouter(store) {
  const router = createRouter()

  router.beforeEach((to, _unused_from, next) => {
    if (store.state.showNotFound) store.commit('setShowNotFound', false)
    else if (store.state.showError) store.commit('setShowError', false)

    if (to.matched.length === 1 && to.matched[0].path === '*') {
      store.commit('setShowNotFound', true)
    }

    next()
  })

  return router
}

//
//---------//
// Exports //
//---------//

export default createApp
