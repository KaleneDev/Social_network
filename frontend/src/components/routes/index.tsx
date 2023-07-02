import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home.page";
import Login from "../../pages/Login.page";
import Profile from "../../pages/Profile.page";

function index() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default index;
