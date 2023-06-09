import React, { useEffect, useRef, useState } from "react";

import Container from 'react-bootstrap/Container';

import chat_img from '../../Assets/images/chat_img.png';
import chat_img1 from '../../Assets/images/chat_img1.png';
import chat_img2 from '../../Assets/images/chat_img2.png';

import chat_img10 from '../../Assets/images/chat_img10.png';
import chat_img11 from '../../Assets/images/chat_img11.png';
import chat_img12 from '../../Assets/images/chat_img12.png';
import chat_img13 from '../../Assets/images/chat_img13.png';
import chat_img14 from '../../Assets/images/chat_img14.png';
import chat_img15 from '../../Assets/images/chat_img15.png';
import chat_img16 from '../../Assets/images/chat_img16.png';
import chat_img17 from '../../Assets/images/chat_img17.png';
import chat_img18 from '../../Assets/images/chat_img18.png';

import { useSelector } from "react-redux";
// import ComingSoonpage from "../ComingSoon/ComingSoonpage";

const ChatUs = ({ sideBarUsers, socket }) => {

    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState(null)
    const [active1, setActive1] = useState()
    const [active, setActive] = useState()
    const lastMessageRef = useRef(null);


    const user = useSelector((state) => state.profile.profile);

    const toggleClass = () => {
        setActive(!active);
    }

    const toggleClass1 = () => {
        setActive1(!active1);
        document.documentElement.classList.toggle("chat_chat_open");
    }

    const handlejoinroom = (singleReceiver) => {

        if (!selectedRoom?._id) {
            socket.emit('join_room', {
                roomId: singleReceiver?._id,
                userId: user?._id
            })
        } else {
            socket.emit('switch', {
                nextRoom: singleReceiver?._id,
                prevRoom: selectedRoom?._id
            })
        }
        setMessages(singleReceiver?.mes)
        setSelectedRoom(singleReceiver)
    }

    const handleSendmessage = () => {
        if (message) {
            socket.emit('send_message', {
                roomId: selectedRoom._id,
                senderId: user._id,
                receiverId: selectedRoom.expert[0]?._id || selectedRoom.admin[0]._id,
                message
            })
            setMessages([...messages, {
                roomId: selectedRoom._id,
                senderId: user._id,
                receiverId: selectedRoom.expert[0]?._id || selectedRoom.admin[0]._id,
                message
            }])
            setMessage("")
        }
    }

    const handlekeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendmessage()
        }
    }

    useEffect(() => {
        socket?.on('receive_message', (data) => {
            setMessages([...messages, data])
        });
    }, [socket, messages]);
    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // return <ComingSoonpage></ComingSoonpage>
    return (
        <div className="chat_us_wrapper">
            <Container>
                <div className="chat_us_section">
                    <div className="chat_profile_block">
                        <div className="chat_profile_wrap">
                            <div className="chat_profile_sec">
                                <div className="chat_profile_title">
                                    <h3>Chats</h3>
                                    <label>
                                        <span>
                                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.39407 7.34015L6.74072 5.68708C6.6661 5.61247 6.56494 5.57102 6.4588 5.57102V5.57102C6.349 5.57102 6.28585 5.44332 6.34652 5.3518C6.7081 4.8064 6.91816 4.15254 6.91816 3.44873C6.91816 1.54364 5.37426 0 3.46885 0C1.56343 0 0.0195312 1.54364 0.0195312 3.44873C0.0195312 5.35382 1.56343 6.89745 3.46885 6.89745C4.1728 6.89745 4.82679 6.68742 5.37229 6.32588C5.46382 6.26522 5.5915 6.32837 5.5915 6.43817V6.43817C5.5915 6.54429 5.63296 6.64543 5.70758 6.72004L7.36093 8.37311C7.51682 8.52896 7.76888 8.52896 7.92311 8.37311L8.39241 7.90388C8.54829 7.74803 8.54829 7.496 8.39407 7.34015ZM3.46885 5.57102C2.29641 5.57102 1.34619 4.62262 1.34619 3.44873C1.34619 2.27649 2.29475 1.32643 3.46885 1.32643C4.64128 1.32643 5.5915 2.27483 5.5915 3.44873C5.5915 4.62096 4.64294 5.57102 3.46885 5.57102Z" fill="#464141" />
                                            </svg>
                                        </span>
                                        <input type="text" placeholder="Search here...." />
                                    </label>
                                </div>
                                <div className="chat_profile_user">
                                    <p>DIRECT MESSAGES</p>
                                    <ul>
                                        {
                                            sideBarUsers?.map((receiver) => {
                                                return <li onClick={() => handlejoinroom(receiver)}>
                                                    <a href="#0">
                                                        <div className="chat_profile_name">
                                                            <div>
                                                                <img src={chat_img10} alt="chat_img" />
                                                                <span>Anonymous</span>
                                                            </div>
                                                            <p>9</p>
                                                        </div>
                                                    </a>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chat_us_conte">
                        <div className="chat_us_block">
                            <div className="chat_us_sec">
                                <div className="chat_us_name">
                                    <img src={chat_img} alt="" />
                                    <div>
                                        <p>User</p>
                                        <span>Online</span>
                                    </div>
                                </div>
                                <div className="chat_open_icon" onClick={toggleClass1}>
                                    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.007 2c-5.518 0-9.998 4.48-9.998 9.998 0 5.517 4.48 9.997 9.998 9.997s9.998-4.48 9.998-9.997c0-5.518-4.48-9.998-9.998-9.998zm1.523 6.21s1.502 1.505 3.255 3.259c.147.147.22.339.22.531s-.073.383-.22.53c-1.753 1.754-3.254 3.258-3.254 3.258-.145.145-.335.217-.526.217-.192-.001-.384-.074-.531-.221-.292-.293-.294-.766-.003-1.057l1.977-1.977h-6.693c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h6.693l-1.978-1.979c-.29-.289-.287-.762.006-1.054.147-.147.339-.221.53-.222.19 0 .38.071.524.215z" fill-rule="nonzero" /></svg>
                                </div>
                                <div className="chat_us_notice">
                                    <div className="chat_us_notice_btn" onClick={toggleClass}>
                                        <svg width="6" height="21" viewBox="0 0 6 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.98294 5.66303C4.3679 5.66303 5.50104 4.52989 5.50104 3.14493C5.50104 1.75998 4.3679 0.626831 2.98294 0.626831C1.59799 0.626831 0.464844 1.75998 0.464844 3.14493C0.464844 4.52989 1.59799 5.66303 2.98294 5.66303ZM2.98294 8.18113C1.59799 8.18113 0.464844 9.31428 0.464844 10.6992C0.464844 12.0842 1.59799 13.2173 2.98294 13.2173C4.3679 13.2173 5.50104 12.0842 5.50104 10.6992C5.50104 9.31428 4.3679 8.18113 2.98294 8.18113ZM2.98294 15.7354C1.59799 15.7354 0.464844 16.8686 0.464844 18.2535C0.464844 19.6385 1.59799 20.7716 2.98294 20.7716C4.3679 20.7716 5.50104 19.6385 5.50104 18.2535C5.50104 16.8686 4.3679 15.7354 2.98294 15.7354Z" fill="white" />
                                        </svg>
                                    </div>
                                    <ul>
                                        <li><a href="#0"><svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.65939 1.96466H0.88825C0.835526 1.96466 0.784961 1.98561 0.74768 2.02289C0.710398 2.06017 0.689453 2.11073 0.689453 2.16346V4.94662C0.689453 5.10479 0.752287 5.25649 0.864132 5.36833C0.975978 5.48018 1.12767 5.54301 1.28585 5.54301H5.26179C5.41997 5.54301 5.57166 5.48018 5.68351 5.36833C5.79535 5.25649 5.85818 5.10479 5.85818 4.94662V2.16346C5.85818 2.11073 5.83724 2.06017 5.79996 2.02289C5.76268 1.98561 5.71211 1.96466 5.65939 1.96466ZM5.46059 4.94662C5.46059 4.99935 5.43965 5.04991 5.40236 5.08719C5.36508 5.12447 5.31452 5.14542 5.26179 5.14542H1.28585C1.23312 5.14542 1.18256 5.12447 1.14527 5.08719C1.10799 5.04991 1.08705 4.99935 1.08705 4.94662V4.54903C1.08705 3.34131 2.0661 2.36226 3.27382 2.36226V2.36226C4.48154 2.36226 5.46059 3.34131 5.46059 4.54903V4.94662Z" fill="#4F5050" />
                                            <path d="M5.65939 2.36223H0.88825C0.835526 2.36223 0.784961 2.34128 0.74768 2.304C0.710398 2.26672 0.689453 2.21616 0.689453 2.16343V1.96463C0.689675 1.912 0.710765 1.86159 0.748098 1.82448L1.62579 0.946792C1.73753 0.834915 1.88912 0.77199 2.04724 0.771851H4.5004C4.65852 0.77199 4.81011 0.834915 4.92185 0.946792L5.79954 1.82448C5.83687 1.86159 5.85796 1.912 5.85818 1.96463V2.16343C5.85818 2.21616 5.83724 2.26672 5.79996 2.304C5.76268 2.34128 5.71211 2.36223 5.65939 2.36223ZM1.90709 1.22809C1.63508 1.49973 1.82746 1.96463 2.21188 1.96463H4.33646C4.72085 1.96463 4.91335 1.49989 4.64154 1.22809V1.22809C4.62305 1.20949 4.60106 1.19473 4.57683 1.18466C4.55261 1.1746 4.52663 1.16942 4.5004 1.16945H2.04724C1.9946 1.16967 1.9442 1.19076 1.90709 1.22809V1.22809ZM4.01036 4.09276L3.41397 4.68915C3.41348 4.68963 3.41298 4.6901 3.41248 4.69058C3.39512 4.7071 3.37451 4.71965 3.35334 4.7309V4.7309C3.3421 4.7356 3.33046 4.73926 3.31855 4.74183C3.29365 4.74715 3.26791 4.74715 3.24301 4.74183C3.2311 4.73926 3.21945 4.7356 3.20822 4.7309V4.7309C3.18705 4.71965 3.16643 4.7071 3.14907 4.69058C3.14857 4.6901 3.14808 4.68963 3.14758 4.68915L2.55119 4.09276C2.51862 4.05473 2.5016 4.00581 2.50354 3.95578C2.50547 3.90575 2.52621 3.85828 2.56161 3.82288C2.59702 3.78748 2.64448 3.76673 2.69451 3.7648C2.74455 3.76287 2.79346 3.77989 2.83149 3.81246V3.81246C2.91931 3.90493 3.07502 3.84278 3.07502 3.71525V2.95862C3.07502 2.9059 3.09597 2.85533 3.13325 2.81805C3.17053 2.78077 3.22109 2.75982 3.27382 2.75982C3.32654 2.75982 3.37711 2.78077 3.41439 2.81805C3.45167 2.85533 3.47262 2.9059 3.47262 2.95862V3.70553C3.47262 3.83985 3.6349 3.90725 3.73006 3.81246V3.81246C3.76809 3.77989 3.81701 3.76287 3.86704 3.7648C3.91707 3.76673 3.96453 3.78748 3.99994 3.82288C4.03534 3.85828 4.05608 3.90575 4.05802 3.95578C4.05995 4.00581 4.04293 4.05473 4.01036 4.09276Z" fill="#4F5050" />
                                        </svg>
                                            Archive</a></li>
                                        <li><a href="#0"><svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.56607 5.82828C3.22837 5.82828 3.76769 5.28896 3.76769 4.62666V4.44652C3.76769 3.3322 4.21035 2.26353 4.99829 1.47559V1.47559C5.05342 1.42045 5.05342 1.33069 4.99829 1.27555C4.94315 1.22042 4.85339 1.22042 4.79825 1.27555L3.92613 2.14768C3.86766 2.20615 3.76769 2.16474 3.76769 2.08205V2.08205C3.76769 1.41975 3.22837 0.880432 2.56607 0.880432C1.90377 0.880432 1.36445 1.41975 1.36445 2.08205V4.62666V4.62666C1.36445 4.67698 1.3482 4.72632 1.31262 4.7619L1.29042 4.7841C1.1613 4.91322 0.945964 4.85361 0.94096 4.67107C0.940555 4.65631 0.940352 4.64151 0.940352 4.62666C0.940352 4.54891 0.876737 4.48529 0.798985 4.48529C0.721233 4.48529 0.657618 4.54891 0.657618 4.62666V4.62666C0.657618 5.04282 0.58971 5.4841 0.295436 5.77837L0.133147 5.94066C0.0780136 5.9958 0.0780136 6.08557 0.133147 6.1407C0.16142 6.16756 0.197469 6.1817 0.233517 6.1817C0.269566 6.1817 0.305614 6.16756 0.333181 6.13999V6.13999C0.621648 5.85152 1.11276 5.92647 1.44196 6.1674C1.66852 6.33322 1.93283 6.45024 2.21949 6.50307C2.33425 6.52422 2.4247 6.61973 2.4247 6.73641V6.73641C2.4247 6.85946 2.32495 6.95921 2.2019 6.95921H1.78855C1.7108 6.95921 1.64719 7.02283 1.64719 7.10058C1.64719 7.17833 1.7108 7.24195 1.78855 7.24195H3.34359C3.42134 7.24195 3.48496 7.17833 3.48496 7.10058C3.48496 7.02283 3.42134 6.95921 3.34359 6.95921H2.93023C2.80719 6.95921 2.70744 6.85947 2.70744 6.73642V6.73642C2.70744 6.61973 2.79794 6.52422 2.91269 6.50307C3.80025 6.33945 4.47452 5.56032 4.47452 4.62666C4.47452 4.54891 4.41091 4.48529 4.33316 4.48529C4.25541 4.48529 4.19179 4.54891 4.19179 4.62666C4.19179 5.52293 3.46234 6.25238 2.56607 6.25238C1.98414 6.25238 1.47323 5.94504 1.18577 5.48445C1.14024 5.41151 1.15607 5.31781 1.21687 5.25701V5.25701C1.31962 5.15426 1.49759 5.19317 1.58071 5.31237C1.79787 5.62378 2.15815 5.82828 2.56607 5.82828ZM3.48496 4.62666C3.48496 5.13346 3.07287 5.54554 2.56607 5.54554C2.28701 5.54554 2.03664 5.42051 1.86807 5.22358C1.67835 5.00193 1.7895 4.68438 1.99581 4.47807L2.3269 4.14698C2.75425 3.71963 3.48496 4.02229 3.48496 4.62666V4.62666ZM1.64719 2.08205C1.64719 1.57525 2.05927 1.16317 2.56607 1.16317C3.07287 1.16317 3.48496 1.57525 3.48496 2.08205V2.20824C3.48496 2.45194 3.38814 2.68566 3.21582 2.85799V2.85799C2.63696 3.43685 1.64719 3.02688 1.64719 2.20824V2.08205Z" fill="#4F5050" />
                                        </svg>
                                            Muted</a></li>
                                        <li><a><svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.69185 2.93607L4.58939 6.03729C4.58066 6.30289 4.46878 6.55464 4.27748 6.7391C4.08618 6.92356 3.83053 7.02621 3.56479 7.02527H1.61804C1.35247 7.02622 1.09697 6.92371 0.905695 6.73947C0.714425 6.55523 0.602424 6.30374 0.593435 6.03832L0.490975 2.93607C0.488733 2.86814 0.513571 2.8021 0.560023 2.75247C0.606475 2.70285 0.670738 2.67371 0.738673 2.67147C0.806609 2.66923 0.872652 2.69407 0.922275 2.74052C0.971898 2.78697 1.00104 2.85123 1.00328 2.91917L1.10574 6.02116C1.11084 6.15358 1.16706 6.27887 1.26259 6.37072C1.35811 6.46257 1.48552 6.51383 1.61804 6.51373H3.56479C3.69748 6.51382 3.82503 6.46242 3.92058 6.37035C4.01614 6.27829 4.07224 6.15274 4.07709 6.02013L4.17955 2.91917C4.18179 2.85123 4.21093 2.78697 4.26055 2.74052C4.31017 2.69407 4.37622 2.66923 4.44415 2.67147C4.51209 2.67371 4.57635 2.70285 4.6228 2.75247C4.66925 2.8021 4.69409 2.86814 4.69185 2.93607ZM5.03074 1.90404C5.03074 1.97198 5.00375 2.03713 4.95571 2.08517C4.90767 2.13321 4.84252 2.16019 4.77459 2.16019H0.408495C0.340559 2.16019 0.275406 2.13321 0.227369 2.08517C0.179331 2.03713 0.152344 1.97198 0.152344 1.90404C0.152344 1.83611 0.179331 1.77095 0.227369 1.72292C0.275406 1.67488 0.340559 1.64789 0.408495 1.64789H1.20256C1.28372 1.64811 1.36206 1.61812 1.42233 1.56377C1.48261 1.50942 1.5205 1.43458 1.52864 1.35383C1.54754 1.1644 1.63629 0.988798 1.77759 0.861229C1.9189 0.733659 2.10263 0.663265 2.293 0.66376H2.88983C3.0802 0.663265 3.26393 0.733659 3.40523 0.861229C3.54653 0.988798 3.63528 1.1644 3.65418 1.35383C3.66232 1.43458 3.70022 1.50942 3.76049 1.56377C3.82076 1.61812 3.8991 1.64811 3.98026 1.64789H4.77433C4.84227 1.64789 4.90742 1.67488 4.95546 1.72292C5.00349 1.77095 5.03074 1.83611 5.03074 1.90404ZM2.03864 1.40609C2.02491 1.52379 2.10622 1.64789 2.22472 1.64789H2.95862C3.07718 1.64789 3.15832 1.52386 3.1447 1.40609V1.40609C3.13835 1.34295 3.1088 1.28441 3.06176 1.24182C3.01472 1.19923 2.95354 1.17561 2.89008 1.17555H2.29325C2.2298 1.17561 2.16862 1.19923 2.12158 1.24182C2.07454 1.28441 2.04498 1.34295 2.03864 1.40609V1.40609ZM2.23126 5.52883V3.34771C2.23126 3.27977 2.20428 3.21462 2.15624 3.16658C2.1082 3.11855 2.04305 3.09156 1.97511 3.09156C1.90718 3.09156 1.84202 3.11855 1.79399 3.16658C1.74595 3.21462 1.71896 3.27977 1.71896 3.34771V5.52986C1.71896 5.59779 1.74595 5.66295 1.79399 5.71098C1.84202 5.75902 1.90718 5.78601 1.97511 5.78601C2.04305 5.78601 2.1082 5.75902 2.15624 5.71098C2.20428 5.66295 2.23126 5.59779 2.23126 5.52986V5.52883ZM3.46437 5.52883V3.34771C3.46437 3.27977 3.43739 3.21462 3.38935 3.16658C3.34131 3.11855 3.27616 3.09156 3.20822 3.09156C3.14029 3.09156 3.07514 3.11855 3.0271 3.16658C2.97906 3.21462 2.95207 3.27977 2.95207 3.34771V5.52986C2.95207 5.59779 2.97906 5.66295 3.0271 5.71098C3.07514 5.75902 3.14029 5.78601 3.20822 5.78601C3.27616 5.78601 3.34131 5.75902 3.38935 5.71098C3.43739 5.66295 3.46437 5.59779 3.46437 5.52986V5.52883Z" fill="#4F5050" />
                                        </svg>
                                            Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={`chat_us_wrap ${(active ? 'chat_box_open' : '')}`}>
                            {
                                messages?.map((single, idx) => {
                                    return user?._id == single?.senderId ? <div className="chat_us_box chat_us_box_margin">
                                        <p>{single.message}</p>
                                        <div> <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.90689 8.03544C6.89914 8.03384 6.89124 8.0331 6.88334 8.0328C6.80256 8.02975 6.72503 7.99628 6.66382 7.93778L6.34763 7.64426C6.30535 7.614 6.26946 7.57414 6.24235 7.52735C6.21525 7.48056 6.19756 7.42792 6.19047 7.37298C6.18339 7.31804 6.18707 7.26207 6.20128 7.20883C6.21549 7.15558 6.23989 7.1063 6.27284 7.0643C6.30579 7.0223 6.34654 6.98855 6.39233 6.96531C6.43812 6.94208 6.48791 6.9299 6.53833 6.92959C6.58876 6.92929 6.63866 6.94087 6.68468 6.96355C6.72959 6.98568 6.76978 7.01789 6.80271 7.05809C6.80434 7.06008 6.80609 7.06198 6.80798 7.06373V7.06373C6.83105 7.08522 6.86763 7.08208 6.8867 7.05698L11.6577 0.778505C11.6861 0.735181 11.7222 0.698757 11.764 0.671506C11.8057 0.644255 11.8521 0.626761 11.9003 0.620116C11.9485 0.613472 11.9973 0.617818 12.0439 0.632884C12.0905 0.64795 12.1337 0.673413 12.1709 0.707685C12.2082 0.741957 12.2386 0.784302 12.2603 0.832079C12.282 0.879857 12.2945 0.932041 12.2971 0.985378C12.2996 1.03871 12.2922 1.09206 12.2752 1.14208C12.2581 1.19211 12.232 1.23774 12.1982 1.27614L7.16727 7.90085C7.13705 7.94057 7.09991 7.97324 7.05805 7.99694C7.02121 8.01779 6.98137 8.03133 6.94035 8.03699C6.92921 8.03853 6.9179 8.03771 6.90689 8.03544V8.03544ZM4.49812 8.03303C4.4515 8.03307 4.40533 8.02296 4.36228 8.00328C4.31923 7.98359 4.28015 7.95473 4.24728 7.91835L0.72668 4.05198C0.665664 3.97815 0.632787 3.88132 0.634858 3.78155C0.636928 3.68177 0.673787 3.5867 0.737802 3.51601C0.801817 3.44531 0.888086 3.40442 0.978747 3.40178C1.06941 3.39915 1.15752 3.43499 1.22483 3.50187V3.50187C2.91413 5.36081 5.87604 5.23059 7.39568 3.23057L9.25879 0.778505C9.31876 0.698338 9.40521 0.647668 9.49913 0.637643C9.59304 0.627618 9.68673 0.659059 9.75958 0.725049C9.83244 0.791039 9.87848 0.886172 9.88759 0.989521C9.8967 1.09287 9.86813 1.19597 9.80816 1.27614L4.76839 7.90085C4.73588 7.94159 4.69598 7.9744 4.65126 7.99716C4.60654 8.01993 4.55798 8.03214 4.50872 8.03303H4.49812Z" fill="#0AB39C" />
                                        </svg> {new Date(single.createdAt).getHours() > 10 ? new Date(single.createdAt).getHours() : ('0' + new Date(single.createdAt).getHours())} : {new Date(single.createdAt).getMinutes() > 10 ? new Date(single.createdAt).getMinutes() : '0' + new Date(single.createdAt).getMinutes()} {new Date(single.createdAt).getHours() > 12 ? 'pm' : 'am'}
                                        </div>
                                    </div> : <div className="chat_us_box chat_us_box_1">
                                        <p>{single.message}</p>

                                        <div className="chat_us_img">
                                            <img src={chat_img} /><span>{new Date(single.createdAt).getHours() > 10 ? new Date(single.createdAt).getHours() : ('0' + new Date(single.createdAt).getHours())} : {new Date(single.createdAt).getMinutes() > 10 ? new Date(single.createdAt).getMinutes() : '0' + new Date(single.createdAt).getMinutes()} {new Date(single.createdAt).getHours() > 12 ? 'pm' : 'am'}</span>
                                        </div>
                                    </div>
                                })

                            }
                        </div>
                        <div className="send_box_chat">
                            <div className="send_box_block">
                                <label>
                                    <p>Please Enter a Message </p>
                                    <input type="text" placeholder="Type your message...." value={message} onKeyDown={handlekeyDown} onChange={(e) => { setMessage(e.target.value) }} />
                                </label>
                                <div className="send_box_btn" onClick={handleSendmessage}>
                                    <a href="#0">Send<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M31.31 15.3045L8.96577 7.03856L12.9987 16.0459L9.70717 25.3498L31.31 15.3045Z" stroke="white" stroke-width="1.59038" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M31.3095 15.3045L12.9983 16.0459" stroke="white" stroke-width="1.59038" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ChatUs;