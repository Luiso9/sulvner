<template>
	<nav
		class="block w-full max-w-screen-lg px-4 py-2 mx-auto bg-white shadow-md rounded-md lg:px-8 lg:py-3 mt-4"
	>
		<div
			class="container flex flex-wrap items-center justify-between mx-auto text-slate-800"
		>
			<router-link
				to="/"
				class="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold"
			>
				Sulvner
			</router-link>

			<div class="hidden lg:block">
				<ul
					class="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"
				>
					<li class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
						<router-link to="/" class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 text-slate-500 mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
							Home
						</router-link>
					</li>
				</ul>
			</div>
			<div class="items-center hidden gap-x-2 lg:flex">
				<div class="w-full max-w-sm min-w-[200px]">
					<div class="relative">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
							/>
						</svg>
						<input
							v-model="query"
							type="text"
							class="w-full pl-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
							placeholder="Search anime..."
							@keyup.enter="submitQuery"
						/>
					</div>
				</div>
				<button
					@click.prevent="submitQuery"
					class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
					type="button"
				>
					Search
				</button>
			</div>
			<button
				@click="toggleDropdown"
				class="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
				type="button"
			>
				<span
					class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</span>
			</button>
		</div>

		<!-- Mobile dropdown menu -->
		<div v-if="isDropdownOpen" class="lg:hidden mt-4">
			<ul class="flex flex-col gap-2">
				<li class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
					<router-link
						to="/"
						class="flex items-center"
						@click="closeDropdown"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-slate-500 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/>
						</svg>
						Home
					</router-link>
				</li>
			</ul>
			<div class="mt-4">
				<div class="relative">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
						/>
					</svg>
					<input
						v-model="query"
						type="text"
						class="w-full pl-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
						placeholder="Search anime..."
						@keyup.enter="submitQuery"
					/>
				</div>
				<button
					@click.prevent="submitQuery"
					class="mt-2 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
					type="button"
				>
					Search
				</button>
			</div>
		</div>
	</nav>
</template>

<script>
import { useSearchStore } from "@/store/searchStores";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
	name: "NavBar",
	setup() {
		const router = useRouter();
		const searchStore = useSearchStore();
		const query = ref("");
		const isDropdownOpen = ref(false);

		const submitQuery = () => {
			if (query.value.trim()) {
				searchStore.setQuery(query.value);
				performSearch();
				closeDropdown();
			} else {
				console.log("Query is empty.");
			}
		};

		const performSearch = () => {
			if (query.value.trim()) {
				router.push({
					name: "Search",
					query: { q: query.value },
				});
			}
		};

		const toggleDropdown = () => {
			isDropdownOpen.value = !isDropdownOpen.value;
		};

		const closeDropdown = () => {
			isDropdownOpen.value = false;
		};

		return {
			searchStore,
			query,
			submitQuery,
			performSearch,
			isDropdownOpen,
			toggleDropdown,
			closeDropdown,
		};
	},
};
</script>
