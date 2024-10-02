import Header from "../../components/layout/Header";
import Signup from "../../components/sign-up/Signup";

function RegisterPage() {
    return(
        <>
            <Header 
                heading="Signup to create an account"
                paragraph="Already have an account?"
                linkName="Login"
                linkUrl="/login"
            />
            <Signup />
        </>
    );
};

export default RegisterPage;