// import { useEffect } from "react";
import "../style/components/Header.scss";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <>
            <div className="Header">
                <NavLink end to="/">
                    <h1>Sociopedia</h1>
                </NavLink>
            </div>
        </>
    );
}

export default Header;
