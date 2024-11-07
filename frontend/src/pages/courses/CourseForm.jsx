// src/pages/Courses/CourseForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addCourse, updateCourse, fetchCourses} from '../../app/features/course/courseSlice';

const CourseForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const course = useSelector((state) => state.courses.selectedCourse);

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchCourse(id));
    }
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (isEditMode && course) {
      setTitle(course.title);
      setDescription(course.description);
    }
  }, [isEditMode, course]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(updateCourse({ id, title, description }));
    } else {
      dispatch(addCourse({ title, description }));
    }
    navigate('/courses');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">{isEditMode ? 'Edit Course' : 'Create New Course'}</h1>
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
          {isEditMode ? 'Update Course' : 'Create Course'}
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
