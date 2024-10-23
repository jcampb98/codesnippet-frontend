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
    created_at: string;
    updated_at: string;
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
}

const options = [
    { label: "JavaScript", value: "javascript"},
    { label: "TypeScript", value: "typescript"},
    { label: "C#", value: "c-sharp"},
    { label: "React.js", value: "react"},
]

export default function CodeSnippetPage() {
    const [user, setUser] = useState<User | null>();
    const [codeSnippet, setCodeSnippet] = useState<CodeSnippetResponse[]>([]);
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
        console.log("Selected values: ", selectedValues);
    };

    const handleCreateSnippet = () => {
        navigate("/create-snippet");
    };

    const updateCodeSnippet = () => {
        navigate("/update-snippet");
    }

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
                        <CheckboxGroup options={options} onChange={handleCheckboxChange} />
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
                            search.length > 0 
                            ? filteredSnippets.map(snippet => (
                                <div key={snippet.id} className="grid-item">
                                    <div className="code-snippet-container">
                                        <div className='code-snippet-card'>
                                            <CodeSnippet title={snippet.title} code={snippet.code_snippet} />
                                            <div className="code-snippet-buttons">
                                                <button onClick={updateCodeSnippet} className="edit-btn">Edit</button>
                                                <button onClick={() => deleteCodeSnippet(snippet.id)} className="delete-btn">Delete</button>
                                                <button className="share-btn">Share CodeSnippet</button>
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
                                                <CodeSnippet title={codeSnippet.title} code={codeSnippet.code_snippet} />
                                                <div className="code-snippet-buttons">
                                                    <button onClick={updateCodeSnippet} className="edit-btn">Edit</button>
                                                    <button onClick={() => deleteCodeSnippet(codeSnippet.id)} className="delete-btn">Delete</button>
                                                    <button className="share-btn">Share CodeSnippet</button>
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