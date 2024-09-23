import "../../styles/navbar/Navbar.css";

function Navbar() {
    return (
        <div className="navbar-container">
            <nav className="navbar">
                <img className="nav-logo" src="../../../codesnippet-logo.svg" alt="image of CodeSnippet logo" />
                <ul className="nav-menu">
                    <li className="nav-item">Home</li>
                    <li className="nav-item">About</li>
                </ul>
                <div className="hamburger">
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