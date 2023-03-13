import React from "react";

import Header from "../StudentQuestion/Header";
import Banner from "../StudentQuestion/Banner";
import StudentQuestion from '../StudentQuestion/StudentQuestion';
import Footer from "../StudentQuestion/Footer";

const StudentQuestionpage = () =>{
    return(
        <div className="student_question_page">
            {/* <Header /> */}
            <Banner />
            <StudentQuestion />
            {/* <Footer /> */}
        </div>
    );
}

export default StudentQuestionpage;