<template>
	<div class="search-page-wrapper">
		<!-- Search Input Section -->
		<div class="search-input">
			<input
				v-model="searchStore.query"
				placeholder="Search for an anime..."
				class="search-bar"
			/>
		</div>

		<!-- Results Section -->
		<SearchResults
			:results="searchStore.searchResults"
			:currentPage="searchStore.currentPage"
			@view-details="viewDetails"
		/>
	</div>
</template>

<script>
import SearchResults from "@/pages/SearchResults.vue";
import { watch } from "vue";
import { useSearchStore } from "@/store/searchStores";

export default {
	name: "SearchPageWrapper",
	components: {
		SearchResults,
	},
	setup() {
		const searchStore = useSearchStore();

		watch(
			() => searchStore.query,
			async (newQuery) => {
				if (newQuery.trim()) {
					await searchStore.fetchResults();
				}
			}
		);

		const viewDetails = (id) => {
			searchStore.router.push({ name: "Info", params: { id } });
		};

		return { searchStore, viewDetails };
	},
};
</script>

<style>
.search-page-wrapper {
	padding: 1rem;
}
.search-input {
	margin-bottom: 1rem;
}
.search-bar {
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 1rem;
}
</style>
