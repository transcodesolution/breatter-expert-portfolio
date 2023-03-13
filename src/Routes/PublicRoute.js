import React from "react";

import { Route, redirect, Navigate, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Loginpage from "../Pages/Login/Loginpage";
import Signuppagepage from "../Pages/Signup/Signuppage";

function PublicRoute() {
  return (
    <Routes>
      <Route path="/Loginpage" element={<Loginpage />} />
      <Route path="/Signuppage" element={<Signuppagepage />} />
      <Route path="*" element={<Navigate replace to="/LoginPage" />} />
    </Routes>
  );
}

export default PublicRoute;
