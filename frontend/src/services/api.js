import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// src/services/auth.js
import api from './api';

export const authService = {
  async login(credentials) {
    const { data } = await api.post('/api/auth/login', credentials);
    return data;
  },

  async register(userData) {
    const { data } = await api.post('/api/auth/register', userData);
    return data;
  },

  async getCurrentUser() {
    const { data } = await api.get('/api/auth/me');
    return data;
  },

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};

// src/services/models.js
import api from './api';

export const modelService = {
  async getModels() {
    const { data } = await api.get('/api/models');
    return data;
  },

  async getModelById(id) {
    const { data } = await api.get(`/api/models/${id}`);
    return data;
  },

  async createModel(modelData) {
    const { data } = await api.post('/api/models', modelData);
    return data;
  },

  async trainModel(modelId, trainingData) {
    const { data } = await api.post(`/api/models/${modelId}/train`, trainingData);
    return data;
  },

  async getTrainingStatus(modelId) {
    const { data } = await api.get(`/api/models/${modelId}/training-status`);
    return data;
  }
};
Last edited just now
