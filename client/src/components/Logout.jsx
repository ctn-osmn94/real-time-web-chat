import React from 'react'
import {BiPowerOff} from "react-icons/bi"
import {useNavigate} from "react-router-dom"
import axios from "axios"


function Logout() {
    const navigate = useNavigate()
    const handleClick = async () =>{
        localStorage.clear()
        navigate("/login")
    }
  return (
    <button className='p-2 rounded-2xl bg-slate-600 hover:bg-slate-400 transition duration-500' onClick={handleClick}>
        <BiPowerOff/>
    </button>
  )
}

export default Logout