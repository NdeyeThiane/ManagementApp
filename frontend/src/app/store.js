import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './features/course/courseSlice';
import usersReducer from './features/users/usersSlice';
import modulesReducer from './features/modules/modulesSlice';
import assignmentsReducer from './features/assignments/assignmentsSlice';
import enrollmentsReducer from './features/enrollments/enrollmentsSlice';

const store = configureStore({
    reducer:{
        courses:coursesReducer,
        modules: modulesReducer,
        users: usersReducer,
        assignments: assignmentsReducer,
        enrollments: enrollmentsReducer,
    },
})


export default store