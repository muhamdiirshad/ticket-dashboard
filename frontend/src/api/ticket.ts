import { api } from './api';
export const createTicket = (payload: any) => api.post('/tickets', payload);
export const updateTicket = (id: string, data: any) => api.put(`/tickets/${id}`, data);
