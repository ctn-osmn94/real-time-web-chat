import React from 'react'
import { setAvatarRoute } from '../utils/APIRoutes'
import { useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import loader from "../assets/loader.gif"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { useEffect } from 'react'

function SetAvatar() {
    const navigate = useNavigate()
    const [sprite, setSprite] = useState("bottts");
    const [avatar, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const toastOptions = {
        position: "bottom-right",
        autoClose:4000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }

    useEffect(()=>{
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login")
        }
    },[])
    
    
    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("select an avatar",toastOptions)
        } else {
            const user = JSON.parse(localStorage.getItem("chat-app-user"))
           
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatar[selectedAvatar].size
            })
           
            if (data.isSet) {
                user.isAvatarImageSet = true
                user.avatarImage = data.image
                localStorage.setItem("chat-app-user",JSON.stringify(user))
                navigate("/")
            } else {
                toast.error("error seting avatar",toastOptions)
            }
        }
    }

    useEffect(() => {
        const getData = () =>{
            setTimeout(async () => {
                for (let i = 0; i < 3; i++) {
                    const image = await axios({
                        method:"get",
                        url:`https://avatars.dicebear.com/api/${sprite}/${Math.floor(Math.random()*1000)}.svg`,
                        responseType: "arraybuffer"
                    })
                        const buffer = new Blob([image.data])
                        avatar.push(buffer)
                }
                setIsLoading(false)
            }, 2000);
        }
        getData()
    },[])
    

    return (
        <>
            <div className='flex justify-center items-center flex-col gap-12  h-screen w-screen text-white bg-[#131324]'>
                {
                    isLoading ? 
                    <div>
                        <img src={loader} alt="loader" className='loader' />
                    </div>
                    : (
                        <>
                            <div className='title-cont'>
                                <h1>Pick an avatar as your profile picture</h1>
                            </div>
                            <div className='flex gap-5'>
                                {
                                    avatar.map((item,index)=> {
                                        return (
                                            <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`} key={index}>
                                                <img
                                                    className='w-20 cursor-pointer'
                                                    src={`https://avatars.dicebear.com/api/${sprite}/${item.size}.svg`} 
                                                    onClick={()=>setSelectedAvatar(index)}
                                                />
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>
                            <button onClick={setProfilePicture} className='bg-[#997af0] px-8 py-4 rounded-lg font-bold hover:bg-[#4e0eff] transition duration-500'>Set As Profile Picture</button>
                        </>
                    )
                }
                
            </div>
            <ToastContainer/>
        </>
    )
}

export default SetAvatar