import { api } from './api';
export const getProjects = () => api.get('/projects');
export const createProject = (payload: { name: string; description?: string }) => api.post('/projects', payload);
export const getProject = (id: string) => api.get(`/projects/${id}`);
