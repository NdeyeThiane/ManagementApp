// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../app/features/course/courseSlice';
import { fetchUsers } from '../app/features/users/usersSlice';
import { fetchModules } from '../app/features/modules/modulesSlice';
import { fetchAssignments } from '../app/features/assignments/assignmentsSlice';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const users = useSelector((state) => state.users);
  const modules = useSelector((state) => state.modules);
  const assignments = useSelector((state) => state.assignments);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchUsers());
    dispatch(fetchModules());
    dispatch(fetchAssignments());
  }, [dispatch]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="p-4 bg-sky-400 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Courses</h2>
          <p className="text-2xl font-bold"></p>
          <Link to="/courses" className="text-white hover:underline">View Courses</Link>
        </div>

        {/* <div className="p-4 bg-green-100 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Modules</h2>
          <p className="text-2xl font-bold"></p>
          <Link to="/modules" className="text-black hover:underline">View Modules</Link>
        </div> */}

        {/* <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Assignments</h2>
          <p className="text-2xl font-bold"></p>
          <Link to="/assignments" className="text-black hover:underline">View Assignments</Link>
        </div> */}

        <div className="p-4 bg-orange-400 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-2xl font-bold"></p>
          <Link to="/users" className="text-white hover:underline">View Users</Link>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Link to="/courses/new" className="p-4 bg-sky-400 rounded-lg shadow-md text-white font-medium hover:bg-blue-600">
            Create New Course
          </Link>
          {/* <Link to="/modules/new" className="p-4 bg-green-200 rounded-lg shadow-md text-black font-medium hover:bg-green-300">
            Create New Module
          </Link> */}
          {/* <Link to="/assignments/new" className="p-4 bg-yellow-200 rounded-lg shadow-md text-black font-medium hover:bg-yellow-300">
            Create New Assignment
          </Link> */}
          <Link to="/users/new" className="p-4 bg-orange-400 rounded-lg shadow-md text-white font-medium hover:bg-orange-600">
            Add New User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
