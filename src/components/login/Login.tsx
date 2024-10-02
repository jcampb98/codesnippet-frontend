import React, { FormEvent, useState } from "react";
import { loginFields } from "../../constants/formFields";
import Input from "../layout/Input";
import FormAction from "../layout/FormAction";
import FormExtra from "../layout/FormExtra";

const fields = loginFields;
const fieldsState: { [key: string]: string } = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login(){
    const [loginState, setLoginState] = useState(fieldsState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginState({...loginState, [e.target.id]: e.target.value});
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        authenticateUser();
    };

    // Handle Login API Integration here
    const authenticateUser = () => {

    };

    return(
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
                        />
                    )
                }
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />
        </form>
    );
}