<template>
	<div id="app">
		<NavBar />
		<router-view />
	</div>
</template>

<script>
	import NavBar from './components/Layout/NavBar.vue';

	export default {
		name: 'App',
		components: {
            NavBar,
        },
	}
</script>
