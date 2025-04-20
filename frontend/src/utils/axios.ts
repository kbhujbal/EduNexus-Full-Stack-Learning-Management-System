import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8083/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
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

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        store.dispatch(logout());
        window.location.href = '/login';
      }

      // Handle 403 Forbidden
      if (error.response.status === 403) {
        console.error('Access denied');
      }

      // Handle 404 Not Found
      if (error.response.status === 404) {
        console.error('Resource not found');
      }

      // Handle 500 Internal Server Error
      if (error.response.status === 500) {
        console.error('Server error');
      }
    } else if (error.request) {
      // Handle network errors
      console.error('Network error');
    } else {
      // Handle other errors
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance; 