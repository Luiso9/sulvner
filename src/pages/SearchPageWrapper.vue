<template>
	<div class="search-page-wrapper">
		<!-- Search Input Section -->
		<SearchBar @perform-search="performSearch" />

		<!-- Results Section -->
		<SearchResults
			v-if="searchResults.length > 0"
			:results="searchResults"
			:currentPage="currentPage"
			@view-details="viewDetails"
			@change-page="changePage"
		/>
	</div>
</template>

<script>
import SearchBar from "@/components/Search/SearchBar.vue";
import SearchResults from "./SearchResults.vue";
import { searchAnime } from "@/services/animeServices";

export default {
	name: "SearchPageWrapper",
	components: {
		SearchBar,
		SearchResults,
	},
	data() {
		return {
			searchResults: [],
			currentPage: 1,
			query: "",
		};
	},
	methods: {
		async performSearch(query) {
			this.query = query; // Store the query for pagination
			await this.fetchResults(query, 1); // Start from page 1
			console.log(this.query)
		},
		async fetchResults(query, page) {
			try {
				const data = await searchAnime(query, page);
				console.log(data)
				if (data && data.results) {
					this.searchResults = data.results;
					this.currentPage = page;
				}
			} catch (error) {
				console.error("Error fetching search results:", error);
			}
		},
		async changePage(page) {
			if (page < 1) return;
			await this.fetchResults(this.query, page);
		},
		viewDetails(id) {
			this.$router.push({ name: "AnimeDetails", params: { id } });
		},
	},
};
</script>
