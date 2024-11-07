// src/pages/Assignments/AssignmentList.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchAssignments } from '../../app/features/assignments/assignmentsSlice';

const AssignmentList = () => {
  const { courseId, moduleId } = useParams();
  const dispatch = useDispatch();
  const assignments = useSelector((state) => state.assignments.items);

  useEffect(() => {
    if (moduleId) {
      dispatch(fetchAssignments(moduleId));
    }
  }, [dispatch, moduleId]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Assignments</h1>
      <Link to={`/courses/${courseId}/modules/${moduleId}/assignments/new`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Create New Assignment
      </Link>
      {/* <ul className="mt-4 space-y-3">
        {assignments.map((assignment) => (
          <li key={assignment.id} className="p-4 bg-white rounded shadow-md flex justify-between items-center">
            <div>
              <Link to={`/courses/${courseId}/modules/${moduleId}/assignments/${assignment.id}`} className="text-indigo-600 hover:underline">
                {assignment.title}
              </Link>
              <p className="text-gray-500">{assignment.description}</p>
            </div>
            <Link to={`/courses/${courseId}/modules/${moduleId}/assignments/${assignment.id}/edit`} className="text-blue-500 mr-4 hover:underline">
              Edit
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default AssignmentList;
