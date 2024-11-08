
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, deleteCourse } from '../../app/features/course/courseSlice';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const courses = useSelector((state) => state.courses.courses );
  const dispatch = useDispatch();
  console.log(courses)
  

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleDelete = (courseId) => {
    dispatch(deleteCourse(courseId));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Courses</h1>
      <Link to="/courses/new" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Create New Course
      </Link>
      <ul className="mt-4 space-y-3">
        {courses.map((course) => (
          <li key={course.id} className="p-4 bg-white rounded shadow-md flex justify-between items-center">
            <div>
              <Link to={`/courses/${course.id}`} className="text-indigo-600 hover:underline">
                {course.title}
              </Link>
              <p className="text-gray-500">{course.description}</p>
            </div>
            <div>
              <Link to={`/courses/${course.id}/edit`} className="text-blue-500 mr-4 hover:underline">Edit</Link>
              <button
                onClick={() => handleDelete(course.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
