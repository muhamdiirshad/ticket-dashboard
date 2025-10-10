import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/project';

export const loadProjects = createAsyncThunk('projects/load', async () => {
  const res = await api.getProjects();
  return res.data.projects;
});

export const addProject = createAsyncThunk('projects/add', async (payload: { name: string; description?: string }) => {
  const res = await api.createProject(payload);
  return res.data.project;
});

const slice = createSlice({
  name: 'projects',
  initialState: { items: [], loading: false } as any,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(loadProjects.pending, (s) => { s.loading = true; });
    b.addCase(loadProjects.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; });
    b.addCase(loadProjects.rejected, (s) => { s.loading = false; });
    b.addCase(addProject.fulfilled, (s, a) => s.items.push(a.payload));
  }
});

export default slice.reducer;
