<template>
	<div class="search-page-wrapper">
		<!-- Search Input Section -->

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
					await searchStore.fetchResults(); // Automatically fetch results on query change
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
