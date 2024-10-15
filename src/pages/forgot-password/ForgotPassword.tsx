import Header from "../../components/layout/Header";
import ForgotPassword from "../../components/forgot-password/ForgotPassword";

export default function ForgotPasswordPage() {
    return(
        <>
            <Header 
                heading="Forgot Password" 
                paragraph="Enter your E-Mail Address"
                linkName="Back to Login Page"
                linkUrl="/login"
            />
            <ForgotPassword />
       </>
    );
}