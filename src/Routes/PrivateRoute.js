import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Routes } from "react-router-dom";
import AddExplanationpage from "../Pages/AddExplanation/AddExplanationpage";
import Editexplanation from "../Pages/AddExplanation/Editexplanation";
import Footer from "../Pages/AddExplanation/Footer";
import Header from "../Pages/AddExplanation/Header";
import AnswerRatingpage from "../Pages/AnswerRating/AnswerRatingpage";
import ChatUspage from "../Pages/ChatUs/ChatUspage";
import ContactUspage from "../Pages/ContactUs/ContactUspage";
import ContactUs1page from "../Pages/ContactUs1/ContactUs1page";
import Faqpage from "../Pages/FAQ/Faqpage";
import FrequentlyQuestionspage from "../Pages/FrequentlyQuestions/FrequentlyQuestionspage";
import Historypage from "../Pages/History/Historypage";
import Meeting from "../Pages/Meeting/Meeting";
import Profilepage from "../Pages/Profile/Profilepage";
import StudentQuestionpage from "../Pages/StudentQuestion/StudentQuestionpage";
import Walletpage from "../Pages/Wallet/Walletpage";
import { io } from 'socket.io-client';

function PrivateRoute() {
  const profile = useSelector((state) => state.profile.profile);
  const [socket, setSocket] = useState(null)
  useEffect(() => {

    socket = (io(`${process.env.REACT_APP_BASE_URL}`))

  }, [])
  useEffect(() => {

    // socket = (io(`${process.env.REACT_APP_BASE_URL}`))
    profile?._id && socket && socket.emit('online', { userId: profile?._id })

  }, [])


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<FrequentlyQuestionspage />} />
        <Route path="/faq" element={<Faqpage />} />
        <Route path="/Profilepage" element={<Profilepage />} />
        <Route path="/StudentQuestionpage" element={<StudentQuestionpage />} />
        <Route path="/AddExplanationpage/:id" element={<AddExplanationpage />} />
        <Route path="/editExplantion/:id" element={<Editexplanation />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/wallet" element={<Walletpage />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/history" element={<Historypage />} />
        <Route path="/Walletpage" element={<Walletpage />} />
        <Route path="/support" element={<ContactUs1page />} />
        <Route path="/ChatUspage" element={<ChatUspage socket={socket} a={'a'} />} />
        <Route path="/myanswer" element={<AnswerRatingpage />} />
        <Route path="/contact" element={<ContactUspage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default PrivateRoute;
