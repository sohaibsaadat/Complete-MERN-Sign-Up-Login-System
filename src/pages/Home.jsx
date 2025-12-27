import React from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../components/context/AuthContext'
const backendUrl = import.meta.env.VITE_BACKEND_URI

const Home = () => {

  const { auth, logOut, loading } = useAuth();


  return (
    <div className='  min-h-screen overflow-y-hidden flex-col gap-5 items-center flex bg-[url("./src/assets/bg_img.png")] bg-cover bg-center'>
      <div className='w-full'>
        <Navbar />
      </div>

      <div data-aos="fade-down" className='flex justify-center items-center gap-5   flex-col '>
        <div>

          <img className='w-36 h-40 rounded-full' src={assets.header_img} alt="" />
        </div>

        {
          auth.success ? <div className='flex justify-center items-center gap-3 flex-col text-center'>
            <h1 className='flex gap-2'>Hello {auth.user.name} <img className='w-8' src={assets.hand_wave} alt="" /></h1>
            <h1 className='text-3xl sm:text-5xl font-semibold'>{auth.user.name} Welcome To Our Website</h1>
            <p className='max-w-xl text-sm sm:text-2xl'>Thanks For Creating An Account By Using  Email {auth.user.email} on Our Website </p>
          </div> : <div className='flex justify-center items-center gap-3 flex-col text-center'>
            <h1 className='flex gap-2'>Hello Dear <img className='w-8' src={assets.hand_wave} alt="" /></h1>
            <h1 className='text-3xl sm:text-5xl font-semibold'>Welcome To Our Website</h1>
            <p className='max-w-xl text-sm sm:text-2xl'>Let's Start By Creating An Account By Using Your Email After That We Will Let You to Our Website </p>
          </div>
        }

      </div>
      {
        auth.success ?
          <div data-aos="fade-up" onClick={logOut} className='flex cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl    gap-2 border cursor pointer px-10 rounded-full text-xl p-2'>
           <p>
            Log Out
            </p> 
          </div> : <Link data-aos="fade-up" to="/login">
            <div className='flex cursor-pointer transition-al duration-500 hover:scale-105 hover:shadow-xl    gap-2 border cursor pointer px-10 rounded-full text-xl p-2'>
              Get Started
              <img src={assets.arrow_icon} alt="" />
            </div>
          </Link>
      }

    </div>
  )
}

export default Home
