import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import DocUploadpage from "../Pages/DocUpload/DocUploadpage";
import Reject from "../Pages/DocUpload/Reject";
import Underprocess from "../Pages/DocUpload/Underprocess";

function DocumentRoutes({ status }) {
    return <>  {status === 1 ? <Routes>
        <Route path="/DocUploadpage" element={<DocUploadpage />} />
        <Route path="*" element={<Navigate replace to="/DocUploadpage" />} />
    </Routes> : status === 3 ? <Routes>
        <Route path="/documentPending" element={<Underprocess />} />
        <Route path="*" element={<Navigate replace to="/documentPending" />} />
    </Routes> : <Routes>
        <Route path="/documentRejected" element={<Reject />} />
        <Route path="*" element={<Navigate replace to="/documentRejected" />} />

    </Routes>}</>


}

export default DocumentRoutes;
