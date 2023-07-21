import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserIdContext } from "../AppContext";
import Logout from "../log/Logout.tsx";
import SearchBar from "../log/SearchBar.tsx";
import "../../style/components/Navbar.scss";
import { SlideInFromTop } from "../../utils/AnimationText";
function Navbar() {
    const uid = useContext(UserIdContext);

    return (
        <>
            <SlideInFromTop>
                <div className="nav-container">
                    <div className="logo">
                        <NavLink end to="/">
                            <h2>Sociopedia</h2>
                        </NavLink>
                        <li>
                            <SearchBar />
                        </li>
                    </div>
                    {uid ? (
                        <ul className="nav-links">
                            <li>
                                <NavLink end to="/profile">
                                    <div>Profile</div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink end to="/login">
                                    <Logout />
                                </NavLink>
                            </li>
                        </ul>
                    ) : (
                        <ul className="nav-links">
                            <li>
                                <NavLink end to="/login">
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
                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                        />
                                    </svg>
                                </NavLink>
                            </li>
                            {/* <li>
                            <NavLink end to="/register">
                                <div>Register</div>
                            </NavLink>
                        </li> */}
                        </ul>
                    )}
                </div>
            </SlideInFromTop>
        </>
    );
}

export default Navbar;
