import CodeBlock from "../../components/code-snippet/CodeBlock";
import { toast } from "react-toastify";

interface ViewCodeSnippetProps {
    title: string;
    code_snippet: string;
}

const ViewCodeSnippet = ({ title, code_snippet }: ViewCodeSnippetProps)  => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(code_snippet);

        toast.success("Code snippet copied to clipboard!");
    };

    return(
        <>
            <h3 className="code-snippet-title">{title}</h3>
            <br />
            <div className="code-block">
                <button type="button" className="copy-btn" onClick={copyToClipboard}>Copy</button>
                <div className="code-content">
                    <CodeBlock code={code_snippet} />
                </div>
            </div>
        </>
    );
}

export default ViewCodeSnippet;