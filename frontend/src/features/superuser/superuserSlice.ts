import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/admin';

export const enableSuper = createAsyncThunk('super/enable', async (pwd: string) => {
  const res = await api.enableSuper(pwd);
  return res.data;
});
export const disableSuper = createAsyncThunk('super/disable', async () => {
  const res = await api.disableSuper();
  return res.data;
});

const slice = createSlice({
  name: 'super',
  initialState: { enabled: false, loading: false, error: null } as any,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(enableSuper.fulfilled, (s) => { s.enabled = true; });
    b.addCase(disableSuper.fulfilled, (s) => { s.enabled = false; });
  }
});

export default slice.reducer;
