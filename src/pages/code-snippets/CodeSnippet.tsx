import { useState, useEffect } from "react";
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

interface SnippetType {
    id: number;
    title: string;
    code_snippet: string;
    user_id: number;
    created_at?: string | null;
    updated_at?: string | null;
    guid: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function CodeSnippetPage() {
    const [user, setUser] = useState<User | null>();
    const [codeSnippet, setCodeSnippet] = useState<CodeSnippetResponse[]>([]);
    const [detectedLanguages, setDetectedLanguages] = useState<{ [id: number]: string }>();
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [languageOptions, setLanguageOptions] = useState<string[]>([]);
    const [expanded, setExpanded] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredSnippets, setFilteredSnippets] = useState<SnippetType[]>(codeSnippet);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Error: No authentication token found. Redirecting to Login...");
            navigate("/login");
            return;
        }

        axios.get(`${import.meta.env.VITE_API_URL}/validate-token`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            if(response.status === 200) {
                setUser(response.data.user);
            }
        })
        .catch(() => {
            toast.error("Error: Invalid Token Redirecting to Login");

            localStorage.removeItem('token');

            navigate("/login");
        });
    }, [navigate]);

    useEffect(() => {
        if(user) {
            const token = localStorage.getItem("token");

            // Fetch code snippets from API
            axios.get(`${import.meta.env.VITE_API_URL}/code/${user.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                setCodeSnippet(response.data.code);
            })
            .catch((error) => {
                if(error.response && error.response.status === 500) {
                    toast.error("Error fetching code snippets: ", error);
                }
            });
        }
    }, [user, navigate]);

    useEffect(() => {
        const languages = Array.from(new Set(Object.values(detectedLanguages || {})));
        setLanguageOptions(languages);
    }, [detectedLanguages]);

    if(!user) {
        return <LoadingSpinner text="Loading CodeSnippets..." />;
    }

    const handleSearchBoxChange = (e: { target: { value: string; };}) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = () => {
        if(search.length > 0) {
            const filtered = codeSnippet.filter((snippet) => {
                return snippet.title.toLowerCase().includes(search.toLowerCase());
            });

            setFilteredSnippets(filtered);
        }
        else {
            setFilteredSnippets(codeSnippet);
        }
    };

    const handleCheckboxChange = (selectedValues: string []) => {
        setSelectedLanguages(selectedValues);

        if(selectedValues.length > 0) {
            const filtered = codeSnippet.filter((snippet) => {
                return selectedValues.includes(detectedLanguages?.[snippet.id] || "");
            });

            setFilteredSnippets(filtered);
        }
        else {
            setFilteredSnippets(codeSnippet);
        }
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

    return(
        <div className="container">
            <SideBar user={user} expanded={expanded} setExpanded={setExpanded} />
            <div className="content">
                <div className="top-page-container mb-6">
                    <h1 className="page-heading">CodeSnippets</h1>
                    <div className="w-full lg:w-3/4">
                        <SearchBar onChange={handleSearchBoxChange} value={search} onSubmit={handleSearchSubmit} />
                    </div>
                    <div className="checkbox-group mt-6">
                    <div className="mt-6">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Select Your Technologies:</h3>
                        <CheckboxGroup options={languageOptions} onChange={handleCheckboxChange} />
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
                            filteredSnippets.length > 0 
                            ? filteredSnippets.map((snippet) => (
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
                            ))
                            : selectedLanguages.length > 0 
                            ? codeSnippet.map((snippet) => (
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
                            ))
                            : codeSnippet.length > 0 ? (
                                codeSnippet.map((codeSnippet) => (
                                    <div key={codeSnippet.id} className="grid-item">
                                        <div className="code-snippet-container">
                                            <div className='code-snippet-card'>
                                                <CodeSnippet 
                                                    title={codeSnippet.title} 
                                                    code={codeSnippet.code_snippet} 
                                                    onClick={() => copyToClipboard(codeSnippet.code_snippet)}
                                                    onLanguageDetected={(language) => handleLanguageDetected(codeSnippet.id, language)} 
                                                />
                                                <div className="code-snippet-buttons">
                                                    <button onClick={() => updateCodeSnippet(codeSnippet)} className="edit-btn">Edit</button>
                                                    <button onClick={() => deleteCodeSnippet(codeSnippet.id)} className="delete-btn">Delete</button>
                                                    <button onClick={() => shareCodeSnippet(codeSnippet.guid)} className="share-btn">Share CodeSnippet</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <p className="text-center text-gray-500">No code snippets found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}