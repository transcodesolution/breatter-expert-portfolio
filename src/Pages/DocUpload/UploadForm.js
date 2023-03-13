import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { schema } from "../../Constants/Formdata/uploadformdata";
import { ApiPost, ApiUpload } from "../../Helpers/Api/ApiData";
import { setProfile } from "../../Store/Reducers/Profilereducer/profile";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
import { setLogin } from "../../Store/Reducers/Authreducer/auth";
import { useNavigate } from "react-router-dom";
const UploadForm = () => {
    const [timer, setTimer] = useState("00:00:00:00");
    const expert = useSelector((state) => state.profile.profile);
    const [chechvalues, setChechvalues] = useState({
        check1: false,
        check2: false
    })
    const [startDate, setStartDate] = useState(new Date());
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [initialvalue, setInitialvalue] = useState({
        firstName: expert.firstName,
        lastName: expert.lastName,
        email: expert.email,
        phoneNumber: expert.phoneNumber,
        address: "",
        dob: "",
        accountNumber: "",
        ifsc: "",
        photoIdentity: "",
        addressProof: "",
        cancelCheque: "",
        degreeCertificate: "",
        passport: "",
        prProof: ""
    })
    const Ref = useRef(null);
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        const days = Math.floor((total / 1000 / 60 / 60 / 24));
        return {
            total,
            hours,
            minutes,
            seconds,
            days
        };
    };
    const startTimer = (e) => {
        let { total, days, hours, minutes, seconds } = getTimeRemaining(e);
        console.log(total, days, hours, minutes)
        if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
            ApiPost('/profile/update', {
                profileStatus: 0
            }).then((response) => {
                dispatch(
                    setLogin({
                        token: '',
                    })
                );
                navigate('/LoginPage')
                dispatch(setProfile({ data: '' }))
            }).catch((err) => toast.error(err.message))

        }
        if (total == 0) {
            alert("Your Time Is UP To Upload Documents", "Your Data is Removed From Database Now Login Again");
        }
        if (total >= 0) {
            setTimer(
                (days > 9 ? days : "0" + days) +
                ":" +
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9 ? minutes : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };
    const clearTimer = (e) => {
        setTimer("00:00:00:00");

        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };
    const getDeadTime = () => {
        let deadline = new Date();
        let seconds = (new Date(expert.docDeadLine).getTime() - new Date().getTime()) / 1000
        deadline.setSeconds(deadline.getSeconds() + seconds);
        return deadline;
    };
    useEffect(() => {
        clearTimer(getDeadTime());

    }, []);

    const onSubmit = (values) => {
        if (chechvalues.check1 && chechvalues.check2) {
            try {
                ApiPost('/profile/submit/documents', values).then((response) => {
                    toast.success("Uploaded Successfully")
                    dispatch(setProfile({ data: response?.data?.data }))
                }).catch((error) => toast.error("Erroe Occured In Submiting"))
            } catch (error) {
                toast.error("Something Went Wrong")
            }
        }

    };

    const handleProof = (event, name, setFieldValue) => {
        let file = event.target.files[0];
        if (file) {

            let formData = new FormData();
            formData.append("image", file);
            try {
                ApiUpload('/upload/profile', formData, {
                    Headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response) => {

                    toast.success(`${name} Get Succesfully`)
                    console.log(response, name)
                    setFieldValue(name, response?.data?.data?.image)

                }).catch((err) => toast.error("Something Went Wrong"))
            } catch (error) {
                toast.error("Internal Server Error")
            }

        }
    }
    const handleDOB = (event, setFieldValue) => {
        setStartDate(event)
        setFieldValue("dob", moment(event).format('DD/MM/YYYY'))

    }
    const handleChecks = (event) => {
        let name = event.target.name;
        let val = event.target.checked
        setChechvalues((obj) => {
            return {
                ...obj,
                [name]: val
            }
        })
    }
    return (
        <div className="upload_form_wrapper">
            <div className="upload_form_wrap">
                <Container>
                    <div className="upload_form_block">
                        <div className="upload_form_title">
                            <h3>
                                time to preview Document Upload : <span>{timer}</span>{" "}
                            </h3>
                        </div>
                        <Formik
                            initialValues={initialvalue}
                            onSubmit={onSubmit}
                            validationSchema={schema}
                            validateOnBlur={false} //false value will not allxow to validate on blur event
                            validateOnChange={false}
                        >
                            {({ values, setFieldValue, ...rest }) => {
                                console.log(rest)
                                return <Form>
                                    <div className="upload_form_sec">
                                        <div className="document_form_block">
                                            <div className="document_title">
                                                <h3>document upload form</h3>
                                            </div>
                                            {/* <div className="document_select">
                                            <Select placeholder="Select Country" options={options} onChange={(event) => handleChangeCountry(event, setFieldValue)} />
                                        </div> */}
                                            <div className="document_input_block">
                                                <ul className="document_input_sec">
                                                    <li>
                                                        <label className="document_input_label">
                                                            <p>first name</p>
                                                            <Field type="name" name="firstName" disable focus />
                                                            <ErrorMessage name="firstName">
                                                                {(msg) => (
                                                                    <div style={{ color: "red" }}>{msg}</div>
                                                                )}
                                                            </ErrorMessage>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="document_input_label">
                                                            <p>last name</p>
                                                            <Field type="name" name="lastName" />
                                                            <ErrorMessage name="lastName">
                                                                {(msg) => (
                                                                    <div style={{ color: "red" }}>{msg}</div>
                                                                )}
                                                            </ErrorMessage>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="document_input_label">
                                                            <p>email</p>
                                                            <Field type="email" name="email" readOnly style={{ letterSpacing: '1px', opacity: '.5', fontWeight: '600' }} />
                                                            <ErrorMessage name="email">
                                                                {(msg) => (
                                                                    <div style={{ color: "red" }}>{msg}</div>
                                                                )}
                                                            </ErrorMessage>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="document_input_label">
                                                            <p>phone number</p>
                                                            <Field type="text" name="phoneNumber" value={"+" + values.phoneNumber} readOnly style={{ letterSpacing: '1px', opacity: '.5', fontWeight: '600' }} />
                                                            <ErrorMessage name="phoneNumber">
                                                                {(msg) => (
                                                                    <div style={{ color: "red" }}>{msg}</div>
                                                                )}
                                                            </ErrorMessage>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="document_input_label">
                                                            <p>address</p>
                                                            <Field type="textarea" name="address" />
                                                            <ErrorMessage name="address">
                                                                {(msg) => (
                                                                    <div style={{ color: "red" }}>{msg}</div>
                                                                )}
                                                            </ErrorMessage>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="document_input_label">
                                                            <p>date of birth</p>
                                                            <DatePicker name="dob" selected={startDate} onChange={(event) => handleDOB(event, setFieldValue)} autoFocus={rest.errors['dob']} />
                                                            {/* <Field type="text" name="birthDate" /> */}



                                                            <ErrorMessage name="dob">
                                                                {(msg) => (
                                                                    <div style={{ color: "red" }}>{msg}</div>
                                                                )}
                                                            </ErrorMessage>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="document_input_label">
                                                            <p>Account Number</p>
                                                            <Field type="password" name="accountNumber" />
                                                            <ErrorMessage name="accountNumber">
                                                                {(msg) => (
                                                                    <div style={{ color: "red" }}>{msg}</div>
                                                                )}
                                                            </ErrorMessage>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="document_input_label">
                                                            <p>IFSC Code</p>
                                                            <Field type="password" name="ifsc" />
                                                            <ErrorMessage name="ifsc">
                                                                {(msg) => (
                                                                    <div style={{ color: "red" }}>{msg}</div>
                                                                )}
                                                            </ErrorMessage>
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="document_file_block">
                                            <div className="document_file_sec">
                                                <div className="document_title">
                                                    <h3>document upload</h3>
                                                </div>
                                                <ul className="document_file">
                                                    <li>
                                                        <p>upload photo identifyff</p>
                                                        <div className="document_file_label">
                                                            <input id="photoIdentity" type="file" name="photoIdentity" onChange={(event) => handleProof(event, "photoIdentity", setFieldValue)} />
                                                            <label for="photoIdentity">
                                                                <span>{values.photoIdentity ? 'Change File' : 'upload files'}</span>
                                                                {values.photoIdentity && <h6 className="uploaded_file"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
                                                                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                                                                </svg>{values?.photoIdentity?.split('/')[values?.photoIdentity?.split('/').length - 1]}</h6>}
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="photoIdentity">
                                                            {(msg) => (
                                                                <div style={{ color: "red" }}>{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </li>
                                                    <li>
                                                        <p>upload Address Proof</p>
                                                        <div className="document_file_label">
                                                            <input id="addressProof" type="file" name="addressProof" onChange={(event) => handleProof(event, "addressProof", setFieldValue)} />
                                                            <label for="addressProof">
                                                                <span>{values.addressProof ? 'Change File' : 'upload files'}</span>
                                                                {values.addressProof && <h6 className="uploaded_file"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
                                                                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                                                                </svg>{values?.addressProof?.split('/')[values?.addressProof?.split('/').length - 1]}</h6>}
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="addressProof">
                                                            {(msg) => (
                                                                <div style={{ color: "red" }}>{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </li>
                                                    <li>
                                                        <p>upload Cancle  Cheque</p>
                                                        <div className="document_file_label">
                                                            <input id="cancelCheque" type="file" name="cancelCheque" onChange={(event) => handleProof(event, "cancelCheque", setFieldValue)} />
                                                            <label for="cancelCheque">
                                                                <span>{values.cancelCheque ? 'Change File' : 'upload files'}</span>
                                                                {values.cancelCheque && <h6 className="uploaded_file"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
                                                                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                                                                </svg>{values?.cancelCheque?.split('/')[values?.cancelCheque?.split('/').length - 1]}</h6>}
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="cancelCheque">
                                                            {(msg) => (
                                                                <div style={{ color: "red" }}>{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </li>
                                                    <li>
                                                        <p>upload Degree Certificate</p>
                                                        <div className="document_file_label">
                                                            <input id="degreeCertificate" type="file" name="degreeCertificate" onChange={(event) => handleProof(event, "degreeCertificate", setFieldValue)} />
                                                            <label for="degreeCertificate">
                                                                <span>{values.degreeCertificate ? 'Change File' : 'upload files'}</span>
                                                                {values.degreeCertificate && <h6 className="uploaded_file"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
                                                                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                                                                </svg>{values?.degreeCertificate?.split('/')[values?.degreeCertificate?.split('/').length - 1]}</h6>}
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="degreeCertificate">
                                                            {(msg) => (
                                                                <div style={{ color: "red" }}>{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </li>
                                                    <li>
                                                        <p>upload Passport Identify</p>
                                                        <div className="document_file_label">
                                                            <input id="passport" type="file" name="passport" onChange={(event) => handleProof(event, "passport", setFieldValue)} />
                                                            <label for="passport">
                                                                <span>{values.passport ? 'Change File' : 'upload files'}</span>
                                                                {values.passport && <h6 className="uploaded_file"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
                                                                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                                                                </svg>{values?.passport?.split('/')[values?.passport?.split('/').length - 1]}</h6>}
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="passport">
                                                            {(msg) => (
                                                                <div style={{ color: "red" }}>{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </li>
                                                    <li>
                                                        <p>upload PR  Proof</p>
                                                        <div className="document_file_label">
                                                            <input id="prProof" type="file" name="prProof" onChange={(event) => handleProof(event, "prProof", setFieldValue)} />
                                                            <label for="prProof">
                                                                <span>{values.prProof ? 'Change File' : 'upload files'}</span>
                                                                {values.prProof && <h6 className="uploaded_file"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
                                                                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                                                                </svg>{values?.prProof?.split('/')[values?.prProof?.split('/').length - 1]}</h6>}
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="prProof">
                                                            {(msg) => (
                                                                <div style={{ color: "red" }}>{msg}</div>
                                                            )}
                                                        </ErrorMessage>
                                                    </li>


                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="upload_radio">
                                        <div className="duration_radio">
                                            <ul>
                                                <li>                                                <input type="checkbox" id="1-option" name="check1" onChange={handleChecks} />
                                                    <label for="1-option">
                                                        the above document should match the content of the one
                                                        you uploaded.
                                                    </label>
                                                    <div className="check"></div>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="2-option" name="check2" onChange={handleChecks} />
                                                    <label for="2-option">

                                                        all your documents are safe and you can trust us, your
                                                        documents will <br /> not be shared anywhere.
                                                    </label>
                                                    <div className="check"></div>

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="upload_btn">
                                        <button type="submit" >submit</button>
                                    </div>
                                </Form>
                            }}

                        </Formik>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default UploadForm;
