// axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 5000, // 타임아웃 설정 (ms)
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
