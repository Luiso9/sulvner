<template>
	<div class="home-page">
		<h1 class="page-title">Recent Anime</h1>

		<div v-if="animeList.length === 0" class="loading">
			<p>Loading anime...</p>
		</div>

		<div v-else class="anime-list">
			<div class="anime-card" v-for="anime in animeList" :key="anime.id">
				<img :src="anime.image" :alt="anime.title" class="anime-image" />
				<h3 class="anime-title">{{ anime.title }}</h3>
				<p class="anime-description">{{ anime.episodeNumber }}...</p>
				<button
					@click="viewAnimeDetails(anime.id)"
					class="anime-details-button"
				>
					View Details</button
				><button
					@click="watchAnime(anime.episodeId)"
					class="anime-watch-button"
				>
					Watch
				</button>
				<AnimeDetailsPage v-if="showDetails" :animeId="selectedId" />
			</div>
		</div>

		<div v-if="animeList.length > 0" class="pagination">
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
		</div>
	</div>
</template>

<script>
import { fetchRecentAnime } from "@/services/animeServices";
import AnimeDetailsPage from "@/pages/AnimeDetailsPage.vue";

export default {
	name: "RecentRelease",
	data() {
		return {
			animeList: [],
			currentPage: 1,
			showDetails: false,
			selectedId: null,
		};
	},
	async created() {
		try {
			const data = await fetchRecentAnime(this.currentPage);
			this.animeList = data.results;
		} catch (error) {
			console.error("Error loading homepage:", error);
		}
	},
	methods: {
		async changePage(page) {
			if (page < 1) return;
			this.currentPage = page;
			try {
				const data = await fetchRecentAnime(this.currentPage);
				this.animeList = data.results;
			} catch (error) {
				console.error("Error changing page:", error);
			}
		},
		viewAnimeDetails(id) {
			// console.log("Navigating to ID:", id); // Debug
			this.$router.push({ name: "Info", params: { id } });
		},
		watchAnime(episodeId) {
			this.$router.push({ name: "Watch", params: { id: episodeId } });
		},
	},
	components: {
		AnimeDetailsPage,
	},
};
</script>

<style scoped>
.home-page {
	padding: 20px;
}

.anime-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 20px;
}

.pagination {
	margin-top: 20px;
	display: flex;
	justify-content: center;
}

button {
	padding: 10px 15px;
	margin: 0 10px;
	cursor: pointer;
}

button:disabled {
	cursor: not-allowed;
}
</style>
