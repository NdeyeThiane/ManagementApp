import React from 'react'

const CourseOverview = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/courses') 
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching courses:', error));
  }, []); 

  return (
    <div>CourseOverview
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.title} - {course.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CourseOverview