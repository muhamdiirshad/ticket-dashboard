import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/ticket';
import * as projectApi from '../../api/project';

export const loadProject = createAsyncThunk('tickets/loadProject', async (projectId: string) => {
  const res = await projectApi.getProject(projectId);
  return res.data.project;
});

export const createTicket = createAsyncThunk('tickets/create', async (payload: { projectId: string; title: string; description?: string }) => {
  const res = await api.createTicket(payload);
  return res.data.ticket;
});

export const editTicket = createAsyncThunk('tickets/edit', async ({ id, update }: { id: string; update: any }) => {
  const res = await api.updateTicket(id, update);
  return res.data.ticket;
});

const slice = createSlice({
  name: 'tickets',
  initialState: { project: null as any, loading: false },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(loadProject.fulfilled, (s, a) => { s.project = a.payload; });
    b.addCase(createTicket.fulfilled, (s, a) => { s.project.tickets.push(a.payload); });
    b.addCase(editTicket.fulfilled, (s, a) => {
      const idx = s.project.tickets.findIndex((t: any) => t._id === a.payload._id);
      if (idx >= 0) s.project.tickets[idx] = a.payload;
    });
  }
});

export default slice.reducer;
