import React from 'react'
import {assets} from '../assets/assets.js'
import { Link } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx';

const Navbar = () => {

    const { auth, logOut } = useAuth();

  return (
    <div className='w-full flex justify-between p-6'>
        <div>
      <img src={assets.logo} alt="" />
        </div>
{auth.success? 
        <div onClick={logOut} className='flex cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl    gap-2 border cursor pointer px-10 rounded-full text-xl p-2'>
          Logout
          <img src={assets.arrow_icon} alt="" />
        </div>
:<Link to="/login">
        <div className='flex cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl    gap-2 border cursor pointer px-10 rounded-full text-xl p-2'>
          Login
          <img src={assets.arrow_icon} alt="" />
        </div>
       </Link>

}
       
       

    </div>
  )
}

export default Navbar
