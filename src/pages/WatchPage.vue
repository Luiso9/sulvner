<template>
	<div class="watch-page">
		<h1 v-if="animeTitle">{{ animeTitle }}</h1>
		<video
			v-if="streamingLink"
			ref="videoPlayer"
			class="video-js vjs-default-skin"
			preload="none"
			width="640"
			height="268"
			controls
			autoplay
		>
			Not supported
		</video>

		<div v-else-if="loading">Loading streaming link...</div>
		<div v-else-if="error">Error: {{ error }}</div>
	</div>
</template>

<!-- TODO : Video implementation, its still cant play video -->
<!-- TODO : CORS Thing. -->

<script>
import { fetchStreamingLink } from "@/services/animeServices";
import Hls from "hls.js";

export default {
	name: "WatchPage",
	props: ["id"],
	data() {
		return {
			animeTitle: null,
			streamingLink: null,
			loading: true,
			error: null,
		};
	},
	async created() {
		try {
			const data = await fetchStreamingLink(this.id); // Fetch link with default server
			if (data.sources && data.sources.length > 3) {
				this.streamingLink =
					"https://gogoanime-and-hianime-proxy.vercel.app/hls-proxy?url=" +
					data.sources[3].url;
			} else {
				throw new Error("No valid streaming link available.");
			}
			this.animeTitle = data.title || "Unknown Anime Title";
		} catch (err) {
			this.error = err.message;
		} finally {
			this.loading = false;
		}
	},
	watch: {
		streamingLink(newLink) {
			if (newLink) {
				const videoElement = this.$refs.videoPlayer;

				// Check if HLS.js is supported and set up player
				if (Hls.isSupported()) {
					const hls = new Hls();
					hls.loadSource(newLink);
					hls.attachMedia(videoElement);
					hls.on(Hls.Events.MANIFEST_PARSED, () => {
						videoElement.play();
					});
				} else if (
					videoElement.canPlayType("application/vnd.apple.mpegurl")
				) {
					// Fallback for Safari and other HLS supported browsers
					videoElement.src = newLink;
					videoElement.play();
				} else {
					this.error = "HLS is not supported in your browser.";
				}
			}
		},
	},
};
</script>

<style scoped>
.video-js {
	width: 100%;
	height: auto;
}
</style>
