
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchModules = createAsyncThunk('modules/fetchModules', async (courseId) => {
  const response = await axios.get(`/api/courses/${courseId}/modules`);
  return response.data;
});

 
const modulesSlice = createSlice({
  name: 'modules',
  initialState: {
    modules: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModules.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.modules = action.payload;
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
  },
});



export default modulesSlice.reducer;
