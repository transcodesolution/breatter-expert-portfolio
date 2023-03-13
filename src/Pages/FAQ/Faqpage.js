import React from "react";

import Header from '../FAQ/Header';
import Banner from '../FAQ/Banner';
import Faq from '../FAQ/Faq';
import Footer from '../FAQ/Footer';

const Faqpage = () =>{  
    return(
        <div className="faq_page">
            {/* <Header /> */}
            <Banner />
            <Faq />
            {/* <Footer /> */}
        </div>
    )
}

export default Faqpage;