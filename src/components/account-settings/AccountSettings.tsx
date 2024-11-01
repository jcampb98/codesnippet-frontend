import { updateAccountFields } from "../../constants/formFields";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError, AxiosResponse } from "axios";
import Input from "../layout/Input";
import FormAction from "../layout/FormAction";

const fields = updateAccountFields;
const fieldsState: { [key: string]: string } = {};
fields.forEach(field => fieldsState[field.id] = '');

interface AccountSettingsProps {
    user: {
        id: number;
        name: string;
        email: string;
    }
}

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

const AccountSettings = (account: AccountSettingsProps) => {
    const [accountState, setAccountState] = useState(fieldsState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountState({...accountState, [e.target.id]: e.target.value});
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateUserAccount();
    };

    const updateUserAccount = async () => {
        try {
            const jsonData = {
                name: accountState.name,
                email: accountState.email,
                password: accountState.password
            }

            const response: AxiosResponse = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/update/${account.user.id}`, 
                jsonData, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const responseData: ApiResponse = response.data;

            if(responseData.status === "success") {
                toast.success(responseData.message);
            }
            else {
                toast.error(responseData.message);
            }
        }
        catch (error: unknown) {
            const axiosError = error as AxiosError<ApiResponseError>;
            if(axiosError.response && axiosError.response.data && axiosError.response.data.errors) {
                toast.error("Error: Updating Account Details failed");
            }
        }
    };

    return (
        <>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="-space-y-px">
                    {
                        fields.map(field => 
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={accountState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                                customClass={""}
                            />
                        )
                    }
                </div>

                <FormAction handleSubmit={handleSubmit} text="Update Account" />
            </form>
        </>
    );
}

export default AccountSettings;