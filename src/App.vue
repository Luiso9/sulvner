<template>
	<div class="min-h-screen bg-gray-100">
		<nav class="bg-white rounded-lg p-4 flex items-center justify-between">
			<div class="flex items-center">
				<button @click="toggleSidebar" class="text-gray-500 focus:outline-none lg:hidden">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M4 6h16M4 12h16m-7 6h7"></path>
					</svg>
				</button>
				<router-link to="/" class="text-xl font-semibold text-gray-800 ml-4">Sulvner</router-link>
			</div>
			<div class="hidden lg:flex items-center space-x-4">
				<router-link v-for="item in menuItems" :key="item.title" :to="item.path"
					class="text-gray-600 hover:text-gray-800">
					<span class="flex items-center">
						<svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path :d="item.iconPath" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
							</path>
						</svg>
						{{ item.title }}
					</span>
				</router-link>
			</div>
			<div class="relative flex items-center space-x-4">
				<transition name="slide-fade" enter-active-class="transition-transform ease-out duration-300"
					leave-active-class="transition-transform ease-in duration-200"
					enter-from-class="opacity-0 translate-x-4" enter-to-class="opacity-100 translate-x-0"
					leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 translate-x-4">
					<input v-if="showSearchBar" v-model="query" @keyup.enter="submitQuery" type="text"
						placeholder="Search anime..."
						class="absolute mr-2 w-full top-1/2 p-2 right-6 transform -translate-y-1/2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						style="width: 200px; z-index: 50" />
				</transition>
				<button @click="toggleSearchBar" class="text-gray-500 focus:outline-none">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M8 4v16m8-16v16M4 8h16m-16 8h16"></path>
					</svg>
				</button>
			</div>
		</nav>

		<transition name="slide-sidebar" enter-active-class="transition-transform ease-out duration-300"
			leave-active-class="transition-transform ease-in duration-200" enter-from-class="-translate-x-full"
			enter-to-class="translate-x-0" leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
			<div v-if="sidebar" class="fixed inset-y-0 left-0 w-64 bg-white shadow-md z-50 lg:hidden">
				<div class="p-4">
					<button @click="toggleSidebar" class="text-gray-500 focus:outline-none">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</button>
				</div>
				<nav class="p-4">
					<router-link v-for="link in links" :key="link.text" :to="link.to"
						class="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg" @click="toggleSidebar">
						<span class="flex items-center">
							<span class="w-5 h-5 mr-1 material-symbols-outlined">
								{{ link.iconName }}
							</span>
							{{ link.text }}
						</span>
					</router-link>
				</nav>
			</div>
		</transition>

		<main class="px-4 bg-white min-h-screen">
			<router-view></router-view>
		</main>
	</div>
</template>

<script>
export default {
	data() {
		return {
			sidebar: false,
			appTitle: "Sulvner",
			links: [
				{
					text: "Home",
					to: "/",
					iconName: "home"
				},
				{
					text: "About",
					to: "/about",
					iconName: "public",
				},
			],
			menuItems: [
				{ title: "Home", path: "/", iconName: "home" },
				{
					title: "About",
					path: "/about",
					iconName: "public",
				},
			],
			showSearchBar: false,
			query: "",
		};
	},
	methods: {
		toggleSidebar() {
			this.sidebar = !this.sidebar;
		},
		toggleSearchBar() {
			this.showSearchBar = !this.showSearchBar;
		},
		submitQuery() {
			if (this.query.trim()) {
				this.$router.push({
					name: "Search",
					query: { q: this.query },
				});
			} else {
				console.log("Query is empty.");
			}
		},
	},
};
</script>

<style lang="css">
.material-symbols-outlined {
	font-family: 'Material Symbols Outlined';
	font-weight: normal;
	font-style: normal;
	font-size: 16px;
	/* Preferred icon size */
	display: inline-block;
	line-height: 1;
	text-transform: none;
	letter-spacing: normal;
	word-wrap: normal;
	white-space: nowrap;
	direction: ltr;
}
</style>
