// src/pages/Modules/ModuleDetail.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchModules } from '../../app/features/modules/modulesSlice';

const ModuleDetail = () => {
  const { courseId, moduleId } = useParams();
  const dispatch = useDispatch();
  const module = useSelector((state) => state.modules.selectedModule);

  useEffect(() => {
    if (moduleId) {
      dispatch(fetchModule(moduleId));
    }
  }, [dispatch, moduleId]);

  if (!module) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">{module.title}</h1>
      <p className="text-gray-500 mt-2">{module.description}</p>
      <div className="mt-4">
        <Link to={`/courses/${courseId}/modules/${moduleId}/edit`} className="text-blue-500 hover:underline">Edit Module</Link>
      </div>
    </div>
  );
};

export default ModuleDetail;
