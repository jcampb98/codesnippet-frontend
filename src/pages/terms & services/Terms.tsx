import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "../../styles/terms-and-conditions/Terms.css";

export default function TermsAndServicesPage() {
    return (
        <div className="terms-and-service-container">
            <div className="navbar-container">
                <Navbar />
            </div>
            <h1 className="terms-and-services-heading">Terms and Services</h1>
            <ol className="terms-and-services-list">
                <li className="terms-and-services-item">
                    <h2 className="item-header">Acceptance of Terms</h2>
                    <p className="item-text">
                        By accessing or using our website [YourWebsite.com], 
                        you agree to comply with and be bound by these Terms and Services. 
                        If you do not agree with these terms, 
                        please do not use our site or services.
                    </p>
                </li>
                <li className="terms-and-services-item">
                    <h2 className="item-header">Modifications to Terms</h2>
                    <p className="item-text">
                        We reserve the right to update or change these Terms at any time, and it is your responsibility to review this page periodically. Your continued use of the site after any changes indicates your acceptance of the new terms.
                    </p>
                </li>
                <li className="terms-and-services-item">
                    <h2 className="item-header">Use of Our Service</h2>
                    <p className="item-text">
                        Our website and services are intended for users who are at least 18 years of age. By using our services, you affirm that you are at least 18 or have permission from a legal guardian to use our services.
                    </p>
                </li>
                <li className="terms-and-services-item">
                    <h2 className="item-header">Account Responsibilities</h2>
                    <p className="item-text">
                        To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.
                    </p>
                </li>
                <li className="terms-and-services-item">
                    <h2 className="item-header">Privacy Policy</h2>
                    <p className="item-text">
                        Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
                    </p>
                </li>
                <li className="terms-and-services-item">
                    <h2 className="item-header">Prohibited Use's</h2>
                    <p className="item-text">
                        You agree not to misuse our services. Prohibited uses include but are not limited to:

                        Violating any local, state, national, or international law or regulation.
                        Harassing, abusing, or harming other users.
                        Impersonating another person or entity or falsely stating information.
                        Interfering with or disrupting the security of the website.
                    </p>
                </li>
                <li className="terms-and-services-item">
                    <h2 className="item-header">Intellectual Property</h2>
                    <p className="item-text">
                        All content, trademarks, logos, and other intellectual property displayed on the website are the property of [Your Company Name] or third parties. You may not use, copy, modify, or distribute any content without prior written consent.
                    </p>
                </li>
                <li className="terms-and-services-item">
                    <h2 className="item-header">Limitation of Liability</h2>
                    <p className="item-text">
                        To the fullest extent permitted by law, [Your Company Name] shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use our service; (ii) unauthorized access to or use of our servers; or (iii) any third-party conduct on our website.
                    </p>
                </li>
                <li className="terms-and-services-item">
                    <h2 className="item-header">Termination of Use</h2>
                    <p className="item-text">
                        We reserve the right to terminate or suspend your access to our services at any time, without notice, for any conduct we deem harmful or in violation of these Terms.
                    </p>
                </li>
                <li className="terms-and-services-item">
                    <h2 className="item-header">Governing Law</h2>
                    <p className="item-text">
                        These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising from these Terms will be resolved in the appropriate courts of [Your Jurisdiction].
                    </p>
                </li>
            </ol>
            <div className="footer-container">
                <Footer />
            </div>
        </div>
    );
}