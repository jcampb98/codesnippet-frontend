import CodeBlock from "../../components/code-snippet/CodeBlock";

interface ViewCodeSnippetProps {
    title: string;
    code_snippet: string;
}

const ViewCodeSnippet = ({ title, code_snippet }: ViewCodeSnippetProps)  => {
    return(
        <>
            <h3 className="code-snippet-title">{title}</h3>
            <br />
            <div className="code-block">
                <button type="button" className="copy-btn">Copy</button>
                <div className="code-content">
                    <CodeBlock code={code_snippet} />
                </div>
            </div>
        </>
    );
}

export default ViewCodeSnippet;