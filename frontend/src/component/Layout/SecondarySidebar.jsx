import React from 'react';
import { FaFileAlt, FaComments, FaScroll } from "react-icons/fa";

const SecondarySidebar = () => {
  return (
    <div className="w-40 bg-pink-300 p-4 pt-10 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">course</h3>
      <ul>
        <li className='p-2'><a href="/courses/1/modules">
        <FaScroll className='size-8 m-2' /> 
        Modules</a></li>
        <li className='p-2'><a href="/courses/1/assignments">
        <FaFileAlt className='size-8 m-2'/>
        Assignments</a></li>
        <li className='p-2'><a href="/courses/1/discussions">
        <FaComments className='size-8 m-2' />
        Discussions</a></li>
      </ul>
    </div>
  );
};

export default SecondarySidebar;



