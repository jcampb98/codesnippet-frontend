import { useState, useEffect, SetStateAction, useMemo } from "react";
import SideBar from "../../components/side-bar/SideBar";
import SearchBar from "../../components/layout/SearchBar";
import CheckboxGroup from "../../components/layout/CheckboxGroup";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import axios, { AxiosError } from "axios";
import "../../styles/code-snippets/CodeSnippets.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CodeSnippet from "../../components/code-snippet/CodeSnippet";

interface User {
    id: number;
    name: string;
    email: string;
}

interface CodeSnippetResponse {
    id: number;
    title: string;
    code_snippet: string;
    user_id: number;
    created_at?: string | null;
    updated_at?: string | null;
    guid: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface ApiResponseError {
    message: string;
    errors?: {
        [key: string]: string[];
    };
}

export default function CodeSnippetPage() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [codeSnippet, setCodeSnippet] = useState<CodeSnippetResponse[]>([]);
    const [detectedLanguages, setDetectedLanguages] = useState<{ [id: number]: string }>({});
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [expanded, setExpanded] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const languageOptions = Array.from(new Set(codeSnippet.map((snippet) => detectedLanguages?.[snippet.id]).filter((language): language is string => !!language)));

    // Fetch user and code snippets just once
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Error: No authentication token found. Redirecting to Login...");
            navigate("/login");
            return;
        }

        const fetchUserAndSnippets = async () => {
            try {
                // Validate the token
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/validate-token`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });

                if(response.status === 200) {
                    setUser(response.data.user);

                    // Fetch code snippets from API
                    const codeSnippetResponse = await axios.get(`${import.meta.env.VITE_API_URL}/code/${response.data.user.id}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    });

                    if(Array.isArray(codeSnippetResponse.data.code)) {
                        setCodeSnippet(codeSnippetResponse.data.code);
                    }
                    else {
                        console.error("Unexpected data format: code snippets should be an array.");
                        setCodeSnippet([]);
                    }
                }
            }
            catch (error: unknown) {
                const axiosError = error as AxiosError<ApiResponseError>;
                if(axiosError.response && axiosError.response.data && axiosError.response.data.errors) {
                    toast.error("Error: Signing in failed");
                    localStorage.removeItem('token');
                    navigate("/login");
                }
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchUserAndSnippets();
    }, [navigate]);

    const handleSearchBoxChange =(e: { target: { value: SetStateAction<string>; }; }) => {
        setSearch(e.target.value);
    };

    const handleCheckboxChange = (selectedValues: string []) => {
        setSelectedLanguages(selectedValues);
    };

    const handleCreateSnippet = () => {
        navigate("/create-snippet");
    };

    const updateCodeSnippet = (singleCodeSnippet: CodeSnippetResponse) => {
        console.log("Updating code snippet: ", singleCodeSnippet);

        navigate(`/update-snippet/${singleCodeSnippet.id}`, { state: { singleCodeSnippet }});
    };

    const handleLanguageDetected = (id: number, language: string) => {
        setDetectedLanguages((prev) => ({...prev, [id]: language}));
    };

    const deleteCodeSnippet = async (id: number) => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`${import.meta.env.VITE_API_URL}/code/${id}`, 
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            
            setCodeSnippet((prevSnippets) => prevSnippets.filter(snippet => snippet.id!== id));
            toast.success("Code snippet deleted successfully!");
        }
        catch(error: unknown) {
            const axiosError = error as AxiosError<ApiResponseError>;

            if(axiosError.response && axiosError.response.data && axiosError.response.data.errors) {
                toast.error("Error deleting code snippet.");
            }
        }
    }

    const copyToClipboard = (code_snippet: string) => {
        navigator.clipboard.writeText(code_snippet);

        toast.success("Code snippet copied to clipboard!");
    };

    const shareCodeSnippet = async (guid: string) => {
        navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}/share-snippet/${guid}`);

        toast.success("Code Snippet Link Copied!");
    };

    const codeSnippetList = useMemo(() => {
        return Array.isArray(codeSnippet) ? codeSnippet.filter(snippet => {
            const matchesSearch = snippet.title.toLowerCase().includes(search.toLowerCase());
            const matchesLanguages = selectedLanguages.length === 0 || selectedLanguages.includes(detectedLanguages?.[snippet.id] || "");

            return matchesSearch && matchesLanguages;
        }) : [];
    }, [search, selectedLanguages, codeSnippet, detectedLanguages]);

    if(!user && isLoading) {
        return <LoadingSpinner text="Loading CodeSnippets..." />;
    }

    return(
        <div className="container">
            {user && <SideBar user={user} expanded={expanded} setExpanded={setExpanded} />}
            <div className="content">
                <div className="top-page-container mb-6">
                    <h1 className="page-heading">CodeSnippets</h1>
                    <div className="w-full lg:w-3/4">
                        <SearchBar onChange={handleSearchBoxChange} value={search} />
                    </div>
                    <div className="checkbox-group mt-6">
                        <div className="mt-6">
                            {
                                languageOptions.length > 0 &&
                                <>
                                    <h3 className="text-xl font-bold text-gray-700 mb-4">Select Your Technologies:</h3>
                                    <CheckboxGroup options={languageOptions} onChange={handleCheckboxChange} />
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="body-container mt-8">
                    <button 
                        onClick={handleCreateSnippet} 
                        className="create-snippet-btn bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg">
                        + Create CodeSnippet
                    </button>
                    <div className="grid">
                        {
                            codeSnippetList.length > 0 
                            ? codeSnippetList.map((snippet) => (
                                <div key={snippet.id} className="grid-item">
                                    <div className="code-snippet-container">
                                        <div className='code-snippet-card'>
                                            <CodeSnippet 
                                                title={snippet.title} 
                                                code={snippet.code_snippet} 
                                                onClick={() => copyToClipboard(snippet.code_snippet)}
                                                onLanguageDetected={(language) => handleLanguageDetected(snippet.id, language)} 
                                            />
                                            <div className="code-snippet-buttons">
                                                <button onClick={() => updateCodeSnippet(snippet)} className="edit-btn">Edit</button>
                                                <button onClick={() => deleteCodeSnippet(snippet.id)} className="delete-btn">Delete</button>
                                                <button onClick={() => shareCodeSnippet(snippet.guid)} className="share-btn">Share CodeSnippet</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ) : (
                            <p className="text-center text-gray-500">No code snippets found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}