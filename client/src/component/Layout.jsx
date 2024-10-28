import React from 'react'
import { NavLink, Outlet} from 'react-router-dom'

import '../App.css'

const Layout = () => {
  return (
    <div className="w-screen h-screen m-2 bg-white grid sm:grid-cols-8 sm:grid-rows-10 gap-2">
      <div className="border-2 sm:col-span-8 sm:row-span-1">

      </div>
      <div className="bg-blue-400 sm:col-span-1 sm:row-span-12" >
      <nav className="grid">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/courses">Modules</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
        <NavLink to="/retro">Retro</NavLink>
        <NavLink to="/resources">Resources</NavLink>
        <NavLink to='/createmodule'>Create Module</NavLink>
        <NavLink to='/courses/:id'></NavLink>
      </nav>
      </div>
      
      <main className="border-2 sm:col-span-7 sm:row-span-12">
        <Outlet />
      </main> 
      
   </div>
    
  );
}

export default Layout