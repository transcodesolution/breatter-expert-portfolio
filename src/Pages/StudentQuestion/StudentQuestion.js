import React, { useEffect, useRef, useState } from "react";

import Container from 'react-bootstrap/Container';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiGet, ApiPost } from "../../Helpers/Api/ApiData";
import { toggleUpdate } from "../../Store/Reducers/Profilereducer/profile";
import PdfComponent from "../AddExplanation/Pdf";

const StudentQuestion = () => {
    const [screen, setScreen] = useState(false);
    const [work, setWork] = useState(false);
    const [question, setQuestion] = useState(null);
    const [timer, setTimer] = useState('00:00:00');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const Ref = useRef(null);

    const handleSkipQuestion = () => {
        ApiPost('/question/skip', {
            qId: question._id
        }).then((res) => {
            dispatch(toggleUpdate())
            toast.success('Question Is Skiped')
            setScreen(false);
            setWork(false)
            setTimer('00:00:00')
            navigate('/')
            if (Ref.current) clearInterval(Ref.current);
        }).catch((err) => toast.error(err.message))
    }


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
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
    const clearTimer = (e) => {
        setTimer('00:00:00');

        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
    const getDeadTime = (seconds) => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + seconds);
        return deadline;
    }

    const getQuestion = () => {
        ApiGet('/question/get').then((response) => {
            console.log(response)
            let res = response?.data?.data
            if (res.onScreen || res.onWork) {
                let timeDiff = Number(new Date(res.question.screenEndTime).getTime() - new Date().getTime()) / 1000;
                console.log((new Date(res.question.screenEndTime).getTime() - new Date().getTime()) / 1000, res.question.screenEndTime)
                clearTimer(getDeadTime(timeDiff));
                setScreen(res?.onScreen);
                setWork(res?.onWork);
                setQuestion(res?.question);
            }
        })
    }
    useEffect(() => {
        getQuestion();
    }, [])
    return (
        <div className="student_question_wrapper">
            <div className="student_question_wrap">
                <Container>
                    <div className="student_question_block">
                        <div className="student_question_title">
                            {question?.screenEndTime && <p>time to preview question : <span>{timer}</span> </p>}
                        </div>
                        <div className="student_question_sec">
                            <div className="transcribed_block">
                                <div className="transcribed_title">
                                    <p>show transcribed text</p>
                                </div>
                                <div className="transcribed_sec">
                                    {/* <h3>{workingQuestion ? workingQuestion : question ? question : "Sorry You Do Not Have Any Question"}</h3> */}
                                    {(screen || work) ? <><h3>{question?.question}</h3>
                                        <div className="transcribed_doc">
                                            {/* <h5>Attachments</h5> */}
                                            {/* <div className="transcribed_doc_block">
                                                <label>
                                                    <p>Upload Image</p>
                                                    <input type="file" />
                                                </label>
                                            </div>
                                            <div className="transcribed_doc_block">
                                                <label>
                                                    <p>Upload Image</p>
                                                    <input type="file" />
                                                </label>
                                            </div>
                                            <div className="transcribed_doc_block">
                                                <label>
                                                    <p>Upload Image</p>
                                                    <input type="file" />
                                                </label>
                                            </div>
                                            <div className="transcribed_doc_block">
                                                <label>
                                                    <p>Upload Image</p>
                                                    <input type="file" />
                                                </label>
                                            </div> */}
                                            {/* {
                                                question?.images?.map((img, idx) => {
                                                    return <>
                                                        <div className="attachments">

                                                            <a href={img}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16">
                                                                    <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                                                    <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
                                                                </svg>  Breatter Image-{idx + 1}
                                                            </a>
                                                        </div>

                                                    </>
                                                })
                                            }
                                            {
                                                question?.docs?.map((doc, idx) => {
                                                    return <>
                                                        <div className="attachments">
                                                            <a href={doc}>

                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16">
                                                                    <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                                                    <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
                                                                </svg> Breatter Docs-{idx + 1}
                                                            </a>

                                                        </div>
                                                    </>
                                                })
                                            } */}
                                            <div className="add_explanation_conte">

                                                {
                                                    question?.images?.map((image) => {
                                                        return <div className="add_explanation_img">
                                                            <a href={image} target='_blank'>   <img src={image} alt="add_explanation_img" /></a>
                                                        </div>
                                                    })
                                                }
                                                {
                                                    question?.docs?.map((doc) => {
                                                        return <div class="container_ifram">
                                                            <iframe class="responsive-iframe" src={doc}></iframe>
                                                        </div>

                                                    })
                                                }


                                            </div>
                                        </div></> : <h3> Sorry You Do Not Have Any Question</h3>}

                                </div>
                            </div>
                            <div className="student_question_btn">
                                <div className="skip_question_btn">

                                    {!work && screen && <div onClick={handleSkipQuestion}> <a style={{ cursor: 'pointer' }}>Skip Question</a></div>}
                                </div>
                                <div className="Start_answering_btn">
                                    {(work) ? <><Link to={`/AddExplanationpage/${question._id}`}>Continue Answering</Link></> : (!work && screen) ? <><Link to={`/AddExplanationpage/${question._id}`}>  Start Answering</Link></> : null}
                                </div>
                            </div>
                            {/* <div className="student_question_submit">
                                <div className="student_question_exit">
                                    <a href="#0">exit</a>
                                </div>
                                <div className="student_question_submit_btn">
                                    <a href="#0">submit</a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default StudentQuestion;