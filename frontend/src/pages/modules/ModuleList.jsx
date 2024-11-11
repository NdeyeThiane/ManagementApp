import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModules, deleteModule } from '../../app/features/modules/modulesSlice';
import { Link, useParams } from 'react-router-dom';

const ModuleList = () => {
  const dispatch = useDispatch();
  const { courseid } = useParams(); 
  const modules = useSelector((state) => state.modules.modules);
  const loading = useSelector((state) => state.modules.loading);
  const error = useSelector((state) => state.modules.error);

  useEffect(() => {
    dispatch(fetchModules(courseid));
  }, [dispatch, courseid]);

  const handleDelete = (moduleId) => {
    dispatch(deleteModule(moduleId));
  };

  if (loading === 'loading') return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Modules for Course {courseid}</h1>
      <Link to={`/courses/${courseid}/modules/new`} className="btn btn-primary">
        Add Module
      </Link>
      <ul>
        {modules.map((module) => (
          <li key={module.moduleid} className="module-item">
            <h2>{module.modulename}</h2>
            <Link to={`/modules/${module.moduleid}/edit`} className="btn btn-secondary">
              Edit
            </Link>
            <button onClick={() => handleDelete(module.moduleid)} className="btn btn-danger">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModuleList;
