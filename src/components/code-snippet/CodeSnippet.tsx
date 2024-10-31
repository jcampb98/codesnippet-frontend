import CodeBlock from './CodeBlock';

interface CodeSnippetProps {
    title: string;
    code: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onLanguageDetected: (language: string) => void;
}

const CodeSnippet = ({ title, code, onClick, onLanguageDetected }: CodeSnippetProps)  =>{
    return(
        <div>
            <h3 className="code-snippet-title">{title}</h3>
            <br />
            <div className="code-block">
                <button type="button" className="copy-btn" onClick={onClick}>Copy</button>
                <CodeBlock code={code} onLanguageDetected={onLanguageDetected} />
            </div>
        </div>
    );
}

export default CodeSnippet;