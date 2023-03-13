import React from "react";

import Header from '../Answer/Header';
import Banner from '../Answer/Banner';
import Answer from '../Answer/Answer';
import Footer from '../Answer/Footer';

const Answerpage = () =>{
    return(
        <div className="answer_page">
            <Header />
            <Banner />
            <Answer />
            <Footer />
        </div>
    )
}

export default Answerpage;