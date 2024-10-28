import {useEffect, useState} from 'react'
import ModuleCard from './ModuleCard';


const CourseOverview = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/courses') 
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching courses:', error));
  }, []); 

  return (
    <div>
      {
        courses.map((course) =>{
          return <ModuleCard key={course.id} courseInfo={course}></ModuleCard>
        })
      }
  

    </div>
  )
}

export default CourseOverview