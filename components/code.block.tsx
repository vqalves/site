import styles from '../styles/code.block.module.css'

export class CodeBlockLanguage {
    static csharp: CodeBlockLanguage = new CodeBlockLanguage("csharp");
    static json: CodeBlockLanguage = new CodeBlockLanguage("json");
    static xml: CodeBlockLanguage = new CodeBlockLanguage("xml");
    static bash: CodeBlockLanguage = new CodeBlockLanguage("bash");
    static dockerfile: CodeBlockLanguage = new CodeBlockLanguage("dockerfile");

    readonly code: string;

    constructor(code: string) {
        this.code = code;
    }
}

function htmlEncode(text: string) {
    return text.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/'/g, '&#39;')
                .replace(/"/g, '&#34;')
                .replace(/\//, '&#x2F;');
  }

export interface CodeBlockProps {
    language: CodeBlockLanguage;
    code: string;
    useEncode?: boolean;
}

export default function CodeBlock({ language, code, useEncode = true } : CodeBlockProps) {
    if(useEncode) {
        code = htmlEncode(code);
    }

    return (
        <div className={styles.code_block}>
            <pre>
                <code dangerouslySetInnerHTML={{__html: code}}>

                </code>
            </pre>
        </div>
    );
}