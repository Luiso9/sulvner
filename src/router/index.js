// File: src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Import pages
import HomePage from '@/pages/HomePage.vue';
import WatchPage from '@/pages/WatchPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import AnimeDetailsPage from '@/pages/AnimeDetailsPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage, // Landing page
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/pages/SearchPageWrapper.vue'), // Search results page
  },
  {
    path: '/watch/:id',
    name: 'Watch',
    component: WatchPage, // Watch anime page
    props: true, // Pass route params as props
  },
  {
    path: '/info/:id',
    name: 'AnimeDetails',
    component: AnimeDetailsPage,
    props: true, // Pass `id` as a prop to the component
},

  {
    path: '/:catchAll(.*)', // Handle unmatched routes
    name: 'NotFound',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;
