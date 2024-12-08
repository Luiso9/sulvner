// File: src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Import pages
import HomePage from '@/pages/HomePage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

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
    component: () => import('@/pages/WatchPage.vue'),
    props: true, // Pass route parameters as props
  },
  {
    path: '/info/:id',
    name: 'Info',
    component: () => import('@/pages/AnimeDetailsPage.vue'), // Ensure this path is correct
    props: true,
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
