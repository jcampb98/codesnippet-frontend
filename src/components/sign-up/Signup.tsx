import { FormEvent, useState, useEffect } from "react";
import { signupFields } from "../../constants/formFields";
import FormAction from "../layout/FormAction";
import FormRedirect from "../layout/FormRedirect";
import Input from "../layout/Input";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const fields = signupFields;
const fieldsState: { [key: string]: string } = {};
fields.forEach(field => fieldsState[field.id] = '');

interface ApiResponse {
    status: string;
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
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({}); // Tracks field errors
    const navigate = useNavigate();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupState({...signupState, [e.target.name]: e.target.value});
        setErrors({...errors, [e.target.name]: false});
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(validateForm()) {
            createAccount();
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: boolean} = {};

        Object.keys(signupState).forEach((key) => {
            if(!signupState[key]) {
                newErrors[key] = true;
            }
        });

        setErrors(newErrors);

        if(Object.keys(newErrors).length > 0) {
            toast.error("Please fill in all required fields.");
            return false;
        }

        return true;
    };

    // Signup API Integration
    const createAccount = async () => {
        try {
            const jsonData = {
                name: signupState.name,
                email: signupState.email,
                password: signupState.password
            };

            const response: AxiosResponse = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, jsonData);

            const responseData: ApiResponse = response.data;

            console.log(responseData);

            if(responseData.status === "success") {
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
                toast.error("Validation Error: There are missing fields");
            }
            else {
                toast.error("Error: Creating User Account");
            }
        }
    };

    useEffect(() => {
        if(isSignedUp) {
            setTimeout(() => {
                navigate("/login");
            }, 5000);
        }
    }, [isSignedUp, navigate]);

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
                            customClass={errors[field.id] ? "border-red-500" : ""}
                        />
                    )
                }
            </div>

            <FormAction handleSubmit={handleSubmit} text="Signup" />
            <FormRedirect />
        </form>
    );
}