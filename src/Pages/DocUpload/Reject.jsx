import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiPost } from "../../Helpers/Api/ApiData";
import { setLogin } from "../../Store/Reducers/Authreducer/auth";
import { setProfile } from "../../Store/Reducers/Profilereducer/profile";

import Banner from "../DocUpload/Banner";
import Footer from "../DocUpload/Footer";

const Reject = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleLoginAgain = () => {
    ApiPost('/profile/update',{
      profileStatus:0
  }).then(()=>{
      dispatch(
          setLogin({
            token: '',
          })
        );
        navigate('/LoginPage')
        dispatch(setProfile({ data: ''}))
  }).catch((err)=>toast.error(err.message))
  }
  return (
    <div className="doc_upload_page">
      <Banner />
      <div className="reject">
        <div className="reject_align">

        <div>Your Document Is Rejected</div>
        <div className="button_reject" onClick={handleLoginAgain}>Login Again</div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reject;
