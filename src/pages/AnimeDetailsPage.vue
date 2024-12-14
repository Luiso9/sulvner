<template>
  <div>
    <div v-if="anime">
      <h1>{{ anime.title }}</h1>
      <p>Other Name: {{ anime.japaneseTitle || "N/A" }}</p>
      <p>Type: {{ anime.type }}</p>
      <p>Episodes: {{ anime.totalEpisodes || "No episodes available" }}</p>
      <img :src="anime.image" :alt="anime.title" />
      <p><a :href="anime.url" target="_blank">Visit Official Page</a></p>
      <router-link to='/'>Go Home</router-link>
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
import { useAnimeStore } from '@/store/animeStore';
import { computed } from 'vue';

export default {
  setup() {
    const animeStore = useAnimeStore();

    const anime = computed(() => animeStore.animeDetails);
    const loading = computed(() => animeStore.loading);

    return { anime, loading };
  },
};
</script>
