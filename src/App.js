import React, { useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { onMessageListener, requestForToken } from "./firebase";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { gapi } from "gapi-script";
import ExamRoute from "./Routes/ExamRoutes";
import DocumentRoute from "./Routes/DocumentRoute";
import { ApiGet, ApiGetSpecial } from "./Helpers/Api/ApiData";
import { setProfile } from "./Store/Reducers/Profilereducer/profile";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { getMessaging, onMessage } from "@firebase/messaging";
import { setLogout } from "./Store/Reducers/Authreducer/auth";
import countryCodes from 'country-codes-list'
import getSymbolFromCurrency from 'currency-symbol-map'
import axios from "axios";
import { setRate } from "./Store/Reducers/Currencyreducer/currency";
import { setNotification } from "./Store/Reducers/Notificationreducer/notificatoin";

function App() {
  requestForToken();
  const messaging = getMessaging();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.expert.token);
  const profile = useSelector((state) => state.profile.profile);
    const toggle = useSelector((state) => state.profile.isUpdate);
  const navigate = useNavigate();


  const getProfile = () => {
    ApiGetSpecial("/profile", { headers: { authorization: token } })
      .then((response) => {
        dispatch(setProfile({ data: response?.data?.data }));
      })
      .catch((err) => {
        console.log(err)
        if (err.status == 401) {
          dispatch(setLogout());
          navigate("/LoginPage");
        }
      });
  };

  useEffect(() => {
    getProfile();
  }, [token, toggle]);

  useEffect(() => {
    onMessage(messaging, (payload) => {
      toast.success(payload.notification.body);
    });
  }, []);

  useEffect(() => {
    onMessage(messaging, (payload) => {
      toast.success(payload.notification.body);
      dispatch(setNotification({ data: payload }))
      navigator.serviceWorker.ready.then(function (serviceWorker) {
        serviceWorker.showNotifiycation("fghdgfdhfg");
      });
    });
  }, []);

  useEffect(() => {
    axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${'inr'}.json`)
      .then((res) => {
        let converter = countryCodes.customList('countryCallingCode', '{currencyCode}')[profile?.countryCode]
        dispatch(setRate({ rate: res?.data['inr'][converter?.toLowerCase() || 'inr'], symbol: getSymbolFromCurrency(converter), code: converter }))
      })
  }, [profile]);

  useEffect(() => {
    const initClient = () => {
      // gapi?.client?.init({
      //   clientId:
      //     "816587088072-mlqlvbpig16sa687eddfg2vskoth81eo.apps.googleusercontent.com",
      //   scope: "email profile",
      // });
      window.gapi.client.init({
        clientId:
          "816587088072-mlqlvbpig16sa687eddfg2vskoth81eo.apps.googleusercontent.com",
        scope: "email profile",
        plugin_name: "question answere",
      });
    };
    gapi.load("client:auth2", initClient);
  });


  return (
    <div className="main_wrapper">
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {!token && <PublicRoute />}
      {token && (profile.profileStatus == 0 || profile.profileStatus == 2) && (
        <ExamRoute status={profile.profileStatus} />
      )}
      {token &&
        (profile.profileStatus == 1 ||
          profile.profileStatus == 3 ||
          profile.profileStatus == 5) && (
          <DocumentRoute status={profile.profileStatus} />
        )}
      {token && profile.profileStatus == 4 && <PrivateRoute />}
    </div>
  );
}

export default App;
