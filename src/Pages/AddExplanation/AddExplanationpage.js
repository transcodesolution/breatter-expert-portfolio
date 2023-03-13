import React  from "react";

import Header from '../AddExplanation/Header';
import Banner from '../AddExplanation/Banner';
import AddExplanation from '../AddExplanation/AddExplanation';
import Footer from '../AddExplanation/Footer';

const AddExplanationpage = () =>{
    return(
        <div className="add_explanation_page">
            {/* <Header /> */}
            <Banner />
            <AddExplanation />
            {/* <Footer /> */}
        </div>
    )
}

export default AddExplanationpage;