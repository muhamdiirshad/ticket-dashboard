import { api } from './api';
export const requestOtp = (email: string) => api.post('/auth/request-otp', { email });
export const verifyOtp = (email: string, otp: string) => api.post('/auth/verify-otp', { email, otp });
