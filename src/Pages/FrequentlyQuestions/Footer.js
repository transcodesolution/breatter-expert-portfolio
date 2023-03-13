import React from "react";
import { NavLink } from "react-router-dom";

import footer_logo from '../../Assets/images/footer_logo.png';


import f_icon from '../../Assets/images/f_icon.svg';
import t_icon from '../../Assets/images/t_icon.svg';
import i_icon from '../../Assets/images/i_icon.svg';
import g_icon from '../../Assets/images/g_icon.svg';
import in_icon from '../../Assets/images/in_icon.svg';
import p_icon from '../../Assets/images/p_icon.svg';

const Footer = () =>{
    return(
        <div className="qa_footer_wrapper">
            <div className="footer_wrapper">
                <div className="footer_wrap">
                    <div className="footer_sec">
                        <div className="footer_block">
                            <ul className="footer_item"> 
                                <li>
                                    <div className="footer_logo">
                                        <a href="#0">
                                            <img src={footer_logo} alt="logo" />
                                        </a>
                                        <p>
                                            a social questions & Answers <br />
                                            Engine which will help you <br />
                                            establis your community and <br />
                                            connect with other people
                                        </p>
                                    </div>
                                </li>
                                <li>
                                <div className="footer_menu_block">
                                    <h3 className="footer_title">service</h3>
                                        <ul className="footer_menu">
                                            <li><a href="#0">Home</a></li>
                                            <li><a href="#0">About Us</a></li>
                                            <li><a href="#0">Service</a></li>
                                            <li><a href="#0">Blog</a></li>
                                            <li><a href="#0">Contact us</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <div className="footer_menu_block">
                                        <h3 className="footer_title">Useful Links</h3>
                                        <ul className="footer_menu">
                                            <li><NavLink to="/FrequentlyQuestionspage">Question & Answer </NavLink></li>
                                            <li><a href="#0">Solutions</a></li>
                                            <li><NavLink to="/DocUploadpage">Service</NavLink> </li>
                                            <li><a href="#0">Terms & Condition</a></li>
                                            <li><a href="#0">FAQs</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <div className="footer_conte">
                                        <h3 className="footer_title">Our Newsletter</h3>
                                        <p>Stay up to date with news and promotions <br /> by signing up for our newsletter</p>
                                        <label for="email" className="footer_label">
                                            <input id="email" type="email" placeholder="Your Mail" />
                                            <a href="#0" className="email_send"> <span>
                                                <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18.6887 1H2.6554C2.37869 1 2.12817 1.11193 1.94682 1.29289C1.76548 1.47386 1.65332 1.72386 1.65332 2V14C1.65332 14.5523 2.10197 15 2.6554 15H18.6887C19.2422 15 19.6908 14.5523 19.6908 14V2C19.6908 1.72386 19.5787 1.47386 19.3973 1.29289C19.2159 1.11193 18.9654 1 18.6887 1Z" stroke="#7F8770" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M1.94629 1.29297L9.25439 8.58582C10.037 9.36692 11.3061 9.36692 12.0887 8.58582L19.3968 1.29297" stroke="#7F8770" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </span> Send</a>
                                        </label>
                                        <ul>
                                            <li><a href="#0">
                                                <img src={f_icon} alt="icon" />
                                            </a></li>
                                            <li><a href="#0">
                                                <img src={t_icon} alt="icon" />
                                            </a></li>
                                            <li><a href="#0">
                                                <img src={i_icon} alt="icon" />
                                            </a></li>
                                            <li><a href="#0">
                                                <img src={g_icon} alt="icon" />
                                            </a></li>
                                            <li><a href="#0">
                                                <img src={in_icon} alt="icon" />
                                            </a></li>
                                            <li><a href="#0">
                                                <img src={p_icon} alt="icon" />
                                            </a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;