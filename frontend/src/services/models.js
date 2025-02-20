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

