import "../../styles/navbar/Navbar.css";

function Navbar() {
    document.addEventListener("DOMContentLoaded", function() {
        const hamburger = document.querySelector<HTMLElement>(".hamburger");
        const navMenu = document.querySelector<HTMLElement>(".nav-menu");

        if (hamburger && navMenu) {
            hamburger.addEventListener("click", mobileMenu);
        }

        function mobileMenu() {
            if (hamburger && navMenu) {
                hamburger.classList.toggle("active");
                navMenu.classList.toggle("active");
            }
        }

        const navLinks = document.querySelectorAll<HTMLElement>(".nav-link");

        navLinks.forEach(item => {
            item.addEventListener("click", closeMenu);
        });

        function closeMenu(): void {
            if(hamburger && navMenu) {
                hamburger.classList.toggle("active");
                navMenu.classList.toggle("active");
            }
        }
    });

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