<template>
	<div id="app">
		<header>
			<h1>Welcome</h1>

			<nav>
				<router-link to="/">Home</router-link>
				<router-link to="/about">About</router-link>
			</nav>
		</header>
		<main>
			<router-view></router-view>
		</main>
	</div>
</template>

<script>
export default {
  name: 'app',
  props: ['url'],
}
</script>
