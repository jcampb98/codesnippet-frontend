import { useState, useEffect } from "react";
import SideBar from "../../components/side-bar/SideBar";
import SearchBar from "../../components/layout/SearchBar";
import CheckboxGroup from "../../components/layout/CheckboxGroup";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import axios from "axios";
import "../../styles/code-snippets/CodeSnippets.css";
import { useNavigate } from "react-router-dom";

interface User {
    id: number;
    name: string;
    email: string;
}

const options = [
    { label: "JavaScript", value: "javascript"},
    { label: "TypeScript", value: "typescript"},
    { label: "C#", value: "c-sharp"},
    { label: "React.js", value: "react"},
]

export default function CodeSnippetPage() {
    const [user, setUser] = useState<User | null>();
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
       const token = localStorage.getItem("token");

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
        .catch((error) => {
            console.error(error);
        });
    }, []);

    if(!user) {
        return <LoadingSpinner text="Loading CodeSnippets..." />;
    }

    const handleCheckboxChange = (selectedValues: string []) => {
        console.log("Selected values: ", selectedValues);
    };

    const handleCreateSnippet = () => {
        navigate("/create-snippet");
    };

    return(
        <div className="container flex flex-col lg:flex-row h-screen">
            <SideBar user={user} expanded={expanded} setExpanded={setExpanded} />
            <div className="flex-grow 0">
                <div className="top-page-container space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="page-heading flex justify-between items-center">CodeSnippets</h1>
                        <div className="w-full lg:w-3/4">
                            <SearchBar />
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-bold text-gray-700 mb-4">Select Your Technologies:</h3>
                            <CheckboxGroup options={options} onChange={handleCheckboxChange} />
                        </div>
                    </div>
                </div>
                <div className="body-container mt-8">
                    <button onClick={handleCreateSnippet} className="float-left bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg">
                        + Create CodeSnippet
                    </button>
                </div>
            </div>
        </div>
    );
}