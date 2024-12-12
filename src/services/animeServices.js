import api from './api';

const animeService = {
  async fetchRecentAnime(page = 1) {
    const response = await api.get('/zoro/recent-episodes', { params: { page } });
    return {
      results: response.data.results || [],
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    };
  },

  async getTopAnime(page = 1) {
    const response = await api.get('/zoro/top-airing', { params: { page } });
    return {
      results: response.data.results || [],
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    };
  },

  async getMostPopularAnime(page = 1) {
    const response = await api.get('/zoro/most-popular', { params: { page } });
    return {
      results: response.data.results || [],
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    };
  },

  async fetchAnimeDetails(id) {
    const response = await api.get('/zoro/info', { params: { id } });
    return response.data;
  },

  async fetchStreamingLink(episodeId, serverName = 'gogocdn') {
    const response = await api.get('/zoro/watch', { params: { episodeId, server: serverName } });
    return response.data;
  },

  async searchAnime(query, page = 1) {
    const response = await api.get('/zoro/search', { params: { query, page } });
    return {
      results: response.data.results || [],
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    };
  }
};

export const searchAnime = async (query, page = 1) => {
  try {
    const response = await api.get(`/zoro/${query}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};

export default animeService;
