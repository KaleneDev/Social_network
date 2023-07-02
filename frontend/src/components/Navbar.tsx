import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserIdContext } from "./AppContext";
import "../style/components/Navbar.scss";
function Navbar() {
    const uid = useContext(UserIdContext);

    return (
        <>
            <div className="nav-container">
                <div className="logo">
                    <NavLink end to="/">
                        <h2>Sociopedia</h2>
                    </NavLink>
                </div>
                {uid ? (
                    <ul className="nav-links">
                        <li>
                            <NavLink end to="/profile">
                                <h3>Profile</h3>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink end to="/logout">
                                <h3>Logout</h3>
                            </NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul className="nav-links">
                        <li>
                            <NavLink end to="/login">
                                <h3>Login</h3>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink end to="/register">
                                <h3>Register</h3>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
}

export default Navbar;
