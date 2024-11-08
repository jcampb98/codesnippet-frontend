import { Link } from "react-router-dom";
import "../../styles/footer/Footer.css";

export default function Footer() {
    return(
        <footer className="footer-container">
            <div className="footer">
                <div className="footer-links">
                    <Link to="/about" className="footer-link">About</Link>
                    <Link to="/terms-and-services" className="footer-link">Terms & Conditions</Link>
                    <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
                </div>
                <div className="footer-attribution">
                    <p>&copy; 2023 Joshua Campbell. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}