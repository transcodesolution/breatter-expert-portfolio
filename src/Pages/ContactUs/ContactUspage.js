import React from "react";

import Header from '../ContactUs/Header';
import Banner from '../ContactUs/Banner';
import ContactUs from '../ContactUs/ContactUs';
import Footer from '../ContactUs/Footer';

const ContactUspage = () =>{
    return(
        <div className="contact_us_page">
            {/* <Header /> */}
            <Banner />
            <ContactUs />
            {/* <Footer /> */}
        </div>
    )
}

export default ContactUspage;