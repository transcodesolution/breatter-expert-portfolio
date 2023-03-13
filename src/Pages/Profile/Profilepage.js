import React from "react";

import Header from '../Profile/Header';
import Banner from '../Profile/Banner';
import Profile from '../Profile/Profile';
import Footer from '../Profile/Footer';

const Profilepage = () =>{
    return(
        <div className="profile_page">
            {/* <Header /> */}
            <Banner />
            <Profile />
            {/* <Footer /> */}
        </div>
    )
}

export default Profilepage;