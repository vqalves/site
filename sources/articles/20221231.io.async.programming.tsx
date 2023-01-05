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
            en: (<p>Asynchronous programming is a technique applied on a process so it's main <ExternalLink href="https://en.wikipedia.org/wiki/Thread_(computing)">threads</ExternalLink> do not execute long-running operations. Instead, those operations are assigned to external handlers to be executed in parallel, so the main threads become free to execute other operations.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>It's often implemented with <ExternalLink href="https://en.wikipedia.org/wiki/Interrupt">interrupts</ExternalLink>, so a thread is freed when an asynchronous operation starts and a thread is requested when the asynchronous operation ends. That way, the process can ensure the execution continues with the same context, such as variables values and resources.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>It's a foundation for platforms like <ExternalLink href="https://nodejs.org/en/">NodeJS</ExternalLink>, that runs only a single main thread.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Synchronous program</b></p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Without asynchrony, a single thread could only handle multiple calls in sequence, as demonstrated below. Each call takes 10 seconds, so 3 calls require 30 seconds to be completed.</p>),
            pt: (<p></p>)
        }),

        

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public Result Execute(string input)
{
    // Operation A - CPU-only - 2 seconds
    var value = TransformInput(input);

    // Operation B - I/O - 6 seconds
    var saveResult = SaveToDatabase(value);

    // Operation C - CPU-only - 2 second
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
            en: (<p><b>I/O operations</b></p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Operation B only communicates with an external resource and do not require CPU, making it an I/O operation. During I/O operations, the thread only waits for a result, but is still flagged as busy.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Some of the most common I/O operations are connecting and sending commands to a database, reading/writing files on a hard disk, and communicating with external systems using through the network, such as third-party APIs.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Asynchronous program</b></p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>On C#, some operations, including I/O operations, can be rewriten to be run asynchronously using the <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/">async/await library</ExternalLink>.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>When a thread finds an <u>await</u> keyword, the operation will be forwarded to a handler, and the thread is freed to execute something else. The process will be notified when the operation is completed, so it can assign a free thread to continue executing the method.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public async Task<Result> ExecuteAsync(string input)
{
    // Operation A - CPU-only - 2 seconds
    var value = TransformInput(input);

    // Operation B - I/O - 6 seconds
    var saveResult = await SaveToDatabaseAsync(value);

    // Operation C - CPU-only - 2 second
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
            en: (<p>With asynchrony, the I/O operation is forwarded to a handler, and the freed thread immediatelly starts executing the next call. So the 3 calls that previously took 30 seconds now are executed in 14 seconds, without requiring additional threads or upgrading the hardware.</p>),
            pt: (<p></p>)
        }),
    ]
});