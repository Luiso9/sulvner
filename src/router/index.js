import { createRouter, createWebHistory } from 'vue-router';
import { useAnimeStore } from '@/store/animeStore'; 
import HomePage from '@/pages/HomePage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import LandingPage from '@/pages/LandingPage.vue';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/components/Search/SearchPageWrapper.vue'),
    props: (route) => ({ query: route.query.q }),
  },
  {
    path: '/watch/:id',
    name: 'Watch',
    component: () => import('@/pages/WatchPage.vue'),
    props: true,
    beforeEnter: async (to) => {
      const animeStore = useAnimeStore();
      try {
        await animeStore.fetchStreamingLink(to.params.id); 
      } catch (error) {
        console.error('Failed to fetch streaming link:', error);
        return { name: 'NotFound' }; // Redirect to 404 page on error
      }
    },
  },
  {
    path: '/info/:id',
    name: 'Info',
    component: () => import('@/pages/AnimeDetailsPage.vue'),
    props: true,
    beforeEnter: async (to) => {
      const animeStore = useAnimeStore();
      try {
        await animeStore.fetchAnimeDetails(to.params.id);
      } catch (error) {
        console.error('Failed to fetch anime details:', error);
        return { name: 'NotFound' }; // Redirect to 404 page on error
      }
    },
  },
  {
    path: '/:catchAll(.*)', // Handle unmatched routes and return 404
    name: 'NotFound',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
