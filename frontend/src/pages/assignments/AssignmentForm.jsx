// src/pages/Assignments/AssignmentForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addAssignment, updateAssignment, fetchAssignments } from '../../app/features/assignments/assignmentsSlice';

const AssignmentForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, moduleId, assignmentId } = useParams();
  const isEditMode = !!assignmentId;
  const assignment = useSelector((state) => state.assignments.selectedAssignment);

  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchAssignment(assignmentId));
    }
  }, [dispatch, assignmentId, isEditMode]);

  useEffect(() => {
    if (isEditMode && assignment) {
      setTitle(assignment.title);
      setDescription(assignment.description);
      setDueDate(assignment.dueDate);
    }
  }, [isEditMode, assignment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignmentData = { moduleId, title, description, dueDate };

    if (isEditMode) {
      dispatch(updateAssignment({ assignmentId, ...assignmentData }));
    } else {
      dispatch(addAssignment(assignmentData));
    }
    navigate(`/courses/${courseId}/modules/${moduleId}/assignments`);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">{isEditMode ? 'Edit Assignment' : 'Create New Assignment'}</h1>
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
        <div className="mb-4">
          <label className="block text-gray-700">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          {isEditMode ? 'Update Assignment' : 'Create Assignment'}
        </button>
      </form>
    </div>
  );
};

export default AssignmentForm;
