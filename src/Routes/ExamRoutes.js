import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Examfail from "../Pages/Exam/Examfail";
import Exampage from "../Pages/Exam/Exampage";
import ExamDurationpage from "../Pages/ExamDuration/ExamDurationpage";

function ExamRoute({ status }) {
    return <>
        {
            status === 0 ? <>      <Routes>
                <Route path="/terms" element={<Exampage />} />
                <Route path="/ExamDurationpage" element={<ExamDurationpage />} />
                <Route path="*" element={<Navigate replace to="/terms" />} />
            </Routes></> : status === 2 ?
                <Routes>
                    <Route path="/examFail" element={<Examfail />} />
                    <Route path="*" element={<Navigate replace to="/examFail" />} />
                </Routes> : <Routes>

                    <Route path="*" element={<Navigate replace to="/LoginPage" />} />
                </Routes>
        }

    </>
        ;
}

export default ExamRoute;
