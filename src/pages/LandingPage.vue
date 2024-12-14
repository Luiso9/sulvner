<template>
	<div
		class="container mx-auto flex flex-col items-center gap-10 bg-white p-4"
	>
		<div class="landing-title">
			<h1 class="font-semibold text-[#001122] text-4xl text-center">
				Sulvner
			</h1>
		</div>

		<div
			class="relative w-full max-w-md aspect-[16/9] overflow-hidden rounded-3xl"
		>
			<img
				src="../assets/images/landing.jpeg"
				alt="Landing Image"
				class="w-full h-full object-cover"
			/>
		</div>

		<div
			class="relative w-fit max-w-1/2 overflow-hidden px-8 flex flex-col gap-5 text-[#888888] justify-center items-center"
		>
			<p class="text-center item-stretch text-xl">
				Go from design to site with Framer, the web builder for creative
				pros.
			</p>
			<button
				class=" bg-slate-900 p-4 rounded-xl text-[14px] text-center w-fit justify-self-center"
			>
				Watch Now
			</button>
		</div>

		<!-- <div class="relative flex flex-row px-8 gap-5 mt-20 my-swiper">
			<Swiper
				v-if="animeList.length"
				class="swiper"
				:modules="modules"
				:space-between="10"
                :slides-per-view="1"
				:effect="'fade'"
                :lazy="true"
				:navigation="false"
			>
				<SwiperSlide
					class="slide"
					v-for="anime in animeList"
					:key="anime.id"
				>
					<div class="relative w-max max-w-lg h-max max-h-full rounded-3xl">
						<img
							:src="anime.image"
							alt="Anime Image"
							class="w-max h-full aspect-video object-cover"
						/>
					</div>
				</SwiperSlide>
			</Swiper>
		</div> -->
	</div>
</template>

<script>
import { useAnimeStore } from "@/store/animeStore";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, EffectFade } from "swiper/modules";

export default {
	name: "LandingPage",
	components: {
		Swiper,
		SwiperSlide,
	},
	data() {
		return {
			swiper: null,
			modules: [Pagination, Navigation, EffectFade],
		};
	},
	computed: {
		animeStore() {
			return useAnimeStore();
		},
		animeList() {
			return this.animeStore.topAnime?.results || [];
		},
	},
	async created() {
		await this.loadAnimeList();
	},
	methods: {
		async loadAnimeList() {
			await this.animeStore.fetchTopAnime();
		},
		onSwiper(swiper) {
			this.swiper = swiper;
		},
	},
	watch: {
		animeList: {
			handler() {
				this.$nextTick(() => {
					if (this.swiper) {
						this.swiper.update();
					}
				});
			},
			deep: true,
		},
	},
};
</script>

<style scoped>
.my-swiper {
	width: 100vw;
	height: 360px;
}

.swiper-slide {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
