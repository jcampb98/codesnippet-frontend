import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import 'highlight.js/styles/default.css';

interface CodeBlockProps {
    code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if(codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [code]);

    return (
        <pre>
            <code ref={codeRef}>
                {code}
            </code>
        </pre>
    );
};

export default CodeBlock;