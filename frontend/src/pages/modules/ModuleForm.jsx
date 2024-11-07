// src/pages/Modules/ModuleForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {fetchModules } from '../../app/features/modules/modulesSlice';

const ModuleForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();
  const isEditMode = !!moduleId;
  const module = useSelector((state) => state.modules.selectedModule);

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchModule(moduleId));
    }
  }, [dispatch, moduleId, isEditMode]);

  useEffect(() => {
    if (isEditMode && module) {
      setTitle(module.title);
      setDescription(module.description);
    }
  }, [isEditMode, module]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(updateModule({ moduleId, courseId, title, description }));
    } else {
      dispatch(addModule({ courseId, title, description }));
    }
    navigate(`/courses/${courseId}/modules`);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">{isEditMode ? 'Edit Module' : 'Create New Module'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          {isEditMode ? 'Update Module' : 'Create Module'}
        </button>
      </form>
    </div>
  );
};

export default ModuleForm;
