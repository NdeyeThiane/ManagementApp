import { FaUserCircle } from "react-icons/fa";
const TopNavbar = () => (
    <header className="flex items-center justify-between bg-white shadow px-6 py-4">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600">
        <FaUserCircle className="size-14" />
        </button>
      </div>
    </header>
  );
  
  export default TopNavbar;
  