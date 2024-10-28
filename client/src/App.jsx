import { useState } from 'react'
import {createBrowserRouter,RouterProvider,Route,Link, createRoutesFromElements,} from "react-router-dom";
import './App.css'
// import { useAuth0 } from '@auth0/auth0-react';
// import Home from './Home';
import {Dashboard, Courses, Calendar, Resources, Retro, 
SideNav, HeadNav} from './component/dashboard/Dashboard';
import Layout from './component/Layout';
import CreateModule from './component/dashboard/CreateModule';
import DetailPage from './component/dashboard/DetailPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Dashboard />}>
        <Route path='/:id' element={<DetailPage />}/>
      </Route>
        
      <Route path="/courses" element={<Courses />}>
        {/* <Route path='/:id' element={}/> */}
      </Route>
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/retro" element={<Retro />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/createmodule" element={<CreateModule />} />
    </Route>
  )
);


function App() {
  

  return (
    
      <RouterProvider router={router} />

  
  );
}

export default App
