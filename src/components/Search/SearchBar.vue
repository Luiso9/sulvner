<template>
	<div>
		<input
			type="text"
			v-model="query"
			class="search-input"
			placeholder="Type to search..."
		/>
		<button @click.prevent="submitQuery" class="search-button">Search</button>
	</div>
</template>

<script>
import { useSearchStore } from "@/store/searchStores";

export default {
	name: "SearchBar",
	computed: {
		query: {
			get() {
				return this.searchStore.query;
			},
			set(value) {
				this.searchStore.setQuery(value); // Update the Pinia store
			},
		},
	},
	methods: {
		submitQuery() {
			if (this.query.trim()) {
				console.log("Query submitted:", this.query);
			} else {
				console.log("Query is empty.");
			}
		},
	},
	setup() {
		const searchStore = useSearchStore();
		return { searchStore };
	},
};
</script>

<style>
.search-input {
	width: 80%;
	padding: 0.5rem;
}
.search-button {
	padding: 0.5rem 1rem;
	margin-left: 0.5rem;
}
</style>
