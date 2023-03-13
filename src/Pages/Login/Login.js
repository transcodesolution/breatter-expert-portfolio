import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import { NavLink, useNavigate } from "react-router-dom";
import OTPInput from "otp-input-react";

import login_img from "../../Assets/images/login_img.png";
import login_logo from "../../Assets/images/login_logo.png";

import login_google from "../../Assets/images/login_google.svg";
import login_facebook from "../../Assets/images/login_facebook.svg";
import login_apple from "../../Assets/images/login_apple.svg";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  ApiPostNoAuth,
  ApiPostNoAuthWithToken,
} from "../../Helpers/Api/ApiData";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import FacebookLogin from "react-facebook-login";
import { setLogin } from "../../Store/Reducers/Authreducer/auth";
import GoogleLogin from "react-google-login";

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().min(8),
});

const Login = () => {
  const [show1, setShow] = useState(false);
  const naviate = useNavigate();
  const dispatch = useDispatch();

  const handleClose1 = () => setShow(false);
  const handleShow1 = () => setShow(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmP, setConfirmP] = useState("");
  const [otp, setOtp] = useState("");

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleLogin = (data) => {
    const bodyData = { userId: data?.email, password: data?.password };
    bodyData.deviceToken = localStorage.getItem("deviceToken");
    try {
      ApiPostNoAuth("/expert/login", bodyData)
        .then((response) => {
          if (response.status == 203) {
            toast.error(response.data.message);
          } else {
            toast.success(response?.data?.message);
            dispatch(
              setLogin({
                token: response?.data?.data?.token,
              })
            );
            naviate("/");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error("error.message");
    }
  };

  const handleFacebookLogin = (response) => {
    try {
      ApiPostNoAuth("/expert/auth/facebook", {
        accessToken: response?.accessToken,
      })
        .then((response) => {
          if (response?.data?.status == 206) {
            naviate(
              `/Signuppage?firstName=${
                response?.data?.data?.userData?.firstName
              }&&lastName=${response?.data?.data?.userData?.lastName}&&email=${
                response?.data?.data?.userData?.email || ""
              }`
            );
          } else {
            toast.success(response?.data?.message);
            dispatch(
              setLogin({
                user: response?.data?.data?.userData,
                token: response?.data?.data?.token,
              })
            );
            naviate("/");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = (response) => {
    const deviceToken = localStorage.getItem("deviceToken");

    try {
      ApiPostNoAuth("/expert/auth/google", {
        accessToken: response?.accessToken,
        idToken: response?.tokenId,
        deviceToken: deviceToken,
      })
        .then((response) => {
          if (response?.data?.status == 206) {
            naviate(
              `/Signuppage?firstName=${
                response?.data?.data?.userData?.firstName
              }&&lastName=${response?.data?.data?.userData?.lastName}&&email=${
                response?.data?.data?.userData?.email || ""
              }`
            );
          } else {
            toast.success(response?.data?.message);
            dispatch(
              setLogin({
                token: response?.data?.data?.token,
              })
            );
            naviate("/");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error("ok ");
    }
  };

  const handleGoogleError = (e) => {
    toast.error(e?.error);
  };

  const handleForgotSubmit = () => {
    try {
      ApiPostNoAuth("/expert/password/forget", { userId: email })
        .then((response) => {
          console.log("login response", response);
          toast.success(response?.data?.message);
          setShow(false);
          setShow3(true);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOtpVerify = () => {
    try {
      ApiPostNoAuth("/expert/verify/otp", {
        userId: email,
        otp: otp,
      })
        .then((response) => {
          toast.success(response?.data?.message);
          setToken(response?.data?.data?.token);
          setShow2(true);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleResetPass = () => {
    console.log(
      (password != confirmP || password.length < 7, password, confirmP)
    );
    if (password != confirmP || password.length < 7) {
      toast.error("password Must Be 8 Digit long OR Password not match ");
    } else {
      try {
        ApiPostNoAuthWithToken(
          "/expert/password/reset",
          {
            userId: email,
            password: password,
          },
          token
        )
          .then((response) => {
            toast.success(response?.data?.message);
            setShow2(false);
            dispatch(
              setLogin({
                token: token,
              })
            );
            naviate("/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleResendOTP = () => {
    console.log(email);
    try {
      ApiPostNoAuth("/expert/otp/resend", {
        phoneNumber: email,
      })
        .then((response) => {
          toast.success("OTP Send Successfully");
        })
        .catch((error) => toast.error("Something Went Wrong"));
    } catch (error) {}
  };
  useEffect(() => {
    if (otp.length == 4) {
      handleOtpVerify();
    }
  }, [otp]);

  return (
    <div className="login_wrapper">
      <div className="login_wrap">
        <div className="login_block">
          <div className="login_sec">
            <div className="login_left">
              <div className="login_img">
                <img src={login_img} alt="login_img" />
              </div>
              <div className="login_slid"></div>
              <h2>Easy to use Dashboard</h2>
              <p>
                Let’s see what we have new, check it out!So maybe write here
                simething more hehe.
              </p>
            </div>
          </div>
          <div className="login_sec">
            <div className="login_right">
              <div className="login_logo">
                <NavLink to="/">
                  <img src={login_logo} alt="login_logo" />
                </NavLink>
              </div>
              <h2>Welcome Back!</h2>
              <p>Let’s build something great</p>
              <div className="login_form">
                <form>
                  <ul className="login_form_block">
                    <li>
                      <label className="login_label">
                        <p>E-mail & phone number</p>
                        <input
                          type="email"
                          className="login_error"
                          {...register("email")}
                        />
                      </label>
                      <div style={{ color: "red" }}>
                        {errors?.email?.message}
                      </div>
                    </li>
                    <li>
                      <label className="login_label">
                        <p>Password</p>
                        <input
                          type="Password"
                          className="login_error"
                          {...register("password")}
                        />
                      </label>
                      <div style={{ color: "red" }}>
                        {errors?.password?.message}
                      </div>
                    </li>
                    {/* <li>
                      <div className="login_check">
                        <input type="checkbox" id="login_check1" />
                        <label for="login_check1">
                          terms & conditions apply
                        </label>
                      </div>
                    </li> */}
                    <li>
                      <div className="login_btn">
                        <button
                          type="button"
                          onClick={handleSubmit(handleLogin)}
                        >
                          Sign in
                        </button>
                      </div>
                    </li>
                  </ul>
                  <div className="f_password">
                    <a href="#0" onClick={handleShow1}>
                      Forget Password ?
                    </a>
                  </div>
                </form>
              </div>
              <div className="accounts_text">
                <span>or do it via other accounts</span>
              </div>
              <div className="login_icon">
                <ul>
                  <li>
                    <GoogleLogin
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      render={(renderProps) => (
                        <a onClick={renderProps.onClick}>
                          <img src={login_google} alt="icon" />
                        </a>
                      )}
                      buttonText=""
                      onSuccess={handleGoogleLogin}
                      onFailure={handleGoogleError}
                      cookiePolicy={"single_host_origin"}
                    />
                  </li>
                  <li>
                    <FacebookLogin
                      appId={"738192997889491"}
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={handleFacebookLogin}
                      cssClass="my-facebook-button-class"
                      textButton=""
                      icon={<img src={login_facebook} alt="icon" />}
                    />
                  </li>
                  <li>
                    <a href="https://appleid.apple.com/sign-in">
                      <img src={login_apple} alt="icon" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="register_link">
                <p>
                  Don’t have an account?{" "}
                  <NavLink to="/Signuppage">Register</NavLink>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="signup_model forget_p_model"
        centered
        show={show1}
        onHide={handleClose1}
        animation={false}
      >
        <Modal.Body>
          <div className="signup_model_block">
            <div className="signup_model_conte">
              <h3>Forget Password</h3>
              <p className="great_text">Let’s build something great</p>
              <form>
                <ul className="forget_p_input">
                  <li>
                    <input
                      type="email"
                      placeholder="Enter your Registered  Mobile Number"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </li>
                  <li>
                    <button type="button" onClick={handleForgotSubmit}>
                      Submit
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="signup_model"
        centered
        show={show3}
        onHide={handleClose3}
        animation={false}
      >
        <Modal.Body>
          <div className="signup_model_block">
            <div className="signup_model_conte">
              <h3>Otp Verification</h3>
              <p className="great_text">Let’s build something great</p>
              <p className="otp_text">
                we will send you a one time password on{" "}
                <span> Your Mobile Number</span>{" "}
              </p>

              <div className="signup_opt_box">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  autoFocus
                  OTPLength={4}
                  otpType="number"
                  disabled={false}
                  secure
                />
              </div>

              <p className="recevice_taxt">Don’t Recevice Otp?</p>
              <div className="respond_otp_link">
                <a href="#0" onClick={handleResendOTP}>
                  Resend Otp
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        className="signup_model reset_p_model"
        centered
        show={show2}
        onHide={handleClose2}
        animation={false}
      >
        <Modal.Body>
          <div className="signup_model_block">
            <div className="signup_model_conte">
              <h3>Reset Password</h3>
              <p className="great_text">Let’s build something great</p>

              <ul className="forget_p_input reset_p_input">
                <li>
                  <h4>Enter your password</h4>
                </li>
                <li>
                  <input
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </li>
                <li>
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    onChange={(e) => {
                      setConfirmP(e.target.value);
                    }}
                  />
                </li>
                <li>
                  <button onClick={handleResetPass}>Submit</button>
                </li>
              </ul>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
