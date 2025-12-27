import React from 'react';
import { assets } from '../assets/assets';
import { useForm } from 'react-hook-form';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URI;

export const sendResetOtp = async (email) => {
  const res = await axios.post(`${backendUrl}/api/auth/sent-reset-otp`, { email });
  return res.data;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await sendResetOtp(data.email);
      console.log('API response:', res);
      if (res.succes) {
        localStorage.setItem('resetEmail', data.email);
        toast.success('OTP sent!');
          console.log(res);
          
        // navigate after small delay
        setTimeout(() => navigate('/verify-reset-email'), 200);
      } else {
        toast.error(res.message || 'Failed to send OTP');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Something went wrong');
    }
  };


  return (
    <div className='min-h-screen px-10 gradient-background'>
      <div className='absolute my-5'>
        <img src={assets.logo} alt="" />
      </div>

      <div data-aos='fade-up' className='flex justify-center items-center h-screen'>
        <form
          className='flex glass-card rounded-2xl w-fit text-3xl px-25 py-2 flex-col justify-center items-center gap-2 border'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex justify-center flex-col items-center gap-3'>
            <h1 className='sm:text-5xl text-3xl'>Reset Password</h1>
            <p className='text-lg'>Reset Your Account Password</p>
          </div>

          <div className='flex gap-1 flex-col'>
            <label className='text-lg flex gap-2 items-center justify-between'>
              Enter Your Email <Mail />
            </label>
            <input
              type="email"
              className='border text-2xl p-1 rounded-full'
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
          </div>

          <div>
            <button
              className='border px-5 py-2 text-xl hover:shadow-2xl shadow-gray-400 hover:scale-105 transition-all duration-200 cursor-pointer rounded-full'
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
