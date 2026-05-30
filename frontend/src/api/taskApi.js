import api from './axios';

export const getTasks = (status) =>
  api.get('/api/tasks', { params: status ? { status } : {} });
export const createTask = (payload) => api.post('/api/tasks', payload);
export const updateTask = (id, payload) => api.put(`/api/tasks/${id}`, payload);
export const deleteTask = (id) => api.delete(`/api/tasks/${id}`);
