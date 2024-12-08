<template>
	<div class="search-results">
		<div v-if="results.length === 0" class="no-results">
			<p>No results found. Sorry.</p>
		</div>
		<div v-else class="results-grid">
			<div v-for="anime in results" :key="anime.id" class="results-card">
				<img :src="anime.image" :alt="anime.title" class="anime.image">
				<h3 class="anime-title">{{  anime.title }}</h3>
				<p class="anime-description"> Episode {{ anime.episodeNumber }}</p>
				<button @click.prevent="$emit('view-details', anime.id)" class="details-button">View Details</button>
			</div>
		</div>

		<!-- Pagination -->
		<div v-if="results.length > 0" class="pagination">
			<button
				@click="$emit('change-page', currentPage - 1)"
				:disabled="currentPage === 1"
				class="pagination-button"
			>
				Previous
			</button>
			<span>Page {{ currentPage }}</span>
			<button @click="$emit('change-page', currentPage + 1)" class="pagination-button">
				Next
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "SearchResults",
		props: {
			results: {
                type: Array,
                required: true
            },
            currentPage: {
                type: Number,
                default: 1,
            }
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
