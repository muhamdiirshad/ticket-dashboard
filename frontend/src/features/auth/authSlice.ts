import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/auth';

export const sendOtp = createAsyncThunk('auth/sendOtp', async (email: string) => {
  await api.requestOtp(email);
  return email;
});

export const confirmOtp = createAsyncThunk('auth/confirmOtp', async ({ email, otp }: { email: string; otp: string }) => {
  const res = await api.verifyOtp(email, otp);
  const token = res.data.token;
  localStorage.setItem('token', token);
  return { token, email };
});

const slice = createSlice({
  name: 'auth',
  initialState: { email: '', token: localStorage.getItem('token') || null, isVerified: false, loading: false, error: null } as any,
  reducers: {
    logout: (state) => {
      state.email = '';
      state.token = null;
      state.isVerified = false;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sendOtp.fulfilled, (state, action) => {
      state.email = action.payload;
    });
    builder.addCase(confirmOtp.fulfilled, (state) => {
      state.isVerified = true;
      state.token = localStorage.getItem('token');
    });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;
