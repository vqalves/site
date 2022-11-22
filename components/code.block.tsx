export class CodeBlockLanguage {
    static csharp: CodeBlockLanguage = new CodeBlockLanguage("csharp");
    static json: CodeBlockLanguage = new CodeBlockLanguage("json");

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
}

export default function CodeBlock({ language, code } : CodeBlockProps) {
    code = htmlEncode(code);

    return (
        <div>
            <code>
                <pre dangerouslySetInnerHTML={{__html: code}}>

                </pre>
            </code>
        </div>
    );
}