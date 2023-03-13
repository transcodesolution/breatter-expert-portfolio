import React from "react";

import Header from '../Exam/Header';
import Banner from '../Exam/Banner';
import Footer from '../Exam/Footer';
import TermsCondition from '../Exam/TermsCondition';

const Exampage = () =>{
    return(
        <div>
            {/* <Header /> */}
            <Banner />
            <TermsCondition />
            <Footer />
        </div>
    )
}

export default Exampage;