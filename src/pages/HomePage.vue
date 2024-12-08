<template>
	<RecentRelease />

	<TopAnime />
</template>

<script>
import RecentRelease from '@/components/Anime/RecentRelease.vue';
import TopAnime from '@/components/Anime/TopAnime.vue';

export default {
	name: "HomePage",
	components: {
		RecentRelease,
		TopAnime,
	},
	data() {
		return {
			animeList: [],
			currentPage: 1,
		};
	},
};
</script>
