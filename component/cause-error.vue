<template>
	<div>
		<h2>You will never see this view</h2>
		<p>Because it causes an error</p>
	</div>
</template>

<script>
import { getStore } from '../utils/global-store'

export default {
  name: 'cause-error',
  path: '/cause-error',
  beforeRouteEnter: (_unused_to, _unused_from, next) => {
    //
    // we don't actually throw or call next(error) because that prevents the url
    //   from changing.  What we want is for the url to change but with a view
    //   of the correct error (404/500)
    //
    getStore().commit('setShowError', true)
    next()
  },
}
</script>
