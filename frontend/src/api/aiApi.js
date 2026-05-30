import api from './axios';

export const generateDescription = (payload) =>
  api.post('/api/ai/generate-description', payload);
