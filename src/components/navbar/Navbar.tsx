import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/navbar/Navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [validatedUser, setValidatedUser] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get(`${import.meta.env.VITE_API_URL}/validate-token`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if(response.status === 200) {
                    setValidatedUser(true);
                }
             })
            .catch((error) => {
                if (error.response.status === 401) {
                    localStorage.removeItem("token");
                    setValidatedUser(false);
                }
             });
        } else {
            setValidatedUser(false);
        }
    }, [validatedUser, setValidatedUser]);

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
                    <li className="nav-item" onClick={closeMenu}>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li className="nav-item" onClick={closeMenu}>
                        <Link to="/terms-and-services">Terms & Services</Link>
                    </li>
                    { !validatedUser && 
                        <>
                            <li className="nav-item register-mobile-link" onClick={closeMenu}>
                                <Link to="/register">Register</Link>
                            </li>
                            <li className="nav-item login-mobile-link" onClick={closeMenu}>
                                <Link to="/login">Login</Link>
                            </li>
                        </>
                    }
                    { validatedUser && 
                        <li className="nav-item dashboard-mobile-link" onClick={closeMenu}>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    }
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