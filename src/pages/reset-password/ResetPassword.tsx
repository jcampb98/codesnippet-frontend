import Header from "../../components/layout/Header";
import ResetPassword from "../../components/reset-password/ResetPassword";

export default function ResetPasswordPage() {
    return(
        <>
            <Header 
                heading="Reset Password" 
                paragraph="Enter a new password!"
                linkName="Back to Home Page"
                linkUrl="/"
            />
            <ResetPassword />
       </>
    );
}