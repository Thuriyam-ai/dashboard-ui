import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://thuriyam.wrkind.com:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0dXNlciIsInNjb3BlcyI6WyJtZSIsInVzZXJzIiwiYWRtaW4iXSwiZXhwIjoxNzU4ODcyNzExfQ.R_90bqCS7yw9qjFS0jzx1FcSca1POM8dQ2ATSmHOR_0';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;