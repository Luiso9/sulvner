import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'https://gogoanime-and-hianime-proxy.vercel.app/hls-proxy?url=http://147.185.221.22:35933/anime', // Dynamic base URL
  timeout: 10000, 
});

export default api;