import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';

import Select from 'react-select';
import { useDispatch } from "react-redux";
import { ApiGet } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import { setLogout } from "../../Store/Reducers/Authreducer/auth";

const TermsCondition = () => {
    const [condition, setCondition] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [subjectID, setSubjectID] = useState(null);
    const navigate = useNavigate();
    const dispatch= useDispatch();

    const handleCondition = () => {
        setCondition(!condition)
    }
    const handleStartExam = () => {
        if (subjectID) {
            navigate(`/ExamdurationPage?subjectID=${subjectID}`)
        } else {
            toast.error("Select Atleast One Subject")
        }
    }
    const handleSubjectSelect = (id) => {
        console.log(id)
        setSubjectID(id);
    }
    useEffect(() => {
        ApiGet('/subject/all').then((response)=>{
            console.log("exam", response.data.data)
            let arr = response?.data?.data.map((obj) => {
                let name = obj.name
                let _id = obj._id
                return {
                    value: name,
                    label: name,
                    _id
                }
            })
            setSubjects(arr)
        }).catch((err)=>{
            if(err.status==401){
                dispatch(setLogout())
                navigate('/LoginPage')
            }
        })

    }, [])

    return(
        <div className="terms_condition_wrapper">
            <div className="terms_condition_wrap">
                <Container>
                    <div className="terms_condition_block">
                        <div className="terms_condition_sec">
                            <div className="terms_condition_conte">
                                <h3>select subject</h3>
                                {subjects?.length != 0 && <div className="terms_condition_select">
                                    <Select options={subjects} onChange={(event) => handleSubjectSelect(event._id)} />
                                </div>}
                            </div>
                        </div>
                        <div className="condition_wrap">
                            <div className="condition_block">
                                <div className="condition_title">
                                    <h3>terms & condition</h3>
                                    <p>last updated : 21 feb, 2022</p>
                                </div>
                                <div className="condition_sec">
                                    <div className="condition_conte">
                                        <div className="condition_inner_cont">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus venenatis 
                                            eros consectetur egestas vitae id nisi. Nam pulvinar massa at diam consequat gravida. 
                                            Quisque risus nunc, imperdiet venenatis interdum non, aliquam ut lacus. Quisque elementum
                                            fringilla est nec cursus. Donec diam quam, posollicitudin auctor. Donec finibus diam sit
                                            amet sapien ullamcorper scelerisque. Donec aliquam bibendum dui a cursus</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec consectetur egestas vitae id nisi. 
                                            Nam pulvinar scelerisque. Donec aliquam bibendum dui a cursus</p>
                                        </div>
                                        <div className="condition_inner_cont">
                                            <h4>sed a enib diam</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus venenatis 
                                            eros consectetur egestas vitae id nisi. Nam pulvinar massa at diam consequat gravida. 
                                            Quisque risus nunc, imperdiet venenatis interdum non, aliquam ut lacus. Quisque elementum
                                             fringilla est nec cursus. Donec diam quam, posollicitudin auctor. Donec finibus 
                                            diam sit amet sapien ullamcorper scelerisque. Donec aliquam bibendum dui a cursus</p>
                                        </div>
                                        <div className="condition_inner_cont">
                                            <h4>sed a enib diam</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus venenatis 
                                            eros consectetur egestas vitae id nisi. Nam pulvinar massa at diam consequat gravida. 
                                            Quisque risus nunc, imperdiet venenatis interdum non, aliquam ut lacus. Quisque elementum
                                             fringilla est nec cursus. Donec diam quam, posollicitudin auctor. Donec finibus 
                                            diam sit amet sapien ullamcorper scelerisque. Donec aliquam bibendum dui a cursus</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus venenatis 
                                            eros consectetur egestas vitae id nisi. Nam pulvinar massa at diam consequat gravida. 
                                            Quisque risus nunc, imperdiet venenatis interdum non, aliquam ut lacus. Quisque elementum
                                             fringilla est nec cursus. Donec diam quam, posollicitudin auctor. Donec finibus 
                                            diam sit amet sapien ullamcorper scelerisque. Donec aliquam bibendum dui a cursus</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus venenatis 
                                            eros consectetur egestas vitae id nisi. Nam pulvinar massa at diam consequat gravida. 
                                            Quisque risus nunc, imperdiet venenatis interdum non, aliquam ut lacus. Quisque elementum
                                             fringilla est nec cursus. Donec diam quam, posollicitudin auctor. Donec finibus 
                                            diam sit amet sapien ullamcorper scelerisque. Donec aliquam bibendum dui a cursus</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus venenatis 
                                            eros consectetur egestas vitae id nisi. Nam pulvinar massa at diam consequat gravida. 
                                            Quisque risus nunc, imperdiet venenatis interdum non, aliquam ut lacus. Quisque elementum
                                             fringilla est nec cursus. Donec diam quam, posollicitudin auctor. Donec finibus 
                                            diam sit amet sapien ullamcorper scelerisque. Donec aliquam bibendum dui a cursus</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="condition_btn" style={{cursor:'pointer'}} >
                                    {condition ? <a style={{ background: '#b3b3b3' }} onClick={handleCondition}>accepted</a> : <a style={{ color: 'white' }} onClick={handleCondition}>accept</a>}
                                </div>
                            </div>
                        </div>
                        {condition && <div className="terms_condition_btn" onClick={handleStartExam}  style={{cursor:'pointer'}}>
                            <a >Start Exam</a>
                        </div>}
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default TermsCondition;