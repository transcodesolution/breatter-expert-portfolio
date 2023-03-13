import React from "react";

import Header from '../ContactUs1/Header';
import Banner from '../ContactUs1/Banner';
import ContactUs1 from '../ContactUs1/ContactUs1';
import Footer from '../ContactUs1/Footer';

const ContactUs1page = () =>{
    return(
        <div className="contact_us_1_page">
            {/* <Header /> */}
            <Banner />
            <ContactUs1 />
            {/* <Footer /> */}
        </div>
    )
}

export default ContactUs1page;