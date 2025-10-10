import { api } from './api';
export const enableSuper = (password: string) => api.post('/admin/enable-super', { password });
export const disableSuper = () => api.post('/admin/disable-super', {});
