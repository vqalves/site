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
        en: "[C#] Async programming, I/O and scalability",
        pt: "[C#] Programação assíncrona, I/O e escalabilidade"
    }),

    description: new LocaleContentText({
        en: "Using async programming on I/O commands to improve scalability",
        pt: "Usando programação assíncrona em comandos de I/O para melhorar a escalabilidade"
    }),

    slug: new LocaleContentText({
        en: "csharp-async-programming-io-and-scalability",
        pt: "csharp-programacao-assincrona-io-e-escalabilidade"
    }),

    tags: [ArticleTag.concept, ArticleTag.csharp],

    getContent: () => [
        new LocaleContentAny({
            en: (<p>Asynchronous programming is a technique applied on a process so it's main <ExternalLink href="https://en.wikipedia.org/wiki/Thread_(computing)">threads</ExternalLink> do not execute long-running commands. Instead, those commands are assigned to external handlers to be executed in parallel, so the main threads become free to execute other commands.</p>),
            pt: (<p>Programação assíncrona é uma técnica de programação que faz com que as <ExternalLink href="https://pt.wikipedia.org/wiki/Thread_(computa%C3%A7%C3%A3o)">threads</ExternalLink> principais de um processo não executem comandos demorados. Esses comandos são enviadas para um handler separado para serem executados em paralelo, permitindo que as threads principais fiquem livres para executar outros comandos.</p>)
        }),

        new LocaleContentAny({
            en: (<p>It's often implemented with <ExternalLink href="https://en.wikipedia.org/wiki/Interrupt">interrupts</ExternalLink>, so a thread is freed when an asynchronous command starts, and a thread is requested when the asynchronous command ends. That way, the process can ensure the execution continues with the same context, such as variables values and resources.</p>),
            pt: (<p>Geralmente é usado em conjunto com <ExternalLink href="https://pt.wikipedia.org/wiki/Interrup%C3%A7%C3%A3o">interrupções</ExternalLink>, de forma que uma thread é liberada quando o comando assíncrono inicia, e uma thread é solicitada quando o comando assíncrono é concluído. Assim, o processo garante que a retomada da execução continue dentro do mesmo contexto, mantendo os mesmos recursos e valores de variáveis.</p>)
        }),

        new LocaleContentAny({
            en: (<p>It's a foundation for platforms like <ExternalLink href="https://nodejs.org/en/">NodeJS</ExternalLink>, that runs only a single main thread.</p>),
            pt: (<p>Esse conceito é uma das bases de plataformas como <ExternalLink href="https://nodejs.org/en/">NodeJS</ExternalLink>, que roda em cima de uma única thread principal.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Synchronous program</b></p>),
            pt: (<p><b>Programação síncrona</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Without asynchrony, a single thread could only handle multiple calls in sequence, as demonstrated below. Each call takes 10 seconds, so 3 calls require 30 seconds to be completed.</p>),
            pt: (<p>Sem assíncronia, uma thread que precisa executar múltiplos métodos só consegue executá-los em sequência, como demonstrado abaixo. Cada execução demora 10 segundos, então as 3 execuções no total demoram 30 segundos.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public Result Execute(string input)
{
    // Command A - CPU-only - 2 seconds
    var value = TransformInput(input);

    // Command B - I/O - 6 seconds
    var saveResult = SaveToDatabase(value);

    // Command C - CPU-only - 2 second
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
            en: (<p><b>I/O commands</b></p>),
            pt: (<p><b>Operações de I/O</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>The main functionality of the command "SaveToDatabase" is to communicate with an external resource, making it an I/O command. During I/O commands, the thread does nothing while waiting for a result, but is still flagged as busy.</p>),
            pt: (<p>A principal função do comando "SaveToDatabase" é apenas a comunicação com um recurso externo, tornando ele um comando de I/O. Em comandos de I/O, a thread não faz nada além de esperar por um resultado, e continua marcada como "ocupada".</p>)
        }),

        new LocaleContentAny({
            en: (<p>Some of the most common I/O commands are: connecting and sending commands to a database, reading/writing files on a hard disk, and communicating with external systems using through the network, such as third-party APIs.</p>),
            pt: (<p>Alguns dos comandos de I/O mais comuns são: conectar e enviar comandos para um banco de dados, ler ou escrever arquivos no disco rígido, e comunicar com serviços externos através da rede, por exemplo com APIs.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Asynchronous program</b></p>),
            pt: (<p><b>Programação assíncrona</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>On C#, some commands, including I/O commands, can be rewriten to be run asynchronously using the <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/">async/await library</ExternalLink>.</p>),
            pt: (<p>No C#, alguns comandos, incluindo comandos de I/O, podem ser reescritos para rodar de forma assíncrona, usando a <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/programming-guide/concepts/async/">biblioteca de async/await</ExternalLink></p>)
        }),

        new LocaleContentAny({
            en: (<p>When a thread finds an <u>await</u> keyword, the command will be forwarded to a handler, and the thread is freed to execute something else. The process will be notified when the command is completed, so it can assign a free thread to continue executing the method.</p>),
            pt: (<p>Quando a thread encontra um comando com <u>await</u>, o comando será enviado para um handler e a thread será liberada para executar outra coisa. O processo será notificado quando o comando for concluído, e ele poderá alocar uma thread desocupada para continuar a execução do método.</p>)
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
            en: (<p>As the I/O command is forwarded to a handler, the thread is free to immediatelly start executing the next call. So the 3 calls that previously took 30 seconds now are executed in 14 seconds, without requiring additional threads or upgrading the hardware.</p>),
            pt: (<p>Como o comando de I/O é encaminhado pro handler, a thread fica livre pra começar a executar a próxima chamada imediatamente. Assim, as 3 chamadas que levavam 30 segundos na programação síncrona agora levam apenas 14 segundos, sem necessidade de criação de novas threads ou melhoria de hardware.</p>)
        }),
    ]
});