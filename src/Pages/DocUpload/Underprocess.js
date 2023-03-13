import React from "react";

import Banner from "../DocUpload/Banner";
import Footer from "../DocUpload/Footer";

const Underprocess = () => {
  return (
    <div className="doc_upload_page">
      <Banner />
      <div className="Under_Process"> Your Document Is Under Process</div>
      <Footer />  
    </div>
  );
};

export default Underprocess;
