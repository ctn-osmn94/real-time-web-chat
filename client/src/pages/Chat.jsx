import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatContainer from '../components/ChatContainer'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import { allUsersRoute,host } from '../utils/APIRoutes'
import {io} from "socket.io-client"
import { useRef } from 'react'


function Chat() {

    const socket = useRef()
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined)
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect( ()=>{
        async function checkUser() {
          if (!localStorage.getItem("chat-app-user")) {
            navigate("/login")
          } else {
              setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
              setIsLoaded(true)
          }
        }
        checkUser()
    },[])

    useEffect(()=> {
      if (currentUser) {
        socket.current = io(host)
        socket.current.emit("add-user", currentUser._id)

      }
    },[currentUser])

    useEffect(() => {
      async function getContacts() {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
            setContacts(data.data)
          } else {
            navigate("/setAvatar")
          }
        }
      }
      getContacts()
    },[currentUser])

    const handleChatChange = (chat) => {
      setCurrentChat(chat)
    }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-4 bg-[#131324]'>
      <div className='h-[85vh] w-[85vw] bg-[#00000076]'>
        <Contacts 
          contacts={contacts} 
          currentUser={currentUser} 
          changeChat={handleChatChange} 
        />
        {
          isLoaded && currentChat === undefined ?
          (<Welcome  
            currentUser={currentUser}
          />) :
          (<ChatContainer 
            currentChat={currentChat} 
            currentUser={currentUser}
            socket={socket}
          />)
        }
        
      </div>
    </div>
  )
}

export default Chat