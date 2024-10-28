
import ModuleCard from '../student/ModuleCard'
import {Navigate, NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { getCourses} from '../../app/features/course/courseSlice'
import { useEffect } from 'react';


export const Dashboard = () => {
  const dispach = useDispatch();
  const data = useSelector(state => state.course)

  useEffect(() =>{
    dispach(getCourses())
},[])
console.log(data)
  return (
    <div className='h-screen w-screen grid sm:grid-cols-6 sm:grid-rows-12 border-2 border-green-300' id='board'>
      <div className='sm:col-span-6 sm:row-span-2 border-2 border-red-400 m-2 mb-10 flex justify-evenly p-10' >
      <button className='border-2 border-blue-400 hover:bg-blue-400 px-2' >Create a new module</button>
      <div className="border-2 border-blue-400 hover:bg-blue-400 px-2">
        
        <button className="border-2 border-blue-400 hover:bg-blue-400 px-2" >Delete a new module</button>
         </div>
      </div>
      <div className='sm:col-span-5 row-span-12 border-2 border-purple-700 flex flex-wrap overflow-y-auto justify-evenly content-between' >
      
      {
        data.loading ? <p>Loading....</p>:
        data.courses.map((course) =>{
           return <ModuleCard key={course.id} title={course.title} description={course.description}/>
        }
        )
        }
      </div>

    </div>
  )
}













export const Courses = () => {
    return (
      <div>
        <ModuleCard />
      </div>
    )
  }

  








export const Calendar = () => {
    return (
      <div>Calendar</div>
    )
  }









export const Profile = () => {
    return (
      <div>Profile</div>
    )
  }










export const Retro = () => {
    return (
      <div>Retro</div>
    )
  }









export const Resources = () => {
    return (
      <div>Resources</div>
    )
  }










export const SideNav = () => {
    return (
      <div>SideNa</div>
    )
  }






  
export const HeadNav = () => {
    return (
      <div>HeadNav</div>
    )
  }


  


  