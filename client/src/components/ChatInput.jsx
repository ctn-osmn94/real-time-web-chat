import React from 'react'
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"
import { useState } from 'react'
function ChatInput({handleSendMsg}) {
    const [showEmojiPicker,setShowEmojiPicker] = useState(false)
    const [msg,setMsg] = useState("")
    const handleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }
    const handleEmojiClick = (emoji) => {
        let message = msg
        message += emoji.emoji
        setMsg(message)
    }

    const sendChat = (event) =>{
        event.preventDefault()
        if (msg.length > 0) {
            handleSendMsg(msg)
            setMsg("")
        }
    }
  return (
    <div className='bg-[#080420] px-16 py-6 relative'>
        
     
        <div className="absolute top-10 left-5">
            <BsEmojiSmileFill onClick={handleEmojiPicker} className='text-2xl text-yellow-400 cursor-pointer'/>
            {
                showEmojiPicker && <Picker height={350} theme="dark" width={280} onEmojiClick={handleEmojiClick}/>
            }
        </div>
     
        
        <form onSubmit={(e)=>sendChat(e)} className='w-full rounded-3xl bg-[#ffffff34] flex items-center justify-between'>
            <input 
            className='text-white w-4/5 h-12 bg-transparent pl-3 border-none focus:outline-none selection:bg-[#9186f3]' type="text" 
            placeholder='text your message here'
            value={msg} 
            onChange={(e)=>setMsg(e.target.value)}
            />
            <button className="px-6 flex justify-center bg-[#9a86f3] rounded-3xl py-2 border-none">
                <IoMdSend className='text-3xl text-white'/>
            </button>
        </form>
    </div>
  )
}

export default ChatInput