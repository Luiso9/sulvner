import api from './api';

/**
 * Fetch a list of recently added anime.
 * @param {number} page - Page number.
 * @param {number} type - Anime type (e.g., 1 for episodes).
 * @returns {Promise<Object>} - Anime data.
 */
export const fetchRecentAnime = async (page = 1, type = 1) => {
  try {
    const response = await api.get('/gogoanime/recent-episodes', {
      params: { page, type },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recent anime:', error);
    throw error;
  }
};

export const getTopAnime = async (page = 1) => {
  try {
    const response = await api.get('/gogoanime/top-airing', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recent anime:', error);
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
    const response = await api.get(`/gogoanime/${query}?page=${page}`, {
      params: { query, page },
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
    const response = await api.get(`/gogoanime/info/${id}`);
    // console.log('API Response:', response.data);
    // Debug.assert
    return response.data;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    throw error;
  }
};

/**
 * Fetch the streaming link for a specific episode and server.
 *
 * @param {string} episodeId - The ID of the episode.
 * @param {string} serverName - The server to fetch the link from (e.g., "gogocdn", "streamsb", "vidstreaming"). default == gogocdn
 * @returns {Promise<Object>} - The streaming link data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchStreamingLink = async (episodeId, serverName = "gogocdn") => {
  const validServers = ["gogocdn", "streamsb", "vidstreaming"];
  if (!validServers.includes(serverName)) {
    throw new Error(`Invalid server: ${serverName}. Valid servers are ${validServers.join(", ")}.`);
  }

  try {
    const response = await api.get(`/gogoanime/watch/${episodeId}`,{
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching streaming link:", error);
    throw error;
  }
};