import { Link } from "react-router-dom";
import { useState } from "react";
import "../../styles/navbar/Navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <img className="nav-logo" src="../../../codesnippet-logo.svg" alt="image of CodeSnippet logo" />
                <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
                    <li className="nav-item" onClick={closeMenu}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item" onClick={closeMenu}>
                        About
                    </li>
                </ul>
                <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <Link className="nav-link" to={"/register"}>
                    <button type="button" className="register-btn">Register</button>
                </Link>
                <Link className="nav-link" to={"/login"}>
                    <button type="button" className="login-btn">Login</button>
                </Link>
            </nav>
        </div>
    );
}

export default Navbar;