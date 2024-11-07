// features/assignments/assignmentsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for assignments CRUD operations
const fetchAssignments = createAsyncThunk('assignments/fetchAssignments', async (moduleId) => {
  const response = await axios.get(`/api/modules/${moduleId}/assignments`);
  return response.data;
});

const addAssignment = createAsyncThunk('assignments/addAssignment', async ({ moduleId, assignmentData }) => {
  const response = await axios.post(`/api/modules/${moduleId}/assignments`, assignmentData);
  return response.data;
});

const updateAssignment = createAsyncThunk('assignments/updateAssignment', async ({ assignmentId, updatedData }) => {
  const response = await axios.put(`/api/assignments/${assignmentId}`, updatedData);
  return response.data;
});

const deleteAssignment = createAsyncThunk('assignments/deleteAssignment', async (assignmentId) => {
  await axios.delete(`/api/assignments/${assignmentId}`);
  return assignmentId;
});

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState: {
    assignments: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assignments = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addAssignment.fulfilled, (state, action) => {
        state.assignments.push(action.payload);
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        const index = state.assignments.findIndex((assignment) => assignment.id === action.payload.id);
        if (index !== -1) {
          state.assignments[index] = action.payload;
        }
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.assignments = state.assignments.filter((assignment) => assignment.id !== action.payload);
      });
  },
});

export {fetchAssignments, addAssignment, updateAssignment, deleteAssignment}
export default assignmentsSlice.reducer;
