import React, { useEffect, useState } from "react";

import Container from 'react-bootstrap/Container';
import Accordion from '../FAQ/Accordion';
import faq_s_icon from '../../Assets/images/faq_s_icon.png';
import { ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";


const Faq = () =>{
    const [data, setData] = useState([]);

    const getAllFaq = (search) => {
        let body = {};

        if(search) {
            body.search = search
        }
        try {
            ApiPost("/faq", body).then((response) => {
                console.log("faq", response?.data?.data)
                setData(response?.data?.data)
            });
        } catch (error) { toast.error(error.message) }
    }

    const handleSearch = (e) => {
        getAllFaq(e.target.value)
    }

    useEffect(() => {
        getAllFaq()
    },[])
    return(
        <div className="faq_wrapper">
            <Container>
                <div className="faq_wrap">
                    <div className="faq_title">
                        <h2>FAQ</h2>
                    </div>
                 
                    <div className="faq_block">
                        <div className="faq_sec">
                            <Accordion data = {data} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Faq;