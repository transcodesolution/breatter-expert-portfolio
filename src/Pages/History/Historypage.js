import React from "react";

import Header from '../History/Header';
import Banner from '../History/Banner';
import History from '../History/History';
import Footer from '../History/Footer';

const Historypage = () =>{
    return(
        <div className="historypage"> 

            <Banner />
            <History />
            {/* <Footer /> */}
        </div>
    )
}

export default Historypage;