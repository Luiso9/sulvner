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

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchAnimeDetails } from '@/services/animeServices';

const route = useRoute();
const animeDetails = ref(null);
const error = ref(null);

const loadAnimeDetails = async () => {
  try {
    const id = route.params.id;
    if (!id) throw new Error('Anime ID is undefined');
    animeDetails.value = await fetchAnimeDetails(id);
  } catch (err) {
    error.value = err;
  }
};

onMounted(loadAnimeDetails);
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
