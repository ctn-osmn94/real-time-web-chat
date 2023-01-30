import React from 'react'
import { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.svg"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios" 
import {registerRoute} from "../utils/APIRoutes"


function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword: ""
  })
  const handleSubmit = async (e) =>{
    e.preventDefault()
    
    if (handleValidation()) {
      console.log("in validation", registerRoute);
      const {password, username, email} = values
      const {data} = await axios.post(registerRoute, {
        username,
        email,
        password
      })
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user))
        navigate("/login")
      }

      
    }
    
  }

  const toastOptions = {
      position: "bottom-right",
      autoClose:4000,
      pauseOnHover:true,
      draggable:true,
      theme:"dark"
  }

  const handleValidation = () => {
    const {username, password, confirmPassword,email} = values
    if (password !== confirmPassword) {
      toast.error("password and confirm password should be the same", toastOptions)
      return false
    } 
    if (username.length < 4) {
      toast.error("username should be greater than 4 characters", toastOptions)
      return false
    } 
    if (password.length < 8) {
      toast.error("password should be greater than 8 characters", toastOptions)
      return false
    } 
    if (email === "") {
      toast.error("email is required", toastOptions)
      return false
    }

    return true;
    
  }
  
  const handleChange = (e) =>{
    setValues({...values, [e.target.name]:e.target.value})
  }
  return (
    <div>
        <div className='h-screen w-screen flex flex-col justify-center gap-4 items-center bg-[#131324] text-white'>
          <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col bg-[#00000076] gap-8 rounded-3xl px-20 py-12" >
            <div className='flex items-center gap-4 justify-center'>
              <img className='h-20' src={Logo} alt="" />
              <h1 className='font-bold text-4xl uppercase'>snappy</h1>
            </div>
            <input className='rounded-lg bg-transparent border border-solid border-[#4e0eff] focus:outline-none focus:border-[#997af0] p-3' type="text" name='username' placeholder='Username' onChange={(e)=>handleChange(e)} />
            <input className='rounded-lg bg-transparent border border-solid border-[#4e0eff] focus:outline-none focus:border-[#997af0] p-3' type="email" name='email' placeholder='Email' onChange={(e)=>handleChange(e)} />
            <input className='rounded-lg bg-transparent border border-solid border-[#4e0eff] focus:outline-none focus:border-[#997af0] p-3' type="password" name='password' placeholder='Password' onChange={(e)=>handleChange(e)} />
            <input className='rounded-lg bg-transparent border border-solid border-[#4e0eff] focus:outline-none focus:border-[#997af0] p-3' type="password" name='confirmPassword' placeholder='Confirm Password' onChange={(e)=>handleChange(e)} />
            <button className='bg-[#997af0] px-8 py-4 rounded-lg font-bold hover:bg-[#4e0eff] transition duration-500' type='submit'>Create User</button>
            <span>Already have an account <Link className='text-[#4e0eff] ml-4' to="/login">Login</Link> </span>
          </form>
        </div>
        <ToastContainer/>
    </div>
  )
}


export default Register