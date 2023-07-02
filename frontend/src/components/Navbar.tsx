import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserIdContext } from "./AppContext";
import Logout from "./Log/Logout";
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
                                <div>Login</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink end to="/register">
                                <div>Register</div>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
}

export default Navbar;
