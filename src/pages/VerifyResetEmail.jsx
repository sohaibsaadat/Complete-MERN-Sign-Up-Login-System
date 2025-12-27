import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { PinIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { PinInput } from 'react-input-pin-code';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../components/context/AuthContext';
const VerifyResetEmail = () => {
  const [values, setValues] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();
  const { verifyResetOtp } = useAuth(); // get API from context

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Timer for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      setIsResendDisabled(true);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleResend = () => {
    if (isResendDisabled) return;
    toast.info("Resending OTP...");
    setTimer(60);
    setValues(['', '', '', '', '', '']);
    // Here you can call sendResetOtp(email) if needed
  };

  // Update RHF value whenever PinInput changes
  useEffect(() => {
    setValue('otp', values.join(''));
  }, [values, setValue]);

  const onSubmit = async (data) => {
    try {
      const email = localStorage.getItem('resetEmail'); // get email from previous step
      const res = await verifyResetOtp(email, data.otp);
      if (res.success) {
        navigate('/new-password'); // go to reset password page
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='min-h-screen overflow-y-hidden px-10 gradient-background'>
      <div className='absolute my-5'>
        <img src={assets.logo} alt="" />
      </div>

      <div data-aos='fade-up' className='flex justify-center items-center h-screen'>
        <form
          className='flex rounded-2xl glass-card w-fit text-3xl px-25 py-2 flex-col justify-center items-center gap-5 border'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex justify-center flex-col items-center gap-3'>
            <h1 className='sm:text-5xl text-3xl'>Verify Email</h1>
            <p className='text-lg'>We have sent an OTP to your email</p>
          </div>

          <div className='flex flex-col w-full max-w-sm mx-auto px-4'>
            <label className='text-lg flex gap-2 justify-between items-center'>
              Enter Your OTP <PinIcon />
            </label>
            <div className='w-fit flex justify-center'>
              <PinInput
                values={values}
                onChange={(value, index, allValues) => setValues(allValues)}
                length={6}
                placeholder="-"
                inputStyle={{ minWidth: '25px', maxWidth: '50px' }}

                autoFocus
              />
              {errors.otp && <p className="text-red-600 text-sm">OTP is required</p>}

            </div>
          </div>

          <div className='flex gap-2'>
            <p className="text-black text-sm">
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
            <button
              className='border px-5 py-2 text-xl hover:shadow-2xl shadow-gray-400 hover:scale-105 transition-all duration-200 cursor-pointer rounded-full'
              type='submit'
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyResetEmail;
