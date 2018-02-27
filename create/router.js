//---------//
// Imports //
//---------//

import _ from 'lodash'
import Vue from 'vue'
import VueRouter from 'vue-router'

import about from '../component/about.vue'
import home from '../component/home.vue'
import notFound from '../component/not-found.vue'

//
//------//
// Init //
//------//

const nameToComponent = getNameToComponent(),
  nameToPath = getNameToPath()

//
//------//
// Main //
//------//

const routes = createRoutes()

Vue.use(VueRouter)

export default () =>
  new VueRouter({
    mode: 'history',
    routes,
  })

//
//------------------//
// Helper Functions //
//------------------//

function getNameToComponent() {
  return {
    about,
    index: home,
    notFound,
  }
}

function createRoutes() {
  return ['about', 'index', 'notFound'].map(name => {
    const component = nameToComponent[name],
      path = getPathFromName(name)

    return { component, name, path }
  })
}

function getPathFromName(name) {
  return '/' + _.get(nameToPath, name, _.kebabCase(name))
}

function getNameToPath() {
  return {
    index: '',
    notFound: '*',
  }
}
