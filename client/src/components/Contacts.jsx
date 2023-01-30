import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Logo from "../assets/logo.svg"

function Contacts({contacts,currentUser,changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected,setCurrentSelected] = useState(undefined)
    const sprite = "bottts"

    useEffect(()=>{
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    },[currentUser])

    const changeCurrentChat = (contact,index) => {
        setCurrentSelected(index)
        changeChat(contact)
    }
  return (
    <>
      {
        currentUserImage && currentUserName && (
            <div className='bg-[#080420] overflow-hidden'>
                <div className='flex items-center justify-center gap-4'>
                    <img className='h-8' src={Logo} alt="logo" />
                    <h3 className='text-3xl font-bold text-white'>snappy</h3>
                </div>
                <div className='flex flex-col items-center overflow-auto gap-4 '>
                    {
                        contacts.map((contact,index) =>{
                            return (
                                <div 
                                className={`contact ${index === currentSelected ? "select":""}`}
                                key={index}
                                onClick={()=>changeCurrentChat(contact,index)}
                                >
                                   <div className='avatar'>
                                        <img
                                        className='w-10' 
                                        src={`https://avatars.dicebear.com/api/${sprite}/${contact.avatarImage}.svg`} alt="avatar" 
                                        />
                                    </div>
                                    <div className=''>
                                        <h3 className=''> {contact.username} </h3>
                                    </div> 
                                </div>
                            )
                        })
                    }
                </div>
                <div className='flex gap-3 items-center text-white bg-[#0d0d30]'>
                    <div className='avatar'>
                        <img 
                            className='w-14'
                            src={`https://avatars.dicebear.com/api/${sprite}/${currentUserImage}.svg`} alt="avatar" 
                        />
                    </div>
                    <div className='username'>
                        <h3 className='text-2xl font-bold'> {currentUserName} </h3>
                    </div>
                </div>
            </div>
        )
      }  
    </>
  )
}

export default Contacts