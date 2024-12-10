<template>
	<div class="home-page">
		<h1 class="page-title text-2xl font-bold mb-4">Top Anime</h1>

		<div v-if="animeList.length === 0" class="loading text-center">
			<p>Loading anime...</p>
		</div>

		<div v-else class="anime-list">
			<swiper :slides-per-view="4" :space-between="30" loop>
				<swiper-slide
					v-for="anime in filteredAnimeList.slice(0, 12)"
					:key="anime.id"
					class="anime-card bg-white rounded-lg p-4"
				>
					<div
						class="anime-image-container w-full h-64 overflow-hidden rounded-md"
					>
						<img
							:src="anime.image"
							:alt="anime.title"
							class="anime-image w-full h-full object-cover"
						/>
					</div>
					<h3 class="anime-title text-lg font-semibold mt-2">
						{{ anime.title.substring(0, 26) + ".." }}
					</h3>
					<p class="anime-description text-sm text-gray-600">
						Type: {{ anime.type }} - Duration: {{ anime.duration }}
					</p>
					<p class="text-sm text-gray-600">
						Episodes: {{ anime.episodes }} (Sub: {{ anime.sub }}, Dub:
						{{ anime.dub }})
					</p>
					<div class="mt-2 flex space-x-2">
						<button
							@click="viewAnimeDetails(anime.id)"
							class="anime-details-button bg-blue-500 text-white px-3 py-1 rounded-md"
						>
							View Details
						</button>
						<button
							@click="watchAnime(anime.id)"
							class="anime-watch-button bg-green-500 text-white px-3 py-1 rounded-md"
						>
							Watch
						</button>
					</div>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import { getTopAnime, fetchAnimeDetails } from "@/services/animeServices";

export default {
	name: "RecentRelease",
	components: {
		Swiper,
		SwiperSlide,
	},
	data() {
		return {
			animeList: [],
			currentPage: 1,
			totalPages: 0,
		};
	},
	computed: {
		filteredAnimeList() {
			return this.animeList.filter((anime) => anime.episodes > 0);
		},
	},
	async created() {
		await this.loadAnimeList();
	},
	methods: {
		async loadAnimeList() {
			try {
				const data = await getTopAnime(this.currentPage);
				this.animeList = data.results;
				this.totalPages = data.totalPages || 1;
			} catch (error) {
				console.error("Error loading anime list:", error);
			}
		},
		viewAnimeDetails(id) {
			this.$router.push({ name: "Info", params: { id } });
		},
		async watchAnime(animeId) {
			try {
				const details = await fetchAnimeDetails(animeId);
				const firstEpisode = details.episodes?.[0];
				if (!firstEpisode) {
					throw new Error("No episodes available for this anime.");
				}
				this.$router.push({
					name: "Watch",
					params: { id: firstEpisode.id },
				});
			} catch (error) {
				console.error("Error fetching episode details:", error);
				alert("Unable to fetch episode details. Please try again.");
			}
		},
	},
};
</script>

<style scoped>
.anime-description {
	font-size: 0.9rem;
	margin: 5px 0;
}

.anime-card p {
	margin: 5px 0;
}

.anime-image-container {
	width: 100%;
	height: 24rem; /* Fixed height for the image container */
}

.anime-image {
	width: 100%;
	height: 100%;
	object-fit: cover; /* Ensures the image covers the container while maintaining aspect ratio */
}
</style>
