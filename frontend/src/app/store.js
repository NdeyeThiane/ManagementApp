import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './features/course/courseSlice';
import usersReducer from './features/users/usersSlice';
import modulesReducer from './features/modules/modulesSlice';
import assignmentsReducer from './features/assignments/assignmentsSlice';
import enrollmentsReducer from './features/enrollments/enrollmentsSlice';

const store = configureStore({
    reducer:{
        users: usersReducer,
    
    },
})


export default store