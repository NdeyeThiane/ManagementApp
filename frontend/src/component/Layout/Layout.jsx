import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import SecondarySidebar from './SecondarySidebar';
import TopNavbar from './TopNavbar';

const Layout = () => {
  const location = useLocation();

  
  const showSecondarySidebar = location.pathname.includes('/courses/') || location.pathname.includes('/modules');

  return (
    <div className="flex h-screen">

    
      <Sidebar />

      {showSecondarySidebar && <SecondarySidebar />} 

      <div className={`flex-1 flex flex-col ${showSecondarySidebar ? 'pl-4' : ''}`}>
        <TopNavbar />

        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
