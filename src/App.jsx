import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from './pages/VerifyEmail'
import AOS from "aos"
import "aos/dist/aos.css"
import { ToastContainer } from 'react-toastify'
import VerifyResetEmail from './pages/VerifyResetEmail'
import NewPassword from './pages/NewPassword'
AOS.init({
  duration: 1500,
  once: true
})

const App = () => {
  return (
    <div className=''>
      <ToastContainer />

<Routes>
  <Route path='/' element={<Home/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
  <Route path='/reset-password' element={<ResetPassword/>}></Route>
  <Route path='/verify-email' element={<VerifyEmail/>}></Route>
  <Route path='/verify-reset-email' element={<VerifyResetEmail/>}></Route>
  <Route path='/new-password' element={<NewPassword/>}></Route>
</Routes>
    </div>
  )
}

export default App
