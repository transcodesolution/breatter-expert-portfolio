import React, { useRef, useState } from "react";

import Container from 'react-bootstrap/Container';
import { useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { ApiGetUser, ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Wallet = () => {
    const amount = useRef(null)
    const withdraw = useRef(null)
    const profile = useSelector(state => state.profile.profile);
    const [add, setAdd] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

        const currency = useSelector((state) => state.currencyExpert);
    const handleAddShow = () => {
        setAdd(true)
    }

    const handleAddClose = () => {
        setAdd(false)
    }
    const handleAddAmount = () => {
        console.log(amount.current.value)
        if (amount.current.value >= 100* currency.rate && amount.current.value) {

            try {
                ApiPost('/wallet/balance/add', {
                    amount: amount.current.value/currency.rate,
                    value: {
                        currCode: currency.code,
                        value: amount.current.value 
                    }
                }).then((response) => {

                    const res = response.data.data;
                    ApiGetUser(`/stripe/pay?orderId=${res._id}&userId=${profile._id}`).then((response) => {
                        window.open(response?.data?.data, '_blank', 'noreferrer')
                    })
                }).catch((err) => {
                    console.log(err)
                })
            } catch (error) {

            }
        } else {
            toast.error("Money Must Be Greater Then 100")
        }
    }
    
    const handleWithdrawRequest = () => {
        console.log((withdraw.current.value))
        if (withdraw.current.value <= currency.rate * 1000 && withdraw.current.value && withdraw.current.value<=(profile.balance*currency.rate)) {
            try {
                ApiPost('/wallet/withdraw/req', {
                    amount: withdraw.current.value,
               
                }).then((response) => {
                    toast.success("Money Withdraw Request Done")
                    handleClose()
                    withdraw.current.value = ""
                }).catch((err) => {
                    console.log(err)
                })
            } catch (error) {
                toast.error("Error Occure")
            }
        } else {
            toast.error("Amount Must be Less Then 100")
        }
    }
    return (
        <>
            <div className="wallet_wrapper">
                <div className="wallet_wrap">
                    <Container>
                        <div className="wallet_block">
                            <div className="wallet_sec">
                                <div className="wallet_inner_block">
                                    <h2>your wallet</h2>
                                    <div className="wallet_inner_btn">
                                        <a href="#0">{profile?.balance * currency.rate}{currency.symbol}</a>
                                    </div>
                                </div>
                                <div className="wallet_amount">
                                    <a href="#0" onClick={handleAddShow}>Add amount</a>
                                    <a href="#0" style={{ marginLeft: '12px' }} onClick={handleShow}>Withdraw</a>
                                </div>
                                <div className="wallet_transaction">
                                    <Link to='/history' >wallet transaction history</Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            <Modal show={add} onHide={handleAddClose} centered className='wallet_popup'>
                <Modal.Body>
                    <div className=''>
                        <div className='wallet_popup_title'>
                            <h3>Add Balance</h3>
                        </div>
                        <div className='wallet_popup_sec'>
                            <h2>Enter Amount</h2>
                            <label className='wallet_popup_label'>
                                <input type="number" placeholder={currency.symbol} ref={amount} />
                                <p style={{ margin: '12px' }}> Min {100* currency.rate}{currency.symbol} Require To Add</p>
                                {/* <span>complete KYC to increse withdrawal limit to ₹1,00,000</span> */}
                            </label>
                        </div>
                        <div className='wallet_popup_btn'>
                            <a href='#0' onClick={handleAddAmount}> Add Amount</a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={show} onHide={handleClose} centered className='wallet_popup'>
                <Modal.Body>
                    <div className=''>
                        <div className='wallet_popup_title'>
                            <h3>Withdrawal</h3>
                        </div>
                        <div className='wallet_popup_sec'>
                            <h2>Your wallet : {currency.symbol}{profile?.balance}</h2>
                            <label className='wallet_popup_label'>
                                <input type="number" placeholder={currency.symbol} ref={withdraw}/>
                                <p>max {currency.rate * 1000}{currency.symbol} can withdraw</p>
                                {/* <span>complete KYC to increse withdrawal limit to ₹1,00,000</span> */}
                            </label>
                        </div>
                        <div className='wallet_popup_btn'>
                            <a href='#0' onClick={handleWithdrawRequest}>Withdraw</a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


        </>
    )
}

export default Wallet;