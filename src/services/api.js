import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://192.168.6.25:3000/anime', // Dynamic base URL
  timeout: 10000, 
});

export default api;