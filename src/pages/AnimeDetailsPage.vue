<template>
	<div>
		<div v-if="anime">
			<h1>{{ anime.title }}</h1>
			<p>Other Name: {{ anime.japaneseTitle || "N/A" }}</p>
			<p>Type: {{ anime.type }}</p>
			<p>Episodes: {{ anime.totalEpisodes || "No episodes available" }}</p>
			<img :src="anime.image" :alt="anime.title" />
			<p><a :href="anime.url" target="_blank">Visit Official Page</a></p>
			<RouterLink to="/">Go to Home</RouterLink>
		</div>
		<div v-else-if="error">
			<p>Error: {{ error.message }}</p>
		</div>
		<div v-else>
			<p>Loading...</p>
		</div>
	</div>
</template>

<script>
import { fetchAnimeDetails } from "@/services/animeServices";

export default {
	name: "AnimeDetailsPage",
	props: ["id"], // Receive `id` from the route
	data() {
		return {
			anime: null,
			error: null,
		};
	},
	async created() {
		await this.loadAnimeDetails(); // Load details on component mount
	},
	methods: {
		async loadAnimeDetails() {
			try {
				if (!this.id) throw new Error("Anime ID is undefined");
				this.anime = await fetchAnimeDetails(this.id); // Fetch anime details
			} catch (error) {
				this.error = error;
			}
		},
	},
};
</script>
