import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home.page";
import Login from "../../pages/Login.page";
import Profile from "../../pages/Profile.page";
import ProfileUser from "../../pages/ProfileUser";

function index() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<ProfileUser />} />
        </Routes>
    );
}

export default index;
