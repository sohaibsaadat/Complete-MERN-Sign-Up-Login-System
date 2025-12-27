import React from 'react'
import { assets } from '../assets/assets'
import { useForm } from 'react-hook-form'
import { Lock, Mail, Pin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const NewPassword = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URI

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const password = watch("password");

    const onSubmit = async (data) => {

        try {
                const resetToken = localStorage.getItem("resetToken"); // get token from storage

            const response = await axios.post(`${backendUrl}/api/auth/reset-password`, {
                newPassword: data.password,
                resetToken
            }, { withCredentials: true })
            localStorage.setItem("resetEmail", data.email)

            console.log(response);

            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/login')

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='min-h-screen px-10 gradient-background'>
            <div className='absolute my-5'>
                <img src={assets.logo} alt="" />
            </div>

            <div data-aos='fade-up' className='flex justify-center items-center h-screen'>
                <form className='flex glass-card  rounded-2xl  w-fit  text-3xl px-25 py-2 flex-col justify-center items-center gap-2 border' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex justify-center flex-col items-center gap-3'>

                        <h1 className='sm:text-5xl text-3xl'> Reset Password </h1>
                        <p className='text-lg '>Reset Your Account Password</p>
                    </div>



                   <div className='flex gap-1 flex-col'>
  <label className='text-lg flex gap-2 items-center justify-between'>
    Enter New Password <Pin />
  </label>

  <input
    type="password"
    className='border text-2xl p-1 rounded-full'
    {...register("password", { required: "Password is required" })}
  />

  {errors.password && (
    <span className="text-xs text-red-600">
      {errors.password.message}
    </span>
  )}
</div>

<div className='flex gap-1 flex-col'>
  <label className='text-lg flex gap-2 items-center justify-between'>
    Re-Enter New Password <Pin />
  </label>

  <input
    type="password"
    className='border text-2xl p-1 rounded-full'
    {...register("confirmPassword", {
      required: "Re-enter password is required",
      validate: (value) =>
        value === password || "Passwords do not match",
    })}
  />

  {errors.confirmPassword && (
    <span className="text-xs text-red-600">
      {errors.confirmPassword.message}
    </span>
  )}
</div>



                    <div>

                        <button className='border px-5 py-2 text-xl hover:shadow-2xl shadow-gray-400 hover:scale-105 transition-all duration-200  cursor-pointer rounded-full' type='submit'>Submit</button>          </div>

                </form>

            </div>

        </div>
    )
}

export default NewPassword
