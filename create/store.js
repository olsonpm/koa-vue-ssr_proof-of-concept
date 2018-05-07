//---------//
// Imports //
//---------//

import Vue from 'vue'
import Vuex from 'vuex'

//
//------//
// Main //
//------//

Vue.use(Vuex)

const createStore = () =>
  new Vuex.Store({
    state: {
      showNotFound: false,
      showError: false,
    },
    mutations: {
      setShowNotFound(state, value) {
        state.showNotFound = value
      },
      setShowError(state, value) {
        state.showError = value
      },
    },
  })

//
//---------//
// Exports //
//---------//

export default createStore
