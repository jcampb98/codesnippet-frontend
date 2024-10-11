import { FormEvent, useState, useEffect } from "react";
import { signupFields } from "../../constants/formFields";
import FormAction from "../layout/FormAction";
import Input from "../layout/Input";
import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

const fields = signupFields;
const fieldsState: { [key: string]: string } = {};
fields.forEach(field => fieldsState[field.id] = '');

interface ApiResponse {
    status: boolean;
    message: string;
    errors?: {
        [key: string]: string[];
    };
}

interface ApiResponseError {
    message: string;
    errors?: {
        [key: string]: string[];
    };
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

                toast.success(responseData.message);
            }
            else {
                toast.error(responseData.message);
            }
        }
        catch (error: unknown) {
            const axiosError = error as AxiosError<ApiResponseError>;

            if(axiosError.response && axiosError.response.data && axiosError.response.data.errors) {
                toast.error("Validation Error: " + JSON.stringify(axiosError.response.data.errors));
            }
            else {
                toast.error("Error: Creating User Account");
            }
        }
    };

    useEffect(() => {
        if(isSignedUp) {
            window.location.replace(`${import.meta.env.VITE_BASE_URL}/login`); // Redirect to login page after signup success.
            setIsSignedUp(false); // Reset signup state to false to allow new signup attempts.
        }
    }, [isSignedUp]);

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