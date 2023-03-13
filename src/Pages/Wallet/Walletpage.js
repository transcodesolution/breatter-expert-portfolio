import React from "react";

import Header from '../Wallet/Header';
import Banner from '../Wallet/Banner';
import Wallet from '../Wallet/Wallet';
import Footer from '../Wallet/Footer';

const Walletpage = () =>{
    return(
        <div className="wallet_page">
            {/* <Header /> */}
            <Banner />
            <Wallet />
            {/* <Footer /> */}
        </div>
    )
}

export default Walletpage;