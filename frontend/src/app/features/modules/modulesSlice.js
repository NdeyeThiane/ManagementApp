import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchModules = createAsyncThunk('modules/fetchModules', async (courseid) => {
  const response = await axios.get(`/api/courses/${courseid}/modules`);
  return response.data;
});


export const fetchModuleById = createAsyncThunk('modules/fetchModuleById', async (moduleid) => {
  const response = await axios.get(`/api/modules/${moduleid}`);
  return response.data;
});


export const addModule = createAsyncThunk('modules/addModule', async ({ courseid, modulename }) => {
  const response = await axios.post(`/api/courses/${courseid}/modules`, { modulename });
  return response.data;
});


export const updateModule = createAsyncThunk('modules/updateModule', async ({ moduleid, modulename }) => {
  const response = await axios.put(`/api/modules/${moduleid}`, { modulename });
  return response.data;
});


export const deleteModule = createAsyncThunk('modules/deleteModule', async (moduleid) => {
  await axios.delete(`/api/modules/${moduleid}`);
  return moduleId;
});

// Slice
const modulesSlice = createSlice({
  name: 'modules',
  initialState: {
    modules: [],
    selectedModule: null, 
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedModule: (state) => {
      state.selectedModule = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all modules for a course
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

      // Fetch a single module by ID
      .addCase(fetchModuleById.fulfilled, (state, action) => {
        state.selectedModule = action.payload;
      })

      // Add a new module
      .addCase(addModule.fulfilled, (state, action) => {
        state.modules.push(action.payload);
      })

      // Update a module
      .addCase(updateModule.fulfilled, (state, action) => {
        const index = state.modules.findIndex((module) => module.moduleid === action.payload.moduleid);
        if (index !== -1) {
          state.modules[index] = action.payload;
        }
        state.selectedModule = action.payload;
      })

      // Delete a module
      .addCase(deleteModule.fulfilled, (state, action) => {
        state.modules = state.modules.filter((module) => module.moduleid !== action.payload);
      });
  },
});

export const { clearSelectedModule } = modulesSlice.actions;
export default modulesSlice.reducer;
