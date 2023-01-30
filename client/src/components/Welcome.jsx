import React from 'react'
import robot from "../assets/robot.gif"
function Welcome({currentUser}) {
  return (
    <div className='flex flex-col items-center justify-center text-white'>
        <img className='w-80' src={robot} alt="robot" />
        <h1 className='text-3xl font-bold'> Welcome, <span className='text-[#4e00ff]'> {currentUser.username} </span> </h1>
        <h3 className='text-xl font-semibold'> Please select a chat to start messaging. </h3>

    </div>
  )
}

export default Welcome