import CodeBlock from './CodeBlock';

interface CodeSnippetProps {
    title: string;
    code: string;
}

const CodeSnippet = ({ title, code }: CodeSnippetProps)  =>{
    return(
        <div>
            <h3 className="code-snippet-title">{title}</h3>
            <br />
            <CodeBlock code={code} />
        </div>
    );
}

export default CodeSnippet;