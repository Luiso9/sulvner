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
				<p class="anime-description">
					Type: {{ anime.type }} - Duration: {{ anime.duration }}
				</p>
				<p v-if="anime.episodes > 0">
					Episodes: {{ anime.episodes }} (Sub: {{ anime.sub }}, Dub:
					{{ anime.dub }})
				</p>
				<p v-else>No episodes yet</p>
				<button @click="viewAnimeDetails(anime.id)" class="anime-details-button">
					View Details
				</button>
				<button @click="watchAnime(anime.id)" class="anime-watch-button">
					Watch
				</button>
			</div>
		</div>

		<div v-if="animeList.length > 0" class="pagination">
			<button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="pagination-button">
				Previous
			</button>
			<span>Page {{ currentPage }} of {{ totalPages }}</span>
			<button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
				class="pagination-button">
				Next
			</button>
		</div>
	</div>
</template>

<script>
import { fetchRecentAnime } from "@/services/animeServices";

export default {
	name: "RecentRelease",
	data() {
		return {
			animeList: [],
			currentPage: 1,
			totalPages: 0,
			showDetails: false,
			selectedId: null,
		};
	},
	async created() {
		await this.loadAnimeList();
	},
	methods: {
		async loadAnimeList() {
			try {
				const data = await fetchRecentAnime(this.currentPage);
				this.animeList = data.results;
				this.totalPages = data.totalPages || 1;
			} catch (error) {
				console.error("Error loading anime list:", error);
			}
		},
		async changePage(page) {
			if (page < 1 || page > this.totalPages) return;
			this.currentPage = page;
			await this.loadAnimeList();
		},
		viewAnimeDetails(id) {
			this.$router.push({ name: "Info", params: { id } });
		},
		watchAnime(episodeId) {
			this.$router.push({ name: "Watch", params: { id: episodeId } });
		},
	},
};
</script>

<style>
.anime-description {
	font-size: 0.9rem;
	margin: 5px 0;
}

.anime-card p {
	margin: 5px 0;
}
</style>
