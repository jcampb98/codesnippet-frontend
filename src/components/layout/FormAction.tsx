import { FormEvent } from "react";

interface FormActionProps {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    type?: string;
    action?: 'submit' | 'button' | 'reset';
    text: string;
}

export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text
}: FormActionProps){
    return(
        <>
        {
            type === 'Button' ?
            <button
                type={action}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
                onClick={(e) => handleSubmit(e as unknown as FormEvent<HTMLFormElement>)}
            >
                {text}
            </button>
            :
            <></>
        }
        </>
    );
}