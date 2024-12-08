<template>
	<input type="text" v-model="query" />
	<button @click.prevent="submitQuery">Search</button>
</template>

<script>
export default {
	name: "SearchBar",
	data() {
		return {
			query: "",
			searchResults: [],
			currentPage: 1,
		};
	},
	methods: {
		submitQuery() {
			if (this.query.trim()) {
				this.$emit("perform-search", this.query); // TODO : implement dynamic search without entering the button
			} else {
				console.log("Query empty");
			}
		},
	},
	emits: {
		"perform-search": (query) => typeof query === "string",
	},
};
</script>

<style>
/* Optional styling */
.search-input {
	width: 80%;
	padding: 0.5rem;
}
.search-button {
	padding: 0.5rem 1rem;
	margin-left: 0.5rem;
}
</style>
