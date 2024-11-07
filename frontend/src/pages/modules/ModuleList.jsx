// src/pages/Modules/ModuleList.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchModules } from '../../app/features/modules/modulesSlice';

const ModuleList = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const modules = useSelector((state) => state.modules.items);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchModules(courseId));
    }
  }, [dispatch, courseId]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Modules</h1>
      <Link to={`/courses/${courseId}/modules/new`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Create New Module
      </Link>
      <ul className="mt-4 space-y-3">
        {modules.map((module) => (
          <li key={module.id} className="p-4 bg-white rounded shadow-md flex justify-between items-center">
            <div>
              <Link to={`/courses/${courseId}/modules/${module.id}`} className="text-indigo-600 hover:underline">
                {module.title}
              </Link>
              <p className="text-gray-500">{module.description}</p>
            </div>
            <div>
              <Link to={`/courses/${courseId}/modules/${module.id}/edit`} className="text-blue-500 mr-4 hover:underline">Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModuleList;
