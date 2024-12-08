<template>
	<div class="search-results">
		<div v-if="results.length === 0" class="no-results">
			<p>No results found. Sorry.</p>
		</div>
		<div v-else class="results-grid">
			<div v-for="anime in results" :key="anime.id" class="result-card">
				<img :src="anime.image" :alt="anime.title" class="anime-image" />
				<h3 class="anime-title">{{ anime.title }}</h3>
				<p class="anime-description">Episode {{ anime.episodeNumber || 'N/A' }}</p>
				<button @click.prevent="viewDetails(anime.id)" class="details-button">
					View Details
				</button>
			</div>
		</div>

		<!-- Pagination -->
		<div v-if="results.length > 0" class="pagination">
			<button
				@click="changePage(currentPage - 1)"
				:disabled="currentPage === 1"
				class="pagination-button"
			>
				Previous
			</button>
			<span>Page {{ currentPage }}</span>
			<button @click="changePage(currentPage + 1)" class="pagination-button">
				Next
			</button>
			<RouterLink to="/">Go to Home</RouterLink>
		</div>
	</div>
</template>

<script>
import { useSearchStore } from "@/store/searchStores";
import { useRouter } from "vue-router";

export default {
	name: "SearchResults",
	props: {
		results: {
			type: Array,
			required: true,
		},
		currentPage: {
			type: Number,
			default: 1,
		},
	},
	setup() {
		const searchStore = useSearchStore(); // Access Pinia store
		const router = useRouter();

		// Navigation to anime details page
		const viewDetails = (id) => {
			router.push({ name: "Info", params: { id } });
		};

		// Change pagination page
		const changePage = (newPage) => {
			searchStore.setCurrentPage(newPage); 
			searchStore.fetchResults(); 
		};

		return { viewDetails, changePage };
	},
};
</script>

<style>
.results-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
}
.result-card {
	width: 200px;
	border: 1px solid #ccc;
	padding: 0.5rem;
	text-align: center;
}
.details-button {
	margin-top: 0.5rem;
	padding: 0.3rem 0.6rem;
	cursor: pointer;
}
</style>
