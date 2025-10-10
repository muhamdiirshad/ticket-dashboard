import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'notifications',
  initialState: { list: [] as any[] },
  reducers: {
    pushNotification: (s, a) => { s.list.unshift(a.payload); },
    clearNotifications: (s) => { s.list = []; }
  }
});

export const { pushNotification, clearNotifications } = slice.actions;
export default slice.reducer;
