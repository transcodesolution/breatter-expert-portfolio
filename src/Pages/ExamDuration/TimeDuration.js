import React, { useEffect, useRef, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import popup_img from '../../Assets/images/popup_img.png';
// import questions from "../../Layouts/Freedata";
import { ApiGet, ApiGetSpecial, ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../Store/Reducers/Profilereducer/profile";



const TimeDuration = () => {
    const profile = useSelector((state) => state.profile.profile)
    const token = useSelector((state) => state.expert.token);
    const [questionList, setQuestionList] = useState([]);
    const [answerList, setAnswerList] = useState([]);
    const [timer, setTimer] = useState('00:00:00');
    const [show, setShow] = useState(false);


    // const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const urlParams = new URLSearchParams(window.location.search);

    const Ref = useRef(null);

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
            = getTimeRemaining(e);

        if (hours == 0 && minutes == 0 && seconds == 0) {
            clearInterval(Ref.current);
            handlePassExam();
        }
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
    const clearTimer = (e) => {
        setTimer('00:30:00');

        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 1800);
        return deadline;
    }
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    const getProfile = () => {
        try {

            ApiGetSpecial('/profile', { headers: { authorization: token } }).then((response) => {

                dispatch(setProfile({ data: response?.data?.data }))
            }).catch((err) => toast.error(err.message));
        } catch (error) {
            toast.error(error.message)
        }
    }
    const handleAnswerUpdate = (_index, index, questionID) => {
        setAnswerList((arr) => {
            arr[index] = {
                qId: questionID,
                ans: _index
            }
            return arr
        })
    }
    const handlePassExam = () => {
        let subjectId = urlParams.get("subjectID")
        ApiPost('/exam/submit', { questionAnswer: answerList, subjectId: subjectId }).then((response) => {
            if (response.data.data.pass) {
                getProfile();
                toast.success("You Pass In Exam")
            } else {
                toast.error("You Faild In Exam")
            }
            ApiGet('/profile').then((response) => {
                dispatch(setProfile({ data: response?.data?.data }))
            });

        })
    }

    useEffect(() => {
        let subjectId = urlParams.get("subjectID")
        ApiPost('/exam/questions', { subjectId }).then((response) => {
            console.log("qst", response)
            setQuestionList(response.data.data)
        })
    }, [])

    return (
        <div className="time_duration_wrapper">
            <div className="time_duration_wrap">
                <Container>
                    <div className="time_duration_block">
                        <div className="time_duration_sec">
                            <p>time duration</p>
                            <p>{timer}</p>
                        </div>
                    </div>
                    <div className="duration_wrap">
                        <div className="duration_block">
                            {
                                questionList.length != 0 && questionList.map((data, index) => {
                                    return <ul className="duration_sec">
                                        <li>
                                            <div className="duration_item">
                                                <p>Question-{index + 1}</p>
                                                <h3>{data.question}</h3>
                                                <div className="duration_radio">
                                                    <ul>
                                                        {
                                                            data.options.map((_data, _index) => {
                                                                return <li>
                                                                    <input type="radio" id={`${index}-${_index}-option`} value={_data} name={`selector-${index}`} onChange={(event) => handleAnswerUpdate(_index, index, data._id)} />
                                                                    <label for={`${index}-${_index}-option`}>{_data}</label>
                                                                    <div className="check"></div>
                                                                </li>
                                                            })
                                                        }

                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                })
                            }


                        </div>
                    </div>
                    <div className="time_duration_btn">
                        <a href="#0" onClick={handlePassExam}>finish exam</a>
                    </div>
                </Container>
            </div>

            <Modal className='duration_model' centered show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className='duration_model_block'>
                        <div className='duration_model_conte'>
                            <div className="duration_model_img">
                                <img src={popup_img} alt="popup_img" />
                            </div>
                            <div className="duration_model_title">
                                <h2>congratulations !</h2>
                                <p>you have passed in exam</p>
                                <div className="duration_model_btn">
                                    <a href="#0">
                                        <span>
                                            <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M28.125 11.6442H5.8875L12.6938 3.54777C13.012 3.16854 13.1651 2.67964 13.1194 2.1886C13.0737 1.69757 12.8329 1.24463 12.45 0.92943C12.0671 0.614229 11.5734 0.462585 11.0776 0.507858C10.5818 0.55313 10.1245 0.791612 9.80625 1.17084L0.43125 12.3127C0.368176 12.4013 0.311774 12.4944 0.2625 12.5912C0.2625 12.6841 0.2625 12.7398 0.13125 12.8327C0.0462631 13.0456 0.0017646 13.2722 0 13.5012C0.0017646 13.7301 0.0462631 13.9568 0.13125 14.1697C0.13125 14.2625 0.13125 14.3182 0.2625 14.4111C0.311774 14.5079 0.368176 14.601 0.43125 14.6896L9.80625 25.8315C9.98254 26.0411 10.2033 26.2097 10.4528 26.3252C10.7024 26.4408 10.9745 26.5004 11.25 26.5C11.6881 26.5008 12.1127 26.3497 12.45 26.0729C12.6399 25.917 12.7968 25.7255 12.9118 25.5095C13.0269 25.2934 13.0977 25.057 13.1204 24.8138C13.143 24.5706 13.117 24.3253 13.0438 24.0921C12.9706 23.8588 12.8516 23.6422 12.6938 23.4546L5.8875 15.3581H28.125C28.6223 15.3581 29.0992 15.1625 29.4508 14.8142C29.8025 14.466 30 13.9937 30 13.5012C30 13.0087 29.8025 12.5363 29.4508 12.1881C29.0992 11.8398 28.6223 11.6442 28.125 11.6442Z" fill="white" />
                                            </svg>
                                        </span>Back</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default TimeDuration;