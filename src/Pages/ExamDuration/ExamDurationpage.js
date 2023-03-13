import React, { useEffect, useState } from "react";

import Header from '../ExamDuration/Header';
import Banner from '../ExamDuration/Banner';
import TimeDuration from '../ExamDuration/TimeDuration';
import Footer from '../ExamDuration/Footer';
import { useNavigate } from "react-router-dom";

const ExamDurationpage = () => {
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
            setShowPopup(true);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    const navigate=useNavigate()
    return (
        <div className="exam_duration_page">
            <Banner />
            <TimeDuration />
            <Footer />
            <div>
                {showPopup && navigate('/')}
                <h1>Hello World</h1>
            </div>
        </div>
    )
}

export default ExamDurationpage;