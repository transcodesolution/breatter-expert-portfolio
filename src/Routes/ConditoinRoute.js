import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Exampage from "../Pages/Exam/Exampage";

function ConditionRoute() {
    return (
        <Routes>
            <Route path="/terms" element={<Exampage />} />
            <Route path="*" element={<Navigate replace to="/terms" />} />
        </Routes>
    );
}

export default ConditionRoute;
