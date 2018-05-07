//---------//
// Imports //
//---------//

import Vue from 'vue'
import VueRouter from 'vue-router'

import about from '../component/about.vue'
import causeError from '../component/cause-error.vue'
import home from '../component/home.vue'
import notFound from './not-found.vue'

//
//------//
// Main //
//------//

Vue.use(VueRouter)

const routes = [about, causeError, home, notFound].map(component => ({
  component,
  path: component.path,
}))

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    routes,
  })

//
//---------//
// Exports //
//---------//

export default createRouter
