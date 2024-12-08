<template>
	<div class="watch-page">
		<h1 v-if="animeTitle">{{ animeTitle }} - Episode {{ episodeNumber }}</h1>
		<video
			v-if="streamingLink"
			id="video-player"
			class="video-js vjs-default-skin"
			preload="none"
			width="640"
			height="360"
			controls
			autoplay
		>
			Your browser does not support the video tag.
		</video>

		<div v-else-if="loading">Loading streaming link...</div>
		<div v-else-if="error">Error: {{ error }}</div>
	</div>
</template>

<script>
import { fetchAnimeDetailsWithEpisodes, findEpisodeByNumber } from "@/services/animeServices";
import { fetchStreamingLink } from "@/services/animeServices";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Hls from "hls.js";

export default {
	name: "WatchPage",
	props: ["id", "episodeNumber"], // Pass both the anime ID and episode number
	data() {
		return {
			animeTitle: null,
			streamingLink: null,
			loading: true,
			error: null,
			player: null,
		};
	},
	async created() {
		await this.loadEpisodeAndStream();
	},
	methods: {
		async loadEpisodeAndStream() {
			try {
				this.loading = true;

				// Step 1: Fetch detailed anime information
				const animeDetails = await fetchAnimeDetailsWithEpisodes(this.animeId);
				this.animeTitle = animeDetails.title || "Unknown Anime Title";

				// Step 2: Match the desired episode by its number
				const episode = findEpisodeByNumber(animeDetails.episodes, this.episodeNumber);
				if (!episode) {
					throw new Error(`Episode ${this.episodeNumber} not found.`);
				}

				// Step 3: Fetch the streaming link for the matched episode
				const streamingData = await fetchStreamingLink(episode.id);
				if (streamingData.sources && streamingData.sources.length > 0) {
					this.streamingLink = streamingData.sources[0].url; // Use the first valid source
				} else {
					throw new Error("No valid streaming link available.");
				}
			} catch (err) {
				this.error = err.message;
			} finally {
				this.loading = false;
			}
		},
		initializePlayer() {
			this.player = videojs("video-player", {
				autoplay: true,
				controls: true,
				preload: "auto",
				fluid: true,
			});

			this.player.ready(() => {
				if (Hls.isSupported()) {
					const hls = new Hls();
					hls.loadSource(this.streamingLink);
					hls.attachMedia(this.player.tech().el());
				} else {
					this.player.src({ src: this.streamingLink, type: "application/x-mpegURL" });
				}
			});

			this.player.on("error", () => {
				this.error = "An error occurred while playing the video.";
			});
		},
	},
	beforeUnmount() {
		if (this.player) {
			this.player.dispose();
		}
	},
};
</script>

<style scoped>
.video-js {
	width: 100%;
	height: auto;
}
</style>
