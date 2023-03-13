import React, { useState } from "react";
import {NavLink } from "react-router-dom";

import Container from 'react-bootstrap/Container';

import logo from '../../Assets/images/logo.png';
import profile from '../../Assets/images//profile.png';

const Header = () =>{

    const [active, setActive] = useState()
    const toggleClass = () =>{
        setActive(!active);
        document.documentElement.classList.toggle("cm_overflow");
    }

    return(
        <div className="header_wrapper">
            <div className={ `header_wrap ${(active ? 'menu_open' : '')}` }>
                <Container>
                    <div className="header_block">
                        <div className="logo_block">
                            <NavLink to="/">
                                <img src={logo} alt="" />
                            </NavLink>
                        </div>
                        <div className="mobile_menu">
                            <div className="menu_wrap">
                                <ul className="menu_block">
                                    <li><a href="#0">Home</a></li>
                                    <li><a href="#0" className="active">Q & A</a></li>
                                    <li><a href="#0">Subscription</a></li>
                                </ul>
                            </div>
                            <div className="comman_btn">
                                <div className="qa_profile">
                                    <NavLink to="/Loginpage">
                                        <img src={profile} alt="qa_profile" />
                                        <span>Coli Den </span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="menu_toggle_btn" onClick={toggleClass}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Header;