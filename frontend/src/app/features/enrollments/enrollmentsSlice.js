

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../routes';


const fetchEnrollments = createAsyncThunk('enrollments/fetchEnrollments', async (courseId) => {
  const response = await axios.get(`/api/courses/${courseId}/enrollments`);
  return response.data;
});

const enrollUser = createAsyncThunk('enrollments/enrollUser', async ({ courseId, userId }) => {
  const response = await axios.post(`/api/courses/${courseId}/enrollments`, { userId });
  return response.data;
});

const unenrollUser = createAsyncThunk('enrollments/unenrollUser', async ({ courseId, userId }) => {
  await axios.delete(`/api/courses/${courseId}/enrollments/${userId}`);
  return userId;
});

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState: {
    enrollments: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.enrollments = action.payload;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(enrollUser.fulfilled, (state, action) => {
        state.enrollments.push(action.payload);
      })
      .addCase(unenrollUser.fulfilled, (state, action) => {
        state.enrollments = state.enrollments.filter((enrollment) => enrollment.userid !== action.payload);
      });
  },
});

export { fetchEnrollments, enrollUser, unenrollUser }
export default enrollmentsSlice.reducer;