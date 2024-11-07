import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
 
  const role = localStorage.getItem('role');

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col space-y-6 p-6">
      <h2 className="text-2xl font-semibold">Camptonica LMS</h2>
      <nav className="flex-1 space-y-2">
        <NavLink to="/" className="block py-2 px-4 rounded hover:bg-gray-700">
          Dashboard
        </NavLink>
        <NavLink to="/courses" className="block py-2 px-4 rounded hover:bg-gray-700">
          Courses
        </NavLink>
        
       
        {role === 'admin' && (
          <NavLink to="/users" className="block py-2 px-4 rounded hover:bg-gray-700">
            Users
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;

