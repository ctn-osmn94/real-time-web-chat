import React from 'react'
import { useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.svg"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios" 
import {loginRoute} from "../utils/APIRoutes"


function Login() {

  const navigate = useNavigate()
  const [values, setValues] = useState({
    username:"",
    password:"",
  })
  const handleSubmit = async (e) =>{
    e.preventDefault()
    
    if (handleValidation()) {
      console.log(loginRoute);
      console.log("in validation", loginRoute);
      const {password, username} = values
      const {data} = await axios.post(loginRoute, {
        username,
        password
      })
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user))
        navigate("/setAvatar")
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
    const {username, password} = values
    
    if (username.length === "") {
      toast.error("username or password required", toastOptions)
      return false
    } 
    else if (password === "") {
      toast.error("username or password required", toastOptions)
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
            <input className='rounded-lg bg-transparent border border-solid border-[#4e0eff] focus:outline-none focus:border-[#997af0] p-3' type="password" name='password' placeholder='Password' onChange={(e)=>handleChange(e)} />
            
            <button className='bg-[#997af0] px-8 py-4 rounded-lg font-bold hover:bg-[#4e0eff] transition duration-500' type='submit'>Login</button>
            <span>Don't have an account? <Link className='text-[#4e0eff] ml-4' to="/register">Register</Link> </span>
          </form>
        </div>
        <ToastContainer/>
      </div>
  )
}

export default Login