import axios from "axios";
import "../../style/components/Log/Logout.scss";

function Logout() {
    const logout = async () => {
        await axios({
            method: "get",
            url: `${import.meta.env.VITE_APP_URL}users/logout`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            withCredentials: true,
        })
            .then(() => {
                if (typeof localStorage !== "undefined") {
                    localStorage.removeItem("jwt");
                    localStorage.removeItem("jwtExpiration");
                }
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div onClick={logout} className="logout">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
            </svg>
        </div>
    );
}

export default Logout;
