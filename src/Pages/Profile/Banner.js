import React from "react";

import Container from 'react-bootstrap/Container';

const Banner = () =>{
    return(
        <div className="qa_banner_wrapper">
            <div className="qa_banner_wrap">
               <Container>
                    <div className="qa_banner_block">
                        <div className="qa_banner_title">
                            <h2>Exam</h2>
                        </div>  
                    </div>
               </Container>
            </div>
        </div>
    )
}

export default Banner;