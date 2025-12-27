import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { PinIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { PinInput } from 'react-input-pin-code';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const VerifyEmail = () => {
  const [values, setValues] = useState(['', '', '',  '', '',''])
  const [timer, setTimer] = useState(60)
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const backendUrl = import.meta.env.VITE_BACKEND_URI
  const navigate = useNavigate()


  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      setIsResendDisabled(true)
      return () => clearInterval(interval)
    } else {
      setIsResendDisabled(false)
    }
  }, [timer])
  const handleResend = () => {
    if (isResendDisabled) return

    console.log('Resending OTP...')
    setTimer(60)
    setValues(['', '', '',  '', '',''])
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    try {

      const response = await axios.post(`${backendUrl}/api/auth/verify-account`, {
        otp: data.otp
      }, { withCredentials: true })
console.log(response.data);

      if (response.data.success) {
        
        toast.success(response.data.message)  
        navigate('/')

      }
      else {
        toast.error(response.data.message || "Registration failed"); // handle backend failure
      }


    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message || "Something went wrong");

    }
  }


  return (
    <div className='min-h-screen overflow-y-hidden  sm:px-10 gradient-background  '>
      <div className='absolute my-5'>
        <img src={assets.logo} alt="" />
      </div>

      <div data-aos="fade-up" className='flex justify-center items-center h-screen'>
        <form className='flex rounded-2xl glass-card  w-fit  text-3xl sm:px-25 px-3 py-2 flex-col justify-center items-center gap-5 border' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex justify-center flex-col items-center gap-3'>

            <h1 className='sm:text-5xl text-3xl'> Verify Email </h1>
            <p className='sm:text-lg text-sm '>We Have Sent An OTP To Your Email</p>
          </div>

         <div className="flex flex-col w-full max-w-sm mx-auto px-4">
  <label className="text-lg flex flex-wrap gap-2 justify-between items-center mb-2">
    Enter Your OTP <PinIcon />
  </label>
  <div className="w-fit flex justify-center">
    <PinInput
      values={values}
      onChange={(value, index, allValues) => {
        setValues(allValues)
        const pin = allValues.join('')
        console.log('Current PIN:', pin)
        setValue('otp', pin)
      }}
      length={6}
      placeholder="-"
  inputStyle={{minWidth: '25px',maxWidth: '50px'}}  
      autoFocus
    />
  </div>
</div>

          <div className='flex gap-2'>
            <p className="text-black text-sm mb-">
              {timer > 0 ? (
                <span>Resend OTP in {timer}s</span>
              ) : (
                <span
                  className={`underline cursor-pointer font-semibold ${isResendDisabled ? 'opacity-50' : ''}`}
                  onClick={handleResend}
                >
                  Resend OTP
                </span>
              )}
            </p>
          </div>

          <div>

            <button className='border px-5 py-2 text-xl hover:shadow-2xl shadow-gray-400 hover:scale-105 transition-all duration-200  cursor-pointer rounded-full' type='submit'>Verify</button>          </div>

        </form>


      </div>
    </div>
  )
}

export default VerifyEmail
