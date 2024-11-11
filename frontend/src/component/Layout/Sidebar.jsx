import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaLaptopHouse, FaBookReader, FaAddressBook, FaFileAlt  } from "react-icons/fa";


const Sidebar = () => {
 
  const role = localStorage.getItem('role');

  return (
    <div className="w-40 bg-blue-300 text-white flex flex-col space-y-6 p-6 rounded-lg mr-2">
      <h2 className="text-2xl font-semibold">Camptonica LMS</h2>
      <nav className="flex-1 content-between">
        <NavLink to="/" className="block m-8   rounded hover:bg-gray-700">
          <FaLaptopHouse  className='size-12'/>
          Dashboard
        </NavLink>
        <NavLink to="/courses" className="block m-8 rounded hover:bg-gray-700">
        <FaBookReader className='size-12' />
          Courses
        </NavLink>
        
       
        {role === 'admin' && (
          <NavLink to="/users" className="block m-8 rounded hover:bg-gray-700">
            <FaAddressBook className='size-12' />
            Users
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;

