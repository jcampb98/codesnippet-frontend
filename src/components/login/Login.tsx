import React, { FormEvent, useState, useEffect } from "react";
import { loginFields } from "../../constants/formFields";
import Input from "../layout/Input";
import FormAction from "../layout/FormAction";
import FormExtra from "../layout/FormExtra";
import FormRedirect from "../layout/FormRedirect";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const fields = loginFields;
const fieldsState: { [key: string]: string } = {};
fields.forEach(field => fieldsState[field.id] = '');

interface ApiResponse {
    status: string;
    message: string;
    authorisation: {
        token: string;
    };
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

export default function Login(){
    const [loginState, setLoginState] = useState(fieldsState);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({}); // Tracks field errors
    const navigate = useNavigate();

    // Checks if token exists in localStorage and redirects if valid
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            axios.get(`${import.meta.env.VITE_API_URL}/validate-token`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if(response.status === 200) {
                    // Token is valid redirect to dashboard
                    navigate('/dashboard');
                }
            })
            .catch(() => {
                //Token is invalid, remove it from localStorage
                localStorage.removeItem('token');
            });
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginState({...loginState, [e.target.id]: e.target.value});
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(validateForm()) {
            authenticateUser();
        };
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: boolean} = {};

        Object.keys(loginState).forEach((key) => {
            if(!loginState[key]) {
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

    // Login API Integration
    const authenticateUser = async () => {
        try {
            const jsonData = {
                email: loginState.email,
                password: loginState.password,
                rememberMe: loginState.rememberMe
            };

            const response: AxiosResponse = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, jsonData);

            const responseData: ApiResponse = response.data;

            if(responseData.status === "success") {
                localStorage.setItem("token", responseData.authorisation.token);

                toast.success(responseData.message);

                navigate("/dashboard");
            }
            else {
                toast.error(responseData.message);
            }
        }
        catch(error: unknown) {
            const axiosError = error as AxiosError<ApiResponseError>;

            if(axiosError.response && axiosError.response.data && axiosError.response.data.errors) {
                toast.error("Validation Error: There are missing fields");
            }
            else {
                toast.error("Error: Signing in failed");
            }
        }
    };

    return(
        <>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="-space-y-px">
                    {
                        fields.map(field => 
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={loginState[field.id]}
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

                <FormExtra />
                <FormAction handleSubmit={handleSubmit} text="Login" />

                <FormRedirect />
            </form>
        </>
    );
}