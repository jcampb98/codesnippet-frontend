import { FormEvent, useState } from "react";
import { signupFields } from "../../constants/formFields";
import FormAction from "../layout/FormAction";
import Input from "../layout/Input";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const fields = signupFields;
const fieldsState: { [key: string]: string } = {};
fields.forEach(field => fieldsState[field.id] = '');

interface ApiResponse {
    status: boolean;
    message: string;
    errors: string[];
}

export default function Signup() {
    const [signupState, setSignupState] = useState(fieldsState);
    const [isSignedUp, setIsSignedUp] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupState({...signupState, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createAccount();
    };

    // Signup API Integration
    const createAccount = async () => {
        try {
            const jsonData = {
                name: signupState.name,
                username: signupState.username,
                email: signupState.email,
                password: signupState.password
            };

            const response: AxiosResponse = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, jsonData);

            const responseData: ApiResponse = response.data;

            console.log(responseData);

            if(responseData.status === true) {
                setIsSignedUp(true);

                pageRedirect(isSignedUp);
            }
        }
        catch (error) {
            console.error(error);

            toast.error("Error: Creating User Account");
        }
    };

    const pageRedirect = (isSignedUp: boolean) => {
        if(isSignedUp) {
            window.location.replace(`${import.meta.env.VITE_BASE_URL}/login`);
        }
    }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
                {
                    fields.map(field => 
                        <Input 
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )
                }
            </div>

            <FormAction handleSubmit={handleSubmit} text="Signup" />
        </form>
    );
}