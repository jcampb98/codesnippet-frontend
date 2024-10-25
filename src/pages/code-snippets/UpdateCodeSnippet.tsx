import { useState, useEffect } from "react";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import axios from "axios";
import SideBar from "../../components/side-bar/SideBar";
import UpdateCodeSnippetForm from "../../components/code-snippet/UpdateCodeSnippetForm";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function UpdateCodeSnippetPage() {
    const [user, setUser] = useState<User | null>();
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const { singleCodeSnippet: codeSnippet } = location.state || {};

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
         .catch(() => {
            toast.error("Error: Invalid Token Redirecting to Login");

            localStorage.removeItem('user');
            navigate("/login");
         });
    }, [navigate]);

    if(!codeSnippet) {
        navigate("/code-snippets");
        return;
    }
 
    if(!user) {
        return <LoadingSpinner text="Loading Form..." />;
    }

    return (
        <div className="flex min-h-screen">
            <SideBar user={user} expanded={expanded} setExpanded={setExpanded} />
            <div className="flex grow p-8 bg-gray-100">
                <div className="max-w-3x1 mx-auto">
                    {codeSnippet &&
                        <UpdateCodeSnippetForm 
                            id={codeSnippet.id}
                            title={codeSnippet.title}
                            code_snippet={codeSnippet.code_snippet}
                        />
                    }
                </div>
            </div>
        </div>
    );
}