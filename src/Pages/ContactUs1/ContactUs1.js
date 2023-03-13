import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from 'yup';

import Container from 'react-bootstrap/Container';
import { ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    queryCategory: yup.string().required(),
    subCategory: yup.string().required(),
    email: yup.string().required().email(),
    contactName: yup.string().required(),
    subject: yup.string().required(),
    description: yup.string().required()
})

const ContactUs1 = () => {
    const navigate = useNavigate()
    const [initialvalue, setInitialvalue] = useState({
        queryCategory: "",
        subCategory: "",
        email: "",
        contactName: "",
        subject: "",
        description: "",

    })

    const onSubmit = (values) => {
        console.log("Submit", values);



        try {
            ApiPost('/ticket/submit', values).then((response) => {
                console.log(response)
                toast.success(response?.data?.message)
                navigate('/')


            }).catch((error) => toast.error("Erroe Occured In Submiting"))
        } catch (error) {
            toast.error("Something Went Wrong")
        }


    };
    return (
        <div className="contact_us1_wrapper">
            <div className="contact_us1_wrap">
                <Container>
                    <div className="contact_us1_block">
                        <div className="contact_us1_sec">
                            <div className="contact_us1_conte">
                                <div className="c_support_wrap">
                                    <div className="c_support_title">
                                        <h3>Q & A Support</h3>
                                    </div>
                                    <div className="c_support_block">
                                        <div className="ticket_tile">
                                            <h2>Submit Ticket</h2>
                                        </div>
                                        <div className="c_support_form">
                                            <Formik
                                                initialValues={initialvalue}
                                                onSubmit={onSubmit}
                                                validationSchema={schema}
                                                validateOnBlur={false} //false value will not allxow to validate on blur event
                                                validateOnChange={false}
                                            >
                                                {({ values, setFieldValue }) => <Form>
                                                    <ul className="c_support_input">
                                                        <li>
                                                            <label className="c_support_label">
                                                                <p>Query Category</p>

                                                                <Field type="text" name="queryCategory" disable />
                                                                <ErrorMessage name="queryCategory">
                                                                    {(msg) => (
                                                                        <div style={{ color: "red" }}>{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <label className="c_support_label">
                                                                <p>Sub Category</p>
                                                                <Field type="text" name="subCategory" disable />
                                                                <ErrorMessage name="subCategory">
                                                                    {(msg) => (
                                                                        <div style={{ color: "red" }}>{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <label className="c_support_label">
                                                                <p>Contact Name</p>
                                                                <Field type="text" name="contactName" disable />
                                                                <ErrorMessage name="contactName">
                                                                    {(msg) => (
                                                                        <div style={{ color: "red" }}>{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <label className="c_support_label">
                                                                <p>Email</p>
                                                                <Field type="text" name="email" disable />
                                                                <ErrorMessage name="email">
                                                                    {(msg) => (
                                                                        <div style={{ color: "red" }}>{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <label className="c_support_label">
                                                                <p>Subject</p>
                                                                <Field type="text" name="subject" disable />
                                                                <ErrorMessage name="subject">
                                                                    {(msg) => (
                                                                        <div style={{ color: "red" }}>{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <label className="c_support_label">
                                                                <p>Description</p>
                                                                <Field type="textarea" name="description" disable />
                                                                <ErrorMessage name="description">
                                                                    {(msg) => (
                                                                        <div style={{ color: "red" }}>{msg}</div>
                                                                    )}
                                                                </ErrorMessage>
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <div className="c_support_button">
                                                                <button type="submit">Submit</button>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </Form>}
                                            </Formik>
                                            <form>

                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default ContactUs1;