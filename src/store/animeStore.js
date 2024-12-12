// src/store/animeStore.js
import { defineStore } from 'pinia';
import animeService from '@/services/animeServices';

export const useAnimeStore = defineStore('anime', {
    state: () => ({
        recentAnime: { results: [], currentPage: 1, totalPages: 0 },
        topAnime: { results: [], currentPage: 1, totalPages: 0 },
        popularAnime: { results: [], currentPage: 1, totalPages: 0 },
        animeDetails: null,
        streamingLink: null,
        error: null,
        loading: false,
    }),

    actions: {
        async fetchRecentAnime(page = 1) {
            this.loading = true;
            try {
                const data = await animeService.fetchRecentAnime(page);
                this.recentAnime = data;
            } catch (error) {
                this.error = 'Failed to fetch recent anime.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        async fetchTopAnime(page = 1) {
            this.loading = true;
            try {
                const data = await animeService.getTopAnime(page);
                this.topAnime = data;
            } catch (error) {
                this.error = 'Failed to fetch top-airing anime.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        async fetchPopularAnime(page = 1) {
            this.loading = true;
            try {
                const data = await animeService.getMostPopularAnime(page);
                this.popularAnime = data;
            } catch (error) {
                this.error = 'Failed to fetch most popular anime.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        async fetchAnimeDetails(id) {
            this.loading = true;
            try {
                const data = await animeService.fetchAnimeDetails(id);
                this.animeDetails = data;
            } catch (error) {
                this.error = 'Failed to fetch anime details.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        async fetchStreamingLink(episodeId, serverName = 'gogocdn') {
            this.loading = true;
            try {
                const data = await animeService.fetchStreamingLink(episodeId, serverName);
                this.streamingLink = data;
            } catch (error) {
                this.error = 'Failed to fetch streaming link.';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },

        resetError() {
            this.error = null;
        },
    },
});
