import { useState } from "react";
import { toast } from "react-toastify";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

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

export default function UpdateCodeSnippetForm(id) {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({
        title: false,
        body: false
    }); // Tracks field errors
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if(validateForm()) {
            updateSnippet();
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: boolean } = { title: false, body: false };
        let isValid = true;

        if(title.trim() === '') {
            newErrors.title = true;
            isValid = false;
        }
        if(body.trim() === '') {
            newErrors.body = true;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const updateSnippet = async (id) => {
        try {
            const jsonData = {
                title: title,
                code_snippet: body
            };

            const token = localStorage.getItem('token');

            if(!token) {
                toast.error("Error: No token found. Please login again.");

                navigate('/login');
            }

            const response: AxiosResponse = await axios.put(`${import.meta.env.VITE_API_URL}/code/${id}`, 
                jsonData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            const responseData: ApiResponse = response.data;

            if(responseData.status === "success") {
                toast.success(responseData.message);

                navigate("/code-snippets");
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
                toast.error("Error: Creating CodeSnippet failed");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
                <h1 className="text-2xl font-semibold mb-6 text-center">
                    Update CodeSnippet
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                            CodeSnippet Title
                        </label>
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">Title is required.</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="body">
                            Insert CodeSnippet Here
                        </label>
                        <textarea
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-48"
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        {errors.body && (
                            <p className="text-red-500 text-sm mt-1">CodeSnippet is required.</p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}