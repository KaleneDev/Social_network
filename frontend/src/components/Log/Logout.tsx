import React from "react";
import axios from "axios";

function Logout() {
    const logout = async () => {
        await axios({
            method: "get",
            url: `${import.meta.env.VITE_APP_URL}users/logout`,
            withCredentials: true,
        })
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return <div onClick={logout}>Logout</div>;
}

export default Logout;
