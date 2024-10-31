import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import 'highlight.js/styles/default.css';

interface CodeBlockProps {
    code: string;
    onLanguageDetected: (language: string) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, onLanguageDetected }) => {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if(codeRef.current) {
            // Detects the language and applies syntax highlighting
            const { value: highlightedCode, language } = hljs.highlightAuto(code);

            codeRef.current.innerHTML = highlightedCode;

            if(language) {
                onLanguageDetected(language);
            }
        }
    }, [code, onLanguageDetected]);

    return (
        <pre>
            <code ref={codeRef}>
                {code}
            </code>
        </pre>
    );
};

export default CodeBlock;