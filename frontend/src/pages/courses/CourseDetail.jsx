
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, deleteCourse } from '../../app/features/course/courseSlice';
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetail = () => {
  const { courseid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = useSelector((state) => state.courses.courses.selectedCourse);

  useEffect(() => {
    dispatch(fetchCourses(id));
  }, [dispatch, courseid]);

  const handleDelete = () => {
    dispatch(deleteCourse(id));
    navigate('/courses');
  };

  if (course) {
    return <p>Loading...</p>;
  }

   return 
};

export default CourseDetail;
