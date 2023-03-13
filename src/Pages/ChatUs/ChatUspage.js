import React, { useEffect, useState } from "react";

import Header from '../ChatUs/Header';
import Banner from '../ChatUs/Banner';
import ChatUs from '../ChatUs/ChatUs';
import Footer from '../ChatUs/Footer';
import { ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";

const ChatUspage = ({ socket }) => {
    const [sideBarUsers, setSideBarUsers] = useState([])

    const getAllRoom = () => {
        try {
            ApiPost('/room/get').then((response) => {
                console.log(response, "All Room")
                setSideBarUsers(response?.data?.data)
            })
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        getAllRoom()
    }, [])
    return (
        <div>
            <Banner />
            <ChatUs socket={socket} sideBarUsers={sideBarUsers}  />
        </div>
    )
}

export default ChatUspage;