import CodeBlock from './CodeBlock';

interface CodeSnippetProps {
    title: string;
    code: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CodeSnippet = ({ title, code, onClick }: CodeSnippetProps)  =>{
    return(
        <div>
            <h3 className="code-snippet-title">{title}</h3>
            <br />
            <div className="code-block">
                <button type="button" className="copy-btn" onClick={onClick}>Copy</button>
                <CodeBlock code={code} />
            </div>
        </div>
    );
}

export default CodeSnippet;