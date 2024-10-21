import { useState } from 'react'
import './App.css'

import Layout from './component/Layout'

function App() {
  const [role, setRole] = useState('admin');

  const toggleRole = () => {
    setRole((prevRole) => (prevRole === 'admin' ? 'student' : 'admin'));
  };

  return (
    <div className='container'>
      <div className='leftsidebar'>
        <Layout />
      </div>
      <div className='content'>

      </div>
      
      {/* <button onClick={toggleRole}>Toggle Role</button>
      {role === 'admin' ? <AdminDashboard /> : <StudentDashboard />} */}

    </div>

    
  );
}

export default App
