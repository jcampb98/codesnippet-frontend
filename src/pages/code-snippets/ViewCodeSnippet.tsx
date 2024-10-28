import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import ViewCodeSnippet from "../../components/code-snippet/ViewCodeSnippet";
import "../../styles/code-snippets/ShareCodeSnippet.css";
import { useParams } from "react-router-dom";

interface CodeSnippet {
    title: string;
    code_snippet: string;
}

export default function ViewCodeSnippetPage() {
    const { guid } = useParams();
    const [code, setCode] = useState<CodeSnippet>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCodeSnippet = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/code/guid/${guid}`);
                setCode(response.data.code);
            }
            catch(err) {
                setError("Error: " + err);
            }
        };

        getCodeSnippet();
    }, [guid]);

    if(error) {
        return <p>{error}</p>
    }

    if(!code) {
        return <LoadingSpinner text="Loading Code Snippet..." />;
    }

    return(
        <div className="share-code-snippet">
            <div className="share-code-container">
                <ViewCodeSnippet title={code.title} code_snippet={code.code_snippet} />
            </div>
        </div>
    );
}