import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home.page";
import Login from "../../pages/Login.page";

function index() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default index;
