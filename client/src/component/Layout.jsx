import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard';
import Courses from './dashboard/Courses';
import Calendar from './dashboard/Calendar';
import Resources from './dashboard/Resources';
import Retro from './dashboard/Retro';
import '../App.css'

const Layout = () => {
  return (
    <>
      
       <header>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/courses">Course</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
          <li>
            <Link to="/retro">Retro</Link>
          </li>
          <li>
            <Link to="/resources">Resources</Link>
          </li>
        </ul>
      </header>
          
          <Routes>
            <Route path="/dashboard" elemenent={<Dashboard />} />
            <Route path="/courses" elemenent={<Courses />} />
            <Route path="/calendar" elemenent={<Calendar />} />
            <Route path="/retro" elemenent={<Retro />} />
            <Route path="/resources" elemenent={<Resources />} />
          </Routes>

    </>
  );
}

export default Layout