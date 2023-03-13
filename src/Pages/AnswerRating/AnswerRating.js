import React, { useEffect, useState } from "react";

import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Modal from 'react-bootstrap/Modal';
import f_rating_img1 from '../../Assets/images/f_rating_img1.png';
import f_rating_img2 from '../../Assets/images/f_rating_img2.png';
import f_rating_img3 from '../../Assets/images/f_rating_img3.png';
import f_rating_img4 from '../../Assets/images/f_rating_img4.png';
import f_rating_img5 from '../../Assets/images/f_rating_img5.png';
import star from '../../Assets/images/star.png';
import { ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AnswerRating = () => {

    const [myQuestion, setMyQuestion] = useState([])
    const [show, setShow] = useState(false);
    const profile = useSelector(state => state.profile.profile);
    const [selected, setSelected] = useState()
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const navigate = useNavigate();

    const getQuestionwithRating = () => {
        try {
            ApiPost('/question/my/get').then((response) => {
                console.log("my question", response?.data?.data)
                setMyQuestion(response?.data?.data)
            }).catch((err) => {
                toast.error(err.message)
            })
        } catch (error) {

        }
    }
    const handleEdit = (question) => {
        handleShow();

    }

    const handleContinue = () => {
        handleClose()
        ApiPost('/question/edit',
            {
                "questionId": selected.question._id,
                "answerId": selected._id,
                "isFromWallet": true
            }
        ).then((response) => {
            let res = response.data.data
            navigate(`/editExplantion/${selected._id}`)
            // axios.post(`${process.env.BASE_URL}/user/stripe/pay?orderId=${res._id}&userId=${profile._id}`).then((response)=>console.log(response)).catch((err)=>toast.error(err.message))
            // axios.get(`http://192.168.29.132:80/user/stripe/pay?orderId=${res._id}&userId=${profile._id}`).then((response) => window.open(response?.data?.data, '_blank', 'noreferrer')).catch((err) => toast.error(err.message))

            // ApiGet(`/stripe/pay?orderId=${res._id}&userId=${profile._id}`).then((response) => {

            //     window.open(response?.data?.data, '_blank', 'noreferrer')
            // })
        }).catch((err) => toast.error(err.message))
    }



    useEffect(() => {
        getQuestionwithRating()
    }, [])


    return (<>
        <div className="question_accordion_wrapper">
            <div className="question_accordion_wrap">
                <Container>
                    <div className="question_accordion_block">
                        <div className="question_accordion_sec">
                            <div className="question_accordion">
                                <Accordion defaultActiveKey={['1', '2']} >
                                    {myQuestion.map((data, index) => {

                                        return <Accordion.Item eventKey={String(index)} style={{ marginBottom: '15px' }}>
                                            <Accordion.Header>
                                                <div className="answer_rating_title_block">
                                                    <div className="answer_rating_title_img">
                                                        <span>ratings :- </span> {new Array(data?.question?.feedback).fill(0)?.map((single) => <img src={star} alt="faq_rating" />)}
                                                    </div>
                                                    <div className="answer_rating_title">
                                                        <h2>que. {index+1   }</h2>
                                                        <p>{data?.question?.question}</p>
                                                    </div>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="question_accordion_conte">
                                                    <div className="answer_rating_block">
                                                        <h3>ANSWER :-</h3>
                                                        <div className="answer_rating_sec">
                                                            <p>
                                                            <div dangerouslySetInnerHTML={{__html: data?.answer}}></div>
                                                                {/* {data?.answer} */}
                                                            </p>
                                                            <div className="question_accordion_doc">
                                                                <div className="question_accordion_doc1">

                                                                    {
                                                                        data?.docs.map((image, _idx) => {
                                                                            return <div className="my_questions_tab_doc1">
                                                                                <span > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-pdf" viewBox="0 0 16 16">
                                                                                    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                                                                                    <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                                                                                </svg></span> <span><a href={image} className="uploaded_files"> Document File -{_idx + 1}</a></span>
                                                                            </div>
                                                                        })
                                                                    }
                                                                </div>
                                                                <div className="question_accordion_doc1">
                                                                    {
                                                                        data?.images.map((image, _idx) => {
                                                                            return <div className="my_questions_tab_doc1">
                                                                                <span > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-pdf" viewBox="0 0 16 16">
                                                                                    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                                                                                    <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                                                                                </svg></span> <span><a href={image} className="uploaded_files"> Image File -{_idx + 1}</a></span>
                                                                            </div>
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="answer_rating_icon_block">
                                                        <div className="answer_rating_icon_sec">
                                                            <div className="answer_rating_left_icon">
                                                                <a href="#0"><img src={f_rating_img1} alt="f_rating_img" /></a>
                                                                <a href="#0"><img src={f_rating_img2} alt="f_rating_img" /></a>
                                                            </div>
                                                            <div className="answer_rating_right_icon">
                                                                <span>More links :- </span>
                                                                <a href="#0"><img src={f_rating_img3} alt="f_rating_img" /></a>
                                                                <a href="#0"><img src={f_rating_img4} alt="f_rating_img" /></a>
                                                                <a href="#0"><img src={f_rating_img5} alt="f_rating_img" /></a>
                                                                <a href="#0" className="edit_btn" onClick={() => {
                                                                    handleEdit(data)
                                                                    setSelected(data)
                                                                }}>edit</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    })}

                                </Accordion>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
        <Modal className='duration_model' centered show={show} onHide={handleClose} animation={false}>
            {/* <Modal.Header closeButton></Modal.Header> */}
            <Modal.Body>
                <div className='duration_model_block'>
                    <div className='duration_model_conte'>

                        <div className="duration_model_title">
                            <h4>Are You Sure???      Money Will Diduct From Your Wallet</h4>
                            <div className="duration_model_btn">
                                <a href="#0">
                                    <span onClick={handleContinue}>
                                        Continue
                                    </span></a>
                            </div>

                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
    )
}

export default AnswerRating;