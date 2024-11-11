import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './component/Layout/Layout';
import CourseList from './pages/courses/CourseList';
import CourseDetail from './pages/courses/CourseDetail';
import CourseForm from './pages/courses/CourseForm';
import UserList from './pages/users/UserList';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';
import Login from './pages/Login';
import ProtectedRoute from './pages/PrivateRoute';
import ModulesList from './pages/modules/ModuleList'; 
import ModuleForm from './pages/modules/ModuleForm'; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="courses" element={<CourseList />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="courses/new" element={<ProtectedRoute><CourseForm /></ProtectedRoute>} />
          
          
          <Route path="courses/:courseId/modules" element={<ProtectedRoute><ModulesList /></ProtectedRoute>} />
          <Route path="courses/:courseId/modules/new" element={<ProtectedRoute><ModuleForm /></ProtectedRoute>} />
          <Route path="modules/:moduleId/edit" element={<ProtectedRoute><ModuleForm /></ProtectedRoute>} />

          <Route path="users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
        </Route>

        <Route path="register" element={<Registration />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
