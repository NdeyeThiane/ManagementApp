// src/pages/Assignments/AssignmentDetail.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchAssignments } from '../../app/features/assignments/assignmentsSlice';

const AssignmentDetail = () => {
  const { courseId, moduleId, assignmentId } = useParams();
  const dispatch = useDispatch();
  const assignment = useSelector((state) => state.assignments.selectedAssignment);

  useEffect(() => {
    if (assignmentId) {
      dispatch(fetchAssignment(assignmentId));
    }
  }, [dispatch, assignmentId]);

  if (!assignment) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">{assignment.title}</h1>
      <p className="text-gray-500 mt-2">{assignment.description}</p>
      <p className="text-gray-500 mt-2">Due Date: {assignment.dueDate}</p>
      <div className="mt-4">
        <Link to={`/courses/${courseId}/modules/${moduleId}/assignments/${assignmentId}/edit`} className="text-blue-500 hover:underline">
          Edit Assignment
        </Link>
      </div>
    </div>
  );
};

export default AssignmentDetail;
