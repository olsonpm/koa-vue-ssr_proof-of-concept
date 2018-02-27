//---------//
// Imports //
//---------//

import createApp from '../create/app'
import notFound from '../component/not-found.vue'

import { logError } from '../utils/client'

//
//------//
// Main //
//------//

const { app, router } = createApp()

router.onReady(routerIsReady, logError)

//
//------------------//
// Helper Functions //
//------------------//

function routerIsReady() {
  const matchedComponents = router.getMatchedComponents()

  console.log('matchedComponents[0]: ' + matchedComponents[0])
  console.log('matchedComponents[0].name: ' + matchedComponents[0].name)
  console.log('is notFound' + (matchedComponents[0] === notFound))

  app.$mount('#app')
}
