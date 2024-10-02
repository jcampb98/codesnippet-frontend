import Header from "../../components/layout/Header";
import Login from "../../components/login/Login";

function LoginPage() {
    return(
       <>
            <Header 
                heading="Login to your account" 
                paragraph="Don't have an account yet?"
                linkName="Register an Account?"
                linkUrl="/register"
            />
            <Login />
       </>
    );
};

export default LoginPage;