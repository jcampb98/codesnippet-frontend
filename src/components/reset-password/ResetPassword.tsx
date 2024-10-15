import { useState, useEffect } from "react";
import { resetPasswordFields } from "../../constants/formFields";
import Input from "../layout/Input";
import FormAction from "../layout/FormAction";
import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const fields = resetPasswordFields;
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

export default function ResetPassword() {
    const [resetPasswordState, setResetPasswordState] = useState(fieldsState);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: boolean }>({});
    const { token } = useParams<{ token: string }>();
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResetPasswordState({...resetPasswordState, [e.target.name]: e.target.value});
        setValidationErrors({...validationErrors, [e.target.name]: false});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(validateForm()) {
            try {
                const jsonData = {
                    token: token,
                    password: resetPasswordState.password,
                };

                const response: AxiosResponse = await axios.post(`${import.meta.env.VITE_API_URL}/reset-password`, jsonData);

                const responseData: ApiResponse = response.data;

                if(responseData.status === "success") {
                    setSubmitted(true);

                    toast.success(responseData.message);
                }
                else {
                    toast.error(responseData.message);
                }
            }
            catch (error: unknown) {
                const axiosError = error as AxiosError<ApiResponseError>;

                if(axiosError.response && axiosError.response.data && axiosError.response.data.errors) {
                    toast.error("Validation Error: The Email Address is Invalid");
                }
                else {
                    toast.error("Error in Sending Reset Password E-Mail");
                }
            }
        }
    };

    useEffect(() => {
        if(submitted) {
            setTimeout(() => {
                navigate("/login");
            }, 5000);
        }
    }, [submitted, navigate]);

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: boolean} = {};

        Object.keys(resetPasswordState).forEach((key) => {
            if(!resetPasswordState[key]) {
                newErrors[key] = true;
            }
        });

        setValidationErrors(newErrors);

        if(Object.keys(newErrors).length > 0) {
            toast.error("Please fill in all required fields.");
            return false;
        }

        return true;
    };

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
                {
                    fields.map(field => 
                        <Input 
                            key={field.id}
                            handleChange={handleChange}
                            value={resetPasswordState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                            customClass={validationErrors[field.id] ? "border-red-500" : ""}
                        />
                    )
                }
            </div>

            <FormAction handleSubmit={handleSubmit} text="Send Reset Link" />
        </form>
    );
}