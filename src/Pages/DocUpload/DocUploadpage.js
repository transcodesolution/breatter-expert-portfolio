import React from "react";

import Header from "../DocUpload/Header";
import Banner from "../DocUpload/Banner";
import UploadForm from '../DocUpload/UploadForm';
import Footer from "../DocUpload/Footer";

const DocUploadpage = () =>{
    return(
        <div className="doc_upload_page">
            <Banner />
            <UploadForm />
            <Footer />
        </div>
    )
}

export default DocUploadpage;