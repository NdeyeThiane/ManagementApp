import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';


//initialState
const  initialState  = {
    loading: false,
    error: '',
    courses: [],
}


export const getCourses = createAsyncThunk('module/courses', async() =>{
    const response = await fetch("http://localhost:3000/courses")
    return response.json();
    
})

export const courseSlice = createSlice(
    {
        name:'course',
        initialState,
        extraReducers: (builder) =>{
            builder.addCase(getCourses.pending, (state, action) =>{
                state.loading = true;
            }),
            builder.addCase(getCourses.fulfilled, (state, action) =>{
                state.loading = false;
                state.courses = action.payload;
            }),
            builder.addCase(getCourses.rejected, (state, action) =>{
                state.error ='error';
            })
        }
           

            
        
    }
)


// export const getTasks = createAsyncThunk('course/tasks', async() =>{
//     const response = await fetch("http://localhost:3000/")
//     return response.json();
    
// })

// export const getTasks = createSlice(
//     {
//         name:'tasks',
//         extraReducers: (builder) =>{
//             builder.addCase(getCourses.pending, (state, action) =>{
//                 state.loading = true;
//             }),
//             builder.addCase(getCourses.fulfilled, (state, action) =>{
//                 state.loading = false;
//                 state.courses = action.payload;
//             }),
//             builder.addCase(getCourses.rejected, (state, action) =>{
//                 state.error = true;
//             })
//         }
           

            
        
//     }
// )



// deleteCourse:(state, action)=>{

// },

// editCourse:(state, action)=>{

// },
// getCourse: (state, action)=>{



export default courseSlice.reducer;