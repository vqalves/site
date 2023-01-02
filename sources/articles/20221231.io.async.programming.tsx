import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import ExternalLink from "../../components/external.link";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";

import styles from "../../styles/articles/20221331.module.css";

function Cell({ size, className, text } : { size:number, className?:string | null, text?:string | null }) {
    const contentClass = text ? styles.execution_cell_content : "";

    return (
        <div style={{ flex: `${size}` }} className={`${styles.execution_cell} ${className}`}>
            <span className={contentClass}>{text}</span>
        </div>
    );
}

function HandlerVerticalLine({ reverse } : { reverse?: boolean | undefined }) {
    const assignmentLineCLass = !reverse ? styles.handler_assignment_line : styles.handler_assignment_line_reverse;

    return (
        <div className={assignmentLineCLass}>
            <div className={styles.handler_assignment_line_body}>
                <div className={styles.handler_assignment_line_segment}></div>
                <div className={styles.handler_assignment_line_arrow}>↓</div>
            </div>
        </div>        
    );
}

export const IOAsyncProgramming20221231 = new Article({
    code: "221231",
    date: new ArticleDate(2022, 12, 31),
    
    title: new LocaleContentText({
        en: "[Concept] Async programming, I/O operations and scalability",
        pt: "[Conceito] Programação assíncrona, operações de I/O e escalabilidade"
    }),

    description: new LocaleContentText({
        en: "Using async programming on I/O operations for scalability increase",
        pt: "Uso de programação assíncrona em operações de I/O para aumento de escalabilidade"
    }),

    slug: new LocaleContentText({
        en: "csharp-async-programming-io-and-scalability",
        pt: "csharp-programacao-assincrona-io-e-escalabilidade"
    }),

    tags: [ArticleTag.concept, ArticleTag.csharp],

    getContent: () => [
        new LocaleContentAny({
            en: (<p>Asynchronous programming is a technique that optimizes the usage of a thread. Operations that take too long can be assigned to another handler, while the main threads are used to execute the main operations. It's a staple for languages like NodeJS.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>This technique shines on I/O operations, because they rely on external resources and the thread has to wait for a response while doing nothing. Examples of I/O operations are: sending a command to a database, executing HTTP requests and opening files on the HDD</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>The example below demonstrates what happens when a single thread that has to handle multiple simultaneous method calls.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public Result Execute(string input)
{
    // A - CPU-bound runs in 2 seconds
    var value = TransformInput(input);

    // B - I/O-bound runs in 6 seconds
    var saveResult = SaveToDatabase(value);

    // C - CPU-bound runs in 2 second
    return TransformOutput(saveResult);
}`}></CodeBlock>),

        LocaleContentAny.all(<div>
            <div className={styles.execution_cell_title}>Thread</div>

            <div className={`top-border bottom-border ${styles.thread_line}`}>
                <div className={styles.execution_cell_title}>Call 1</div>
                
                <Cell size={2} className={styles.green_cell} text="A"></Cell>
                <Cell size={6} className={styles.red_cell} text="B"></Cell>
                <Cell size={2} className={styles.blue_cell} text="C"></Cell>

                <Cell size={10}></Cell>
                <Cell size={10}></Cell>
            </div>

            <div className={`bottom-border ${styles.thread_line}`}>
                <div className={styles.execution_cell_title}>Call 2</div>
                <Cell size={10}></Cell>

                <Cell size={2} className={styles.green_cell} text="A"></Cell>
                <Cell size={6} className={styles.red_cell} text="B"></Cell>
                <Cell size={2} className={styles.blue_cell} text="C"></Cell>

                <Cell size={10}></Cell>
            </div>

            <div className={`bottom-border ${styles.thread_line}`}>
                <div className={styles.execution_cell_title}>Call 3</div>
                <Cell size={10}></Cell>
                <Cell size={10}></Cell>

                <Cell size={2} className={styles.green_cell} text="A"></Cell>
                <Cell size={6} className={styles.red_cell} text="B"></Cell>
                <Cell size={2} className={styles.blue_cell} text="C"></Cell>
            </div>
        </div>),

        new LocaleContentAny({
            en: (<p>This thread can only handle the synchronous method calls in sequence. As every call takes 10 seconds, 3 calls requires 30 seconds to be completed. As a result, the thread ran commands only 40% of the time, and the other 60% was spent waiting.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>The I/O operation can be rewriten to use the <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/">async/await library</ExternalLink> and make use of it's asynchronous capabilities.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>When the thread hits an <u>await</u>, the operation will be forwarded to a dedicated handler, and the thread becomes free to process something else. When the assigned handler receives a response, the process will be notified and can assign a free thread to continue the execution.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public async Task<Result> ExecuteAsync(string input)
{
    // A - CPU-bound runs in 2 seconds
    var value = TransformInput(input);

    // B - I/O-bound runs in 6 seconds
    var saveResult = await SaveToDatabaseAsync(value);

    // C - CPU-bound runs in 2 second
    return TransformOutput(saveResult);
}`}></CodeBlock>),

        LocaleContentAny.all(<div>
            <div className={styles.execution_cell_title}>Thread</div>

            <div className={`top-border bottom-border ${styles.thread_line}`}>
                <div className={styles.execution_cell_title}>Call 1</div>
                
                <Cell size={2} className={styles.green_cell} text="A"></Cell>
                <HandlerVerticalLine></HandlerVerticalLine>
                <Cell size={6}></Cell>
                <Cell size={2} className={styles.blue_cell} text="C"></Cell>

                <Cell size={20}></Cell>
            </div>

            <div className={`bottom-border ${styles.thread_line}`}>
                <div className={styles.execution_cell_title}>Call 2</div>

                <Cell size={2}></Cell>
                <Cell size={2} className={styles.green_cell} text="A"></Cell>
                <HandlerVerticalLine></HandlerVerticalLine>
                <Cell size={6}></Cell>
                <Cell size={2} className={styles.blue_cell} text="C"></Cell>

                <Cell size={18}></Cell>
            </div>

            <div className={`${styles.thread_line}`}>
                <div className={styles.execution_cell_title}>Call 3</div>

                <Cell size={2}></Cell>
                <Cell size={2}></Cell>
                <Cell size={2} className={styles.green_cell} text="A"></Cell>
                <HandlerVerticalLine></HandlerVerticalLine>
                <Cell size={6}></Cell>
                <Cell size={2} className={styles.blue_cell} text="C"></Cell>

                <Cell size={16}></Cell>    
            </div>

            <div className={`bottom-border ${styles.thread_line} ${styles.handler_title}`}>
                <div className={styles.execution_cell_title}>Handler</div>

                <Cell size={2}></Cell>
                <Cell size={6} className={styles.red_cell} text="B"></Cell>
                <HandlerVerticalLine reverse={true}></HandlerVerticalLine>
                <Cell size={22}></Cell>
            </div>

            <div className={`bottom-border ${styles.thread_line}`}>
                <div className={styles.execution_cell_title}></div>
                <Cell size={4}></Cell>
                <Cell size={6} className={styles.red_cell} text="B"></Cell>
                <HandlerVerticalLine reverse={true}></HandlerVerticalLine>
                <Cell size={20}></Cell>
            </div>

            <div className={`bottom-border ${styles.thread_line}`}>
                <div className={styles.execution_cell_title}></div>
                <Cell size={6}></Cell>
                <Cell size={6} className={styles.red_cell} text="B"></Cell>
                <HandlerVerticalLine reverse={true}></HandlerVerticalLine>
                <Cell size={18}></Cell>
            </div>
        </div>),

        new LocaleContentAny({
            en: (<p>Using asynchronous calls, the thread forwards the waiting time of operation B to a handler and starts executing the next call imediatelly. When the handler receives the result, the process is called to assign an available thread to handle the response.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>So the 3 calls that previously took 30 seconds now are executed in 16 seconds, without requiring the process to create new threads or changing the hardware capabilities.</p>),
            pt: (<p></p>)
        }),
    ]
});