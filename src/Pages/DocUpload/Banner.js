import React, { useState } from "react";

import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiPost } from "../../Helpers/Api/ApiData";
import { setLogout } from "../../Store/Reducers/Authreducer/auth";



const Banner = () => {
    const profile = useSelector((state) => state.profile.profile);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [active, setActive] = useState()

    const [active1, setActive1] = useState()
    const toggle_profile_dropdown = () => {
        setActive(!active);
        document.documentElement.classList.toggle("profile_layer_open");
    }
    const handleLogOut = () => {
        let deviceToken = localStorage.getItem("deviceToken")
        dispatch(setLogout())
        navigate('/')
        ApiPost('/auth/logout', {
            "deviceToken": deviceToken
        }).then(() => toast.success("You Logged Out"))
    }
    return (
        <div className="qa_banner_wrapper">
            <div className="qa_banner_wrap">
                <Container>
                    <div className="qa_banner_block">
                        <div className="qa_banner_title">
                            <h2>Exam</h2>
                        </div>
                    </div>
                    <div className="profile_exam">
                        <div className="comman_btn" style={{ cursor: 'pointer' }}>
                            <div className="qa_profile">

                                {/* <img src={profile} alt="qa_profile" /> */}
                                <div className="qa_profile_dropdown_block" style={{padding:'12px'}}>
                                    <div className="qa_profile_dropdown_menu">
                                        <div className="qa_profile_dropdown_item qa_profile_dropdown_item1" onClick={handleLogOut}>
                                        
                                                Logout
                                        
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Banner;