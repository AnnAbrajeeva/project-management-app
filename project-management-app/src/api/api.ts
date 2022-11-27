import axios from 'axios';
import { removeFromLocal, getFromLocal } from 'utils/localStorage';

export const axiosClassic = axios.create({
  baseURL: 'https://final-task-backend-production-8c86.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = axios.create({
  baseURL: 'https://final-task-backend-production-8c86.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getFromLocal('token');
  console.log(token);
  if (!config.headers) config.headers = {};
  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    if ((error.response.status === 401 || error.response.status === 403) && error.config) {
      removeFromLocal('token');
      removeFromLocal('user');
    }
  }
);
