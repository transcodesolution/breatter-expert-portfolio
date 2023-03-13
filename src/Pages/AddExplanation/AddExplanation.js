import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ApiGet, ApiPost, ApiUpload } from "../../Helpers/Api/ApiData";
import Container from 'react-bootstrap/Container';
import Editor from "./Editor";
import Pdf from "./Pdf";
import { toast } from "react-toastify";
import Tesseract from 'tesseract.js';
import { useDispatch } from "react-redux";
import { toggleUpdate } from "../../Store/Reducers/Profilereducer/profile";




const AddExplanation = () => {
    const [editorData, setEditorData] = useState(null);
    const [question, setQuestion] = useState(null);
    const [timer, setTimer] = useState('00:00:00');
    const [images, setImages] = useState([]);
    const [docs, setDocs] = useState([]);
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const Ref = useRef(null);

    const navigate = useNavigate();

    const { id } = useParams();


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
        if (total == 0 && hours == 0 && minutes == 0 && seconds == 0) {
            handleSkipQuestion()
            navigate('/')
            toast.error("Time Out For Answering Question")
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
    const acceptQuestion = () => {
        try {
            ApiPost('/question/accept', {
                qId: id
            }).then((response) => {
                let res = response?.data?.data
                let timeDiff = Number(new Date(res.answeringDeadline).getTime() - new Date().getTime()) / 1000;
                console.log((new Date((res.answeringDeadline)).getTime() - new Date().getTime()) / 1000, res.answeringDeadline)
                clearTimer(getDeadTime(timeDiff));
                setQuestion(res);

            })
        } catch (error) {

        }
    }
    const getQuestion = () => {
        ApiGet('/question/get').then((response) => {
            console.log(response)
            let res = response?.data?.data
            if (res.onScreen && !res.onWork) {
                acceptQuestion();
            }
            else if (res.onScreen || res.onWork) {
                let timeDiff = Number(new Date(res.question?.answeringDeadline).getTime() - new Date().getTime()) / 1000;
                console.log((new Date(res.question?.answeringDeadline).getTime() - new Date().getTime()) / 1000, res.question?.answeringDeadline)
                clearTimer(getDeadTime(timeDiff));
                setQuestion(res?.question);
            }
            else {
                alert("Your Question Reposetry Is Empty")
            }
        })
    }
    const handleAnswerSubmit = () => {
        try {
            if (editorData) {
                ApiPost('/question/submit', {
                    qId: question._id,
                    answer: editorData,
                    images: images,
                    docs: images
                }).then((response) => {
                    dispatch(toggleUpdate())
                    toast.success("Answer Submited")
                    navigate('/StudentQuestionpage')
                }).catch((err) => toast.error(err.message))
            }

        } catch (error) {

        }
    }
    const handleSkipQuestion = () => {
        ApiPost('/question/skip', {
            qId: question._id
        }).then((res) => {
            dispatch(toggleUpdate())
            toast.success('Question Is Skiped')
            if (Ref.current) clearInterval(Ref.current);
            navigate('/')
        }).catch((err) => toast.error(err.message))
    }

    const handleRemoveImage = (img) => {
        let arr = images.filter((data, idx) => data != img)
        setImages(arr)
    }
    const handleimageupload = (event) => {
        let file = event.target.files[0];
        if (file) {

            let formData = new FormData();
            formData.append("image", file);
            try {
                ApiUpload('/upload/profile', formData, {
                    Headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response) => {
                    console.log(response)
                    setImages((val) => {
                        return [...val, response?.data?.data?.image]
                    })
                    // Tesseract.recognize(
                    //     URL.createObjectURL(event.target.files[0]), 'eng',
                    //     {
                    //         logger: m => console.log(m)
                    //     }
                    // )
                    //     .catch(err => {
                    //         toast.error(err)
                    //     })
                    //     .then(result => {

                    //         // let confidence = result.confidence
                    //         console.log(result)
                    //         let text = result.data.text
                    //         setText(text);

                    //     })


                }).catch((err) => toast.error("Something Went Wrong"))
            } catch (error) {
                toast.error("Internal Server Error")
            }

        }

    }


    useEffect(() => {
        getQuestion();
    }, [])
    if (question == null || !question)
        return "Sorry You Do Not Have Any Question."
    return (
        <div className="add_explanation_wrapper">
            <div className="add_explanation_wrap">
                <Container>

                    <div className="add_explanation_block">
                        <div className="student_question_title">
                            <p>time to preview Document Upload : <span>{timer}</span> </p>
                        </div>
                        <div className="add_explanation_conte">
                            <h3>{question?.question ? question?.question : "Sorry But You Do Not Have Any Question"}</h3>
                            {
                                question?.images?.map((image) => {
                                    return <div className="add_explanation_img">
                                        <a href={image} target='_blank'>    <img src={image} alt="add_explanation_img" /> </a>
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
                        <div className="add_explanation_select">
                            <div className="terms_condition_select">
                                <p style={{ background: '#889277', padding: '12px', borderRadius: '12px', marginBottom: '12px', color: 'white' }}>Scanned Document</p>
                            </div>
                        </div>
                        <div>
                            {question?.transcribeQuestion}
                        </div>
                        <div className="add_explanation_sec">
                            <div className="add_explanation_answer">
                                <p>Answer</p>
                            </div>
                            <div className="add_explanation_editor">
                                <Editor setEditorData={setEditorData} />
                                {
                                    images?.map((img) => {
                                        return <>
                                            <div className="attachments">
                                                <a href="#0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-x" viewBox="0 0 16 16" onClick={() => handleRemoveImage(img)}>
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16">
                                                        <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                                        <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
                                                    </svg>  {img}
                                                </a>

                                            </div>
                                        </>
                                    })
                                }

                            </div>
                            <div className="upload_drop_editor">
                                <label for="upload_drop1">Upload and drop question Image</label>



                                <input id="upload_drop1" type="file" onChange={handleimageupload} />
                            </div>
                        </div>
                        <div className="add_explanation_btn_block">
                            <div className="add_explanation_next_btn_block">
                                <div className="add_explanation_exit_btn add_explanation_cm_btn">

                                    <Link to="/StudentQuestionpage">exit</Link>
                                </div>
                                <div className="add_explanation_skip_btn add_explanation_cm_btn">
                                    <a style={{ color: 'black', cursor: 'pointer', fontWeight: '700' }} onClick={handleSkipQuestion}>skip question</a>

                                </div>

                            </div>
                            <div className="add_explanation_submit_btn_block">
                                {/* <div className="add_explanation_arrow_btn">
                                    <a href="#0">
                                        <svg width="37" height="31" viewBox="0 0 37 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M33.959 13.2918H7.76815L15.7844 3.66349C16.1592 3.21252 16.3396 2.6311 16.2857 2.04716C16.2319 1.46322 15.9483 0.924584 15.4973 0.549745C15.0463 0.174905 14.4649 -0.0054315 13.881 0.0484071C13.297 0.102246 12.7584 0.38585 12.3836 0.836828L1.3419 14.0868C1.26761 14.1922 1.20118 14.3029 1.14315 14.4181C1.14315 14.5285 1.14315 14.5947 0.988568 14.7052C0.888472 14.9584 0.836063 15.2279 0.833984 15.5002C0.836063 15.7724 0.888472 16.042 0.988568 16.2952C0.988568 16.4056 0.988567 16.4718 1.14315 16.5822C1.20118 16.6974 1.26761 16.8081 1.3419 16.9135L12.3836 30.1635C12.5912 30.4128 12.8512 30.6132 13.1451 30.7507C13.439 30.8881 13.7596 30.959 14.084 30.9585C14.6 30.9595 15.1 30.7798 15.4973 30.4506C15.7209 30.2652 15.9058 30.0375 16.0413 29.7806C16.1767 29.5236 16.2602 29.2425 16.2869 28.9533C16.3135 28.664 16.2829 28.3724 16.1967 28.095C16.1104 27.8176 15.9703 27.56 15.7844 27.3368L7.76815 17.7085H33.959C34.5447 17.7085 35.1064 17.4758 35.5205 17.0617C35.9347 16.6475 36.1673 16.0858 36.1673 15.5002C36.1673 14.9145 35.9347 14.3528 35.5205 13.9386C35.1064 13.5245 34.5447 13.2918 33.959 13.2918Z" fill="black"/>
                                        </svg>
                                    </a>
                                </div> */}
                                <div className="add_explanation_submit_btn">
                                    <a style={{ color: 'white', cursor: 'pointer' }} onClick={handleAnswerSubmit}>submit</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default AddExplanation;