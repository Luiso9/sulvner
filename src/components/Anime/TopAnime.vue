<template>
	<div class="top-anime-page">
		<h1 class="page-title text-2xl font-bold mb-4">Top Anime</h1>

		<div v-if="loading" class="loading text-center">
			<CustomLoading />
		</div>

		<div v-else class="anime-list">
			<Swiper :slides-per-view="4" :space-between="30" :loop="true" class="my-swiper">
				<SwiperSlide v-for="anime in filteredAnimeList.slice(0, 12)" :key="anime.id">
					<Card :anime="anime" @viewDetails="viewAnimeDetails" @watchAnime="watchAnime" />
				</SwiperSlide>
			</Swiper>
		</div>
	</div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { useAnimeStore } from "@/store/animeStore";
import Card from "@/components/Anime/Card.vue";
import CustomLoading from "./CustomLoading.vue";

export default {
	name: "TopAnime",
	components: {
		Swiper,
		SwiperSlide,
		Card,
		CustomLoading,
	},
	computed: {
		animeStore() {
			return useAnimeStore();
		},
		animeList() {
			return this.animeStore.topAnime.results;
		},
		totalPages() {
			return this.animeStore.topAnime.totalPages;
		},
		loading() {
			return this.animeStore.loading;
		},
		filteredAnimeList() {
			return this.animeList.filter((anime) => anime.episodes > 0);
		},
	},
	async created() {
		await this.loadAnimeList();
	},
	methods: {
		async loadAnimeList() {
			await this.animeStore.fetchTopAnime();
		},
		viewAnimeDetails(id) {
			this.$router.push({ name: "Info", params: { id } });
		},
		async watchAnime(animeId) {
			try {
				await this.animeStore.fetchAnimeDetails(animeId);
				const firstEpisode = this.animeStore.animeDetails?.episodes?.[0];
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
