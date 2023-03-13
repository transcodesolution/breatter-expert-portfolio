import React from "react";

import Container from 'react-bootstrap/Container';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import contact_us_img1 from '../../Assets/images/contact_us_img1.png';

import testimonials_img1 from '../../Assets/images/testimonials_img1.png';
import testimonials_img2 from '../../Assets/images/testimonials_img2.png';
import testimonials_img3 from '../../Assets/images/testimonials_img3.png';
import testimonials_img4 from '../../Assets/images/testimonials_img4.png';

import contact_us_img2 from '../../Assets/images/contact_us_img2.png';
import contact_us_img3 from '../../Assets/images/contact_us_img3.png';
import contact_us_img4 from '../../Assets/images/contact_us_img4.png';
import contact_us_img5 from '../../Assets/images/contact_us_img5.png';
import contact_us_img6 from '../../Assets/images/contact_us_img6.png';
import contact_us_img7 from '../../Assets/images/contact_us_img7.png';
import contact_us_img8 from '../../Assets/images/contact_us_img8.png';
import contact_us_img9 from '../../Assets/images/contact_us_img9.png';
import contact_us_img10 from '../../Assets/images/contact_us_img10.png';
import contact_us_img11 from '../../Assets/images/contact_us_img11.png';
import contact_us_img12 from '../../Assets/images/contact_us_img12.png';
import { useNavigate } from "react-router-dom";

const ContactUs = () =>{
    const navigate=useNavigate()

    var testimonials = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
    
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 3,
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 450,
                settings: {
                  slidesToShow: 1,
                }
              },
          ]
      };
      const handleRedirectToTicket=()=>{
        navigate('/support')
      }

    return(
        <div className="contact_us_wrapper">
            <Container>
                <div className="contact_us_wrap">
                    <div className="contact_us_block">
                        <div className="contact_us_title">
                            <p>Q & A Support</p>
                        </div>
                        <div className="contact_us_sec">
                            <div className="contact_submit_block" style={{cursor:'pointer'}} onClick={handleRedirectToTicket}>
                                <img src={contact_us_img1} alt="contact_us_img" />
                                <h3>Submit a Ticket</h3>
                                <p>3-4 working days waiting at least! No patience? Please be our Solution Hub's guest!</p>
                            </div>
                            <div className="contact_us_slider">
                                <div className="testimonials_sec">
                                    <Slider {...testimonials}>
                                        <div>
                                            <div className="testimonials_img">
                                                <img src={testimonials_img1} alt="testimonials_img" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="testimonials_img">
                                                <img src={testimonials_img2} alt="testimonials_img" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="testimonials_img">
                                                <img src={testimonials_img3} alt="testimonials_img" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="testimonials_img">
                                                <img src={testimonials_img4} alt="testimonials_img" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="testimonials_img">
                                                <img src={testimonials_img3} alt="testimonials_img" />
                                            </div>
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                            <div className="contact_us_popular">
                                <div className="contact_us_popular_title">
                                    <h2>Popular Articles</h2>
                                </div>
                                <ul className="contact_us_popular_block">
                                    <li>
                                        <div className="contact_us_popular_sec">
                                            <img src={contact_us_img2} alt="contact_us_img" />
                                            <p>CF Score</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact_us_popular_sec">
                                            <img src={contact_us_img3} alt="contact_us_img" />
                                            <p>How to Solve <br /> on Q&A Borad</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact_us_popular_sec">
                                            <img src={contact_us_img4} alt="contact_us_img" />
                                            <p>Subject Modification</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact_us_popular_sec">
                                            <img src={contact_us_img5} alt="contact_us_img" />
                                            <p>Account Status</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact_us_popular_sec">
                                            <img src={contact_us_img6} alt="contact_us_img" />
                                            <p>Payment ,TDS <br /> & Bank Details</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact_us_popular_sec">
                                            <img src={contact_us_img7} alt="contact_us_img" />
                                            <p>Skip Related</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact_us_popular_sec">
                                            <img src={contact_us_img8} alt="contact_us_img" />
                                            <p>Quality Review</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact_us_popular_sec">
                                            <img src={contact_us_img9} alt="contact_us_img" />
                                            <p>How to give a good <br /> quality solution</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact_us_popular_sec">
                                            <img src={contact_us_img10} alt="contact_us_img" />
                                            <p>Best Login Time</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact_us_popular_sec">
                                            <img src={contact_us_img11} alt="contact_us_img" />
                                            <p>To upload images <br /> in the solution</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact_us_popular_sec">
                                            <img src={contact_us_img12} alt="contact_us_img" />
                                            <p>No Questions <br /> in the queue</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default ContactUs;