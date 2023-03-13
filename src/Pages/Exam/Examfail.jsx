import React from "react";
import Banner from "./Banner";
import Footer from "./Footer";
import Modal from 'react-bootstrap/Modal';
import popup_img from '../../Assets/images/popup_img.png';
import { useNavigate } from "react-router-dom";
import { setProfile } from "../../Store/Reducers/Profilereducer/profile";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Store/Reducers/Authreducer/auth";
import { ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
function Examfail() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLoginAgain = () => {
    ApiPost('/profile/update', {
      profileStatus: 0
    }).then(() => {
      dispatch(
        setLogin({
          token: '',
        })
      );
      navigate('/LoginPage')
      dispatch(setProfile({ data: '' }))
    }).catch((err) => toast.error(err.message))

  }
  return (
    <>
      <Banner />
      <div style={{ minHeight: '50vh' }}>

      </div>
      <Modal className='duration_model' centered show={true} animation={false}>
        {/* <Modal.Header closeButton></Modal.Header> */}
        <Modal.Body>
          <div className='duration_model_block'>
            <div className='duration_model_conte'>
              {/* <div className="duration_model_img">
                <img src={popup_img} alt="popup_img" />
              </div> */}
              <div className="duration_model_title">
                <h2>Sorry!!!!!</h2>
                <p>you  Failed in exam</p>
                <div className="duration_model_btn">
                  <a href="#0">
                    <span onClick={handleLoginAgain}>
                      Login Again
                    </span></a>
                </div>
                <h5 style={{ color: 'red', marginTop: '6px' }}>You Have To Give Exam Again!!!</h5>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Footer />
    </>
  );
}

export default Examfail;
