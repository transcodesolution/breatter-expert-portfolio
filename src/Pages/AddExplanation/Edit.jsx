import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ApiGet, ApiPost, ApiUpload } from "../../Helpers/Api/ApiData";
import Container from 'react-bootstrap/Container';

import add_explanation_img from '../../Assets/images/add_explanation_img.png'
import Editor from "./Editor";
import Pdf from "./Pdf";
import { toast } from "react-toastify";

const Edit = () => {
    const [editorData, setEditorData] = useState(null);
    const [question, setQuestion] = useState(null);
    const [timer, setTimer] = useState('00:00:00');
    const [images, setImages] = useState([]);
    const [docs, setDocs] = useState([]);

    const Ref = useRef(null);

    const navigate = useNavigate();

    const { id } = useParams();






    const getQuestion = () => {
        ApiPost('/question/edit/get', {
            "answerId": id
        }).then((response) => {
            console.log(response, "get")
            let res = response?.data?.data[0]
            setImages(res.images)
            setQuestion(res);
        })
    }

    const handleAnswerSubmit = () => {
        console.log(question._id,
            editorData,
            images,
            images)
        try {
            if (editorData) {
                ApiPost('/question/submit', {
                    qId: question._id,
                    answer: editorData,
                    images: images,
                    // docs: images
                }).then((response) => {
                    console.log(response)
                    toast.success("Answer Submited")
                    navigate('/StudentQuestionpage')
                }).catch((err) => toast.error(err.message))
            }

        } catch (error) {

        }
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

                }).catch((err) => toast.error("Something Went Wrong"))
            } catch (error) {
                toast.error("Internal Server Error")
            }

        }

    }
    const handleRemoveImage = (img) => {


        let arr = images.filter((data, idx) => data != img)
        setImages(arr)
    }


    useEffect(() => {
        getQuestion();
    }, [])
    // if (question == null || !question)
    //     return "Waiting To Fetch..."
    return (
        <div className="add_explanation_wrapper">
            <div className="add_explanation_wrap">
                <Container>

                    <div className="add_explanation_block">

                        <div className="add_explanation_conte">
                            <h3>{question?.question?.question}</h3>
                            {
                                question?.question?.images.map((image) => {
                                    return <div className="add_explanation_img">
                                        <img src={'https://picsum.photos/seed/picsum/200/300'} alt="add_explanation_img" />
                                    </div>
                                })
                            }
                            {
                                question?.docs?.map((doc) => {
                                    return <Pdf pdf={doc} ></Pdf>
                                })
                            }




                        </div>
                        <div className="add_explanation_sec">
                            <div className="add_explanation_answer">
                                <p>Answer</p>
                            </div>
                            <div className="add_explanation_editor">
                                <Editor setEditorData={setEditorData} preData={question?.answer} />
                                {
                                    images?.map((img, idx) => {
                                        return <>
                                            <div className="attachments">
                                                <a href="#0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-x" viewBox="0 0 16 16" onClick={() => handleRemoveImage(img)}>
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16">
                                                        <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                                        <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
                                                    </svg>      Documrnt File- {idx + 1}
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

                            <div className="add_explanation_submit_btn_block">
                                <div className="add_explanation_submit_btn">
                                    <a style={{ color: 'white', cursor: 'pointer' }} onClick={handleAnswerSubmit}>Confirm</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Edit;