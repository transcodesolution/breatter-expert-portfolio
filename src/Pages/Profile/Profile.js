import React, { useState } from "react";

import Container from 'react-bootstrap/Container';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { ApiPost, ApiUpload } from "../../Helpers/Api/ApiData";

const Profile = () => {
    const profile = useSelector(state => state.profile.profile);
    const [profileImage, setProfileImage] = useState(profile?.profilePhoto)
    console.log(profile)
    const handleUploadImage = (e) => {
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append("image", file);
        try {
            ApiUpload('/upload/profile', formData, {
                Headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response)
                setProfileImage(response?.data?.data?.image)
                ApiPost('/profile/update',{
                    profilePhoto:response?.data?.data?.image
                }).then(()=>{
                   toast.success("Profile Photo Updated Successfully")
                }).catch((err)=>toast.error(err.message))
                
            })
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="profile_wrapper">
            <div className="profile_wrap">
                <Container>
                    <div className="profile_block">
                        <div className="profile_sec">
                            {/* <div className="profile_img">
                                <img src={profile_img} alt="profile_img" />
                            </div> */}
                            {!profileImage ? <div className="replace_profile">{profile?.firstName?.substr(0, 1)} </div> : <div className="profile_img">
                                <img className="profile_expert" src={profileImage} alt="profile_img" />
                            </div>}
                            <input type='file' hidden id="profilePhoto" onChange={handleUploadImage}></input>
                            <label htmlFor="profilePhoto"> <p style={{ cursor: 'pointer' }}>Change Profile Icon</p></label>


                            <h3>{profile?.firstName} {profile?.lastName}</h3>
                            <div className="profile_contact">
                                <a href="#0">
                                    <span>
                                        <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="25.7684" cy="25.3451" r="22.1786" fill="#82AFA2" />
                                            <path d="M36.8592 31.4078C37.132 31.646 37.3534 31.9374 37.5098 32.2641C37.6662 32.5908 37.7543 32.9459 37.7688 33.3079C37.7854 34.0439 37.5092 34.7564 37.0007 35.2888C36.3427 35.9662 35.5533 36.502 34.6808 36.8635C33.8084 37.225 32.8713 37.4045 31.9271 37.391C27.8237 37.391 23.1745 34.3185 19.4957 30.6599C14.1592 25.3032 10.1367 17.905 14.8667 13.1548C15.1171 12.8881 15.4215 12.678 15.7597 12.5386C16.0978 12.3992 16.4619 12.3336 16.8274 12.3463C17.1809 12.3641 17.5272 12.4519 17.8464 12.6046C18.1656 12.7573 18.4514 12.9718 18.6871 13.2357L21.3553 16.3082C21.8022 16.8447 22.035 17.5275 22.0089 18.2252C21.9828 18.923 21.6996 19.5865 21.2138 20.0881L20.1425 21.1594C20.2233 21.5435 20.7691 22.8776 24.0033 26.132C27.2779 29.4066 28.612 29.912 28.9961 30.013L30.0472 28.9417C30.5428 28.445 31.2081 28.1543 31.9094 28.128C32.6106 28.1018 33.2958 28.3419 33.8272 28.8002L36.8592 31.4078Z" fill="black" />
                                            <circle cx="25.7695" cy="25.3447" r="24.5" stroke="black" />
                                        </svg>
                                    </span>
                                    +{profile?.countryCode} {profile?.phoneNumber}
                                </a>
                                <a href="#0">
                                    <span>
                                        <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="25.3387" cy="25.0545" r="22.1786" fill="#82AFA2" />
                                            <path d="M25.3398 0.0546875C11.543 0.0546875 0.339844 11.2578 0.339844 25.0547C0.339844 38.8516 11.543 50.0547 25.3398 50.0547C39.1367 50.0547 50.3398 38.8516 50.3398 25.0547C50.3398 11.2578 39.1367 0.0546875 25.3398 0.0546875ZM25.3398 1.56875C38.3195 1.56875 48.8258 12.075 48.8258 25.0547C48.8258 38.0344 38.3195 48.5406 25.3398 48.5406C12.3602 48.5406 1.85391 38.0344 1.85391 25.0547C1.85391 12.075 12.3602 1.56875 25.3398 1.56875ZM15.0367 17.2422C14.8559 17.2768 14.693 17.3741 14.577 17.5171C14.4609 17.66 14.3991 17.8393 14.4023 18.0234V21.0516C14.3896 21.1323 14.3896 21.2146 14.4023 21.2953V32.0859C14.4023 32.2931 14.4847 32.4919 14.6312 32.6384C14.7777 32.7849 14.9764 32.8672 15.1836 32.8672H37.0586C37.2658 32.8672 37.4645 32.7849 37.611 32.6384C37.7575 32.4919 37.8398 32.2931 37.8398 32.0859V21.1969C37.8418 21.1646 37.8418 21.1323 37.8398 21.1V18.0234C37.8398 17.8162 37.7575 17.6175 37.611 17.471C37.4645 17.3245 37.2658 17.2422 37.0586 17.2422H15.1836C15.1347 17.2376 15.0856 17.2376 15.0367 17.2422ZM15.9648 18.8047H36.2773V20.6609L26.1211 25.6891L15.9648 20.6609V18.8047ZM15.9648 22.4187L25.7789 27.2516C25.8855 27.3035 26.0025 27.3305 26.1211 27.3305C26.2397 27.3305 26.3567 27.3035 26.4633 27.2516L36.2773 22.4187V31.3047H15.9648V22.4187Z" fill="black" />
                                        </svg>
                                    </span>
                                    {profile?.email}
                                </a>
                            </div>
                            <div className="profile_border"></div>
                        </div>
                        <div className="profile_review">
                            <ul className="profile_review_block">
                                <li>
                                    <div className="profile_review_sec">
                                        <p>solved question</p>
                                        <h2>{profile?.answeredCount}</h2>
                                    </div>
                                </li>
                                <li>
                                    <div className="profile_review_sec">
                                        <p>skips datas</p>
                                        <h2>{profile?.skipCount}</h2>
                                    </div>
                                </li>
                                <li>
                                    <div className="profile_review_sec">
                                        <p>Pending Review</p>
                                        <h2>{profile?.pendingReview || 0}</h2>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="profile_quality">
                            <div className="profile_quality_block">
                                <p>quality score</p>
                                <div className="profile_star" style={{ fontSize: '30px' }}>
                                    {profile?.qualityScore}
                                </div>
                            </div>
                        </div>
                        <div className="profile_earnings">
                            <div className="profile_earnings_block">
                                <h2>earnings</h2>
                                <h3>${profile?.earnings}</h3>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Profile;