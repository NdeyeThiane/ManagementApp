import { useState } from 'react'
import { useForm } from "react-hook-form";


const CreateModule = () => {
    const [module, setModule] = useState()
    const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
    setModule(data)}
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='text-center'>
        <label>Module title</label> <br />
        <textarea {...register("title")} className='border-2 border-blue-400'/><br />
        <label>Module Description</label> <br />
        <textarea {...register("description")} className='border-2 border-blue-400'/><br />
        <input type='submit' />
    </form>
  )
}

export default CreateModule