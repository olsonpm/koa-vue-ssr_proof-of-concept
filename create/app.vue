<template>
	<div id="app">
		<header>
			<h1>Welcome</h1>

			<nav>
				<router-link to="/">Home</router-link>
				<router-link to="/about">About</router-link>
				<router-link to="/cause-error">Cause Error</router-link>
				<router-link to="/cause-404">Cause 404</router-link>
			</nav>
		</header>
		<main>
			<not-found v-if="showNotFound" />
			<error v-else-if="showError" />
			<router-view v-else></router-view>
		</main>
	</div>
</template>

<script>
import error from './error.vue'
import notFound from './not-found.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: { error, notFound },
  computed: mapState(['showNotFound', 'showError']),
}
</script>

<style>
nav > a + a {
  margin-left: 20px;
}
</style>
