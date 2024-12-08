<template>
	<div>
		<div v-if="anime">
			<h1>{{ anime.title }}</h1>
			<p>{{ anime.otherName }}</p>
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
	props: ['id'], // Receive the `id` from the route
	data() {
		return {
			anime: null,
			error: null,
		};
	},
	async created() {
		await this.loadAnimeDetails();
	},
	methods: {
		async loadAnimeDetails() {
			try {
				if (!this.id) throw new Error("Anime ID is undefined");
				this.anime = await fetchAnimeDetails(this.id); 
			} catch (error) {
				this.error = error;
			}
		},
	},
	// watch: {
	// 	// Watch for changes in `id` when navigating to the same component with a different `id`
	// 	id: {
	// 		immediate: true,
	// 		async handler(newId) {
	// 			await this.loadAnimeDetails();
	// 		},
	// 	},
	// },
};
</script>
