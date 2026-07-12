import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Backend Server Port 3000
});

// Request Interceptor for automatic Bearer Token inclusion
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;