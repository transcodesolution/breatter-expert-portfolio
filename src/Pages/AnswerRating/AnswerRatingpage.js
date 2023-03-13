import React from "react";

import Header from '../AnswerRating/Header';
import Banner from '../AnswerRating/Banner';
import AnswerRating from '../AnswerRating/AnswerRating';
import Footer from '../AnswerRating/Footer';

const AnswerRatingpage = () =>{
    return(
        <div className="answer_rating_page">
            {/* <Header /> */}
            <Banner />
            <AnswerRating />
            {/* <Footer /> */}
        </div>
    )
}

export default AnswerRatingpage;