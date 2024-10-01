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
                    <li className="nav-item" onClick={closeMenu}>Home</li>
                    <li className="nav-item" onClick={closeMenu}>About</li>
                </ul>
                <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <button type="button" className="register-btn">Register</button>
                <button type="button" className="login-btn">Login</button>
            </nav>
        </div>
    );
}

export default Navbar;