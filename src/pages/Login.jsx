import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useForm } from "react-hook-form"
import { Lock, Mail, PersonStandingIcon, Pin, X} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useAuth } from "../components/context/AuthContext";

const Login = () => {
  const backendUrl= import.meta.env.VITE_BACKEND_URI
  const navigate = useNavigate()
  const { refetchAuth } = useAuth();

  const [form,setForm]=useState("Sign Up")
  const [loading,setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

 const onSubmit = async (data) => {
  setLoading(true)
  try {
    const response = await axios.post(`${backendUrl}/api/auth/register`, {
      name: data.name,
      email: data.email,
      password: data.password
    }, { withCredentials: true });


    if (response.data.success) {
      await axios.post(`${backendUrl}/api/auth/sent-verify-otp`,{}, { withCredentials: true })
      toast.success(response.data.message);
            await refetchAuth();  
 
          navigate('/verify-email')

// success
    } else {
      toast.error(response.data.message || "Registration failed"); // handle backend failure
    }

  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message || err.message || "Something went wrong");
  }finally{
    setLoading(false)
  }
};
 const onLogin = async (data) => {
  setLoading(true)
  try {
    const response = await axios.post(`${backendUrl}/api/auth/login`, {
      email: data.email,
      password: data.password
    }, { withCredentials: true });


    if (response.data.success) {
      toast.success(response.data.message); 
            await refetchAuth();  

          navigate('/')
          

// success
    } else {
      toast.error(response.data.message || "Registration failed"); // handle backend failure
    }

  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message || err.message || "Something went wrong");
  }finally{
    setLoading(false)
  }
};

  return (
    <div className='min-h-screen sm:px-10 px-5 gradient-background'>
      <div className='absolute my-5'>
        <img src={assets.logo} alt="" />
      </div>

      <div data-aos="fade-down" className='flex justify-center  items-center h-screen'>

{ form === "Sign Up"?<form  className='rounded-xl flex w-fit sm:px-25 px-5  text-3xl  py-2 flex-col justify-center items-center gap-2 glass-card' onSubmit={handleSubmit(onSubmit)}>
<div className='flex justify-center flex-col items-center gap-3'>

<h1 className='sm:text-5xl text-2xl'> {form} </h1>
<p className='sm:text-lg text-sm '> 
  {form === "Sign Up" ? "Create Your Account" : "Login To Your Account"}</p>
</div>


          <div className='flex w-full flex-col'>
            <label className='sm:text-lg text-sm flex gap-2 items-center justify-between '  htmlFor="">Enter Your Name<PersonStandingIcon/></label>
            <input  className='border text-sm sm:text-2xl p-1 rounded-full' {...register("name", { required: true })} />
            {errors.name && <span className="text-xs text-red-600">Name is Required</span>}

          </div>
          <div className='flex w-full flex-col'>
            <label className='sm:text-lg text-sm flex gap-2 justify-between items-center'  htmlFor="">Enter Your Email <Mail/>  </label>
            <input  className='border text-sm sm:text-2xl p-1 rounded-full'  {...register("email",{ required: true })} />
            {errors.email && <span className="text-xs text-red-600">Email Is Required</span>}

          </div>
          <div className='flex w-full gap-1 flex-col'>
            <label className='sm:text-lg text-sm flex gap-2 items-center justify-between'  htmlFor="">Enter Your Password<Lock/></label>
            <input type="password" className='border text-sm sm:text-2xl p-1 rounded-full' {...register("password", { required: true })} />
            {errors.password && <span className="text-xs text-red-600">Password is Required</span>}

         
          </div>
          <div>

<button className='border px-5 py-2 text-xl hover:shadow-2xl shadow-gray-400 hover:scale-105 transition-all duration-200  cursor-pointer rounded-full' type='submit'> {loading ? "Submitting..." :(form)}</button></div>
                  <p className='text-sm gap-2 flex font-semibold '>{form === "Sign Up"? "Already Have An Account?":"Do No Have An Accout"}   <p className='font-bold underline cursor-pointer' onClick={()=>setForm("Login")}>
                    
                    {form === "Sign Up"?"Login":"Sign Up"}
                    
                     Here</p></p>

        </form>
:<form  className='flex glass-card  rounded-2xl  w-full  text-3xl sm:px-25 py-2 flex-col justify-center items-center gap-2 border' onSubmit={handleSubmit(onLogin )}>
<div className='flex justify-center flex-col items-center gap-3'>

<h1 className='sm:text-5xl text-3xl'> {form} </h1>
<p className='text-lg '>{form === "Sign Up" ? "Create Your Account" : "Login To Your Account"}</p>
</div>

          <div className='flex flex-col'>
            <label className='sm:text-lg text-sm flex gap-2 justify-between items-center'  htmlFor="">Enter Your Email <Mail/>  </label>
            <input  className='border text-sm sm:text-2xl p-1 rounded-full'  {...register("email",{ required: true })} />
            {errors.email && <span className="text-xs text-red-600">Email Is Required</span>}

          </div>

          
          <div className='flex gap-1 flex-col'>
            <label className='sm:text-lg text-sm flex gap-2 items-center justify-between'  htmlFor="">Enter Your Password<Lock/></label>
            <input type="password"  className='border text-sm sm:text-2xl p-1 rounded-full' {...register("password", { required: true })} />
            {errors.password && <span className="text-xs text-red-600">Password is Required</span>}

<Link to="/reset-password">
          <p className='text-sm font-semibold cursor-pointer'>Forget Password?</p>
</Link>
         
          </div>
          <div>

<button className='border px-5 py-2 text-xl hover:shadow-2xl shadow-gray-400 hover:scale-105 transition-all duration-200  cursor-pointer rounded-full' type='submit'> {loading ? "Submitting..." :(form)}</button></div>
                  <p className='text-sm gap-2 flex font-semibold '>{form === "Sign Up"? "Already Have An Account?":"Do No Have An Accout"}   <p className='font-bold underline cursor-pointer'onClick={()=>setForm("Sign Up")}>{form === "Sign Up"?"Login":"Sign Up"} Here</p></p>

        </form>


}
        
      </div>

    </div>
  )
}

export default Login
