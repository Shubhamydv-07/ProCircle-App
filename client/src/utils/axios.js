// api.js - Updated with environment variables
import axios from 'axios';

// Get API base URL from environment variables
const getApiBaseUrl = () => {
  // For React apps (Create React App)
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }
  
  // For Vue apps
//   if (process.env.VUE_APP_API_BASE_URL) {
//     return process.env.VUE_APP_API_BASE_URL;
//   }
  
//   // For Vite-based apps (Vue 3, React with Vite)
//   if (import.meta.env.VITE_API_BASE_URL) {
//     return import.meta.env.VITE_API_BASE_URL;
//   }
  
  // Fallback for development (optional)
  console.warn('No API base URL found in environment variables, using fallback');
  return 'No API is working ';
};

// Create axios instance with environment-based configuration
const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || process.env.VUE_APP_API_TIMEOUT || import.meta.env.VITE_API_TIMEOUT) || 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;