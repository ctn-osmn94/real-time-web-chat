import React, { useEffect, useState } from 'react'
import ChatInput from './ChatInput'
import Logout from './Logout'
import axios from "axios"
import { getMessagesRoute, sendMessagesRoute } from '../utils/APIRoutes'
import { useRef } from 'react'
import {v4 as uuidv4} from "uuid"

function ChatContainer({currentChat,currentUser,socket}) {
    const sprite = "bottts"
    const [messages,setMessages] = useState([])
    const [arrivalMessage,setArrivalMessage] = useState(null)
    const scrollRef = useRef()

    useEffect(()=>{
        async function getAllMessage() {
            if (currentChat) {
                const response = await axios.post(getMessagesRoute,{
                    from:currentUser._id,
                    to:currentChat._id
                })
                setMessages(response.data)
            }
        }
        getAllMessage()
    },[currentChat])

    const handleSendMsg = async(msg) =>{
        await axios.post(sendMessagesRoute,{
            from:currentUser._id,
            to:currentChat._id,
            message:msg
        })
        socket.current.emit("send-msg", {
            from:currentUser._id,
            to:currentChat._id,
            message:msg
        })
        const msgs = [...messages]
        msgs.push({fromSelf:true, message:msg})
        setMessages(msgs)
    }

        useEffect(()=>{
            if (socket.current) {
                socket.current.on("msg-receive",(msg)=>{
                    setArrivalMessage({fromSelf:false, message:msg})
                })
            }
        },[])

        useEffect(()=>{
            arrivalMessage && setMessages((prev)=> [...prev,arrivalMessage])

        },[arrivalMessage])

        useEffect(()=>{
            scrollRef.current?.scrollIntoView({behavior:"smooth"})
        },[messages])

  return (
    <>
        {
            currentChat && (
                <div className='overflow-hidden'>
                    <div className='flex justify-between items-center p-4'>
                        <div className='flex items-center gap-3 text-white'>
                            <div className='avatar'>
                                <img
                                className='w-16' 
                                src={`https://avatars.dicebear.com/api/${sprite}/${currentChat.avatarImage}.svg`} alt="avatar" />
                            </div>
                            <div className='username text-white'>
                                <h3 className='text-2xl font-semibold'> {currentChat.username} </h3>
                            </div>
                            
                        </div>
                        <Logout />
                    </div>
                    <div className='h-[400px] overflow-y-auto scrollbar'>
                        {
                            messages.map((message)=>{
                                return (
                                    <div ref={scrollRef} key={uuidv4()} className='px-8 py-4 flex flex-col gap-4 '>
                                        <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                                        <div className='content'>
                                            <p> {message.message} </p>
                                        </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg}/>
                </div>
            )
        }
    </>
  )
}

export default ChatContainer