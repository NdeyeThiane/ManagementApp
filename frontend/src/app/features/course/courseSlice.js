import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axios.get('http://localhost:3080/courses');
  return response.data;
});


export const addCourse = createAsyncThunk('courses/addCourse', async (courseData) => {
  const response = await axios.post('http://localhost:3080/courses', {
      coursename: courseData.coursename,
      description: courseData.description
  });
  return response.data;
});

export const updateCourse = createAsyncThunk('courses/updateCourse', async ({ courseid, updatedData }) => {
  const response = await axios.put(`http://localhost:3080/courses/${courseid}`, updatedData);
  return response.data;
});


export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseid) => {
  await axios.delete(`http://localhost:3080/courses/${courseid}`);
  return courseid;
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    status: 'idle', 
    error: null,
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
   
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })

      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex((course) => course.courseid === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })

      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((course) => course.courseid !== action.payload);
      });
  },
});



export default coursesSlice.reducer;
