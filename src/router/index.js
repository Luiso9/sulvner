import { createRouter, createWebHistory } from 'vue-router';

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
    component: () => import('@/components/Search/SearchPageWrapper.vue'), // Search results page
    props: (route) => ({ query: route.query.q})
  },
  {
    path: '/watch/:id',
    name: 'Watch',
    component: () => import('@/pages/WatchPage.vue'), // Watch page
    props: true, // Pass route parameters as props
  },
  {
    path: '/info/:id',
    name: 'Info',
    component: () => import('@/pages/AnimeDetailsPage.vue'), // Ensure this path is correct
    props: true,
  },

  {
    path: '/:catchAll(.*)', // Handle unmatched routes return 404
    name: 'NotFound',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
