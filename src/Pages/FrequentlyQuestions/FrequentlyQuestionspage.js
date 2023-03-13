import React from "react";

import Header from '../FrequentlyQuestions/Header';
import Banner from '../FrequentlyQuestions/Banner';
import FrequentlyQuestions from '../FrequentlyQuestions/FrequentlyQuestions';
import Footer from '../FrequentlyQuestions/Footer';
const FrequentlyQuestionspage = () =>{
    return(
        <div className="frequently_questions_page">
            {/* <Header /> */}
            <Banner />
            <FrequentlyQuestions />
            {/* <Footer /> */}
        </div>
    )
}

export default FrequentlyQuestionspage;