
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, deleteCourse } from '../../app/features/course/courseSlice';
import { useParams, useNavigate, Link } from 'react-router-dom';


const CourseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = useSelector((state) => state.courses.courses.selectedCourse);

  useEffect(() => {
    dispatch(fetchCourses(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteCourse(id));
    navigate('/courses');
  };

  if (course) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">course.title</h1>
      <p className="text-gray-500 mt-2">course.description</p>
      <div className="mt-4">
          <Link to="/modules/new" className="p-4 bg-green-200 rounded-lg shadow-md text-black font-medium hover:bg-green-300">
            Create New Module
          </Link>
        {/* <Link to={`/courses/${id}/edit`} className="text-blue-500 hover:underline mr-4">Edit Course</Link>
        <button onClick={handleDelete} className="text-red-500 hover:underline">Delete Course</button> */}
      </div>
    </div>
  );
};

export default CourseDetail;
