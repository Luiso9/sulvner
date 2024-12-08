import api from './api';

/**
 * Fetch a list of recently added anime.
 * @param {number} page - Page number.
 * @returns {Promise<Object>} - Anime data.
 */
export const fetchRecentAnime = async (page = 1) => {
  try {
    const response = await api.get('/zoro/recent-episodes', {
      params: { page },
    });
    return {
      results: response.data.results || [],
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error('Error fetching recent anime:', error);
    throw error;
  }
};


/**
 * Fetch a list of top-airing anime.
 * @param {number} page - Page number.
 * @returns {Promise<Object>} - Anime data.
 */
export const getTopAnime = async (page = 1) => {
  try {
    const response = await api.get('/zoro/top-airing', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top-airing anime:', error);
    throw error;
  }
};

/**
 * Fetch a list of the most popular anime.
 * @param {number} page - Page number.
 * @returns {Promise<Object>} - Anime data.
 */
export const getMostPopularAnime = async (page = 1) => {
  try {
    const response = await api.get('/zoro/most-popular', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching most popular anime:', error);
    throw error;
  }
};

/**
 * Search for anime by keyword.
 * @param {string} query - Search query.
 * @param {number} page - Page number.
 * @returns {Promise<Object>} - Search results.
 */
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

/**
 * Fetch details for a specific anime.
 * @param {string} id - Anime ID.
 * @returns {Promise<Object>} - Anime details.
 */
export const fetchAnimeDetails = async (id) => {
  try {
    // Construct the URL with the correct API path and query parameters
    const response = await api.get('/zoro/info', {
      params: { id },
    });
    return response.data; // Return the anime details
  } catch (error) {
    console.error('Error fetching anime details:', error);
    throw error;
  }
};

/**
 * Fetch the streaming link for a specific episode and server.
 * @param {string} episodeId - The ID of the episode (e.g., 'spy-x-family-17977$episode$89506$both').
 * @param {string} [serverName="gogocdn"] - The server to fetch the link from (e.g., "gogocdn", "vidcloud").
 * @returns {Promise<Object>} - The streaming link data.
 */
export const fetchStreamingLink = async (episodeId, serverName = "gogocdn") => {
  try {
    const response = await api.get('/zoro/watch', {
      params: { episodeId, server: serverName },
    });
    return response.data; // The response contains streaming sources and other details
  } catch (error) {
    console.error('Error fetching streaming link:', error);
    throw new Error('Failed to fetch streaming link.');
  }
};

/**
 * Fetch detailed anime information from the `/info` endpoint.
 * @param {string} id - The anime ID (e.g., "jujutsu-kaisen-2nd-season-18413").
 * @returns {Promise<Object>} - Anime details including episodes.
 */
export const fetchAnimeDetailsWithEpisodes = async (id) => {
  try {
    const response = await api.get(`/zoro/info`, {
      params: { id },
    });
    return response.data; // Contains detailed anime info, including episodes
  } catch (error) {
    console.error('Error fetching detailed anime information:', error);
    throw new Error('Failed to fetch detailed anime information.');
  }
};

/**
 * Find an episode by its number from the anime details.
 * @param {Object[]} episodes - The list of episodes from the anime info.
 * @param {number} number - The episode number to find.
 * @returns {Object|null} - The matched episode object, or null if not found.
 */
export const findEpisodeByNumber = (episodes, number) => {
  return episodes.find((episode) => episode.number === number) || null;
};