import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import ExternalLink from "../../components/external.link";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";

export const PrefetchingAsync20230912 = new Article({
    code: "230912",
    date: new ArticleDate(2023, 9, 12),
    
    title: new LocaleContentText({
        en: "[C#] Prefetching async methods for performance",
        pt: "[C#] Prefetching de métodos assíncronos"
    }),

    description: new LocaleContentText({
        en: "Starting I/O operations before needed can help speed up the runtime",
        pt: "Iniciar operações com I/O o quanto antes pode agilizar o tempo de execução"
    }),

    slug: new LocaleContentText({
        en: "prefetching-async",
        pt: "prefetching-async"
    }),

    tags: [ArticleTag.concept, ArticleTag.csharp, ArticleTag.codeSnippet, ArticleTag.explanation],

    getContent: () => [
        new LocaleContentAny({
            en: (<p><ExternalLink href="https://en.wikipedia.org/wiki/Prefetching">Prefetching</ExternalLink> is a technique that starts loading data before it is needed, reducing total runtime at the risk of loading unnecessary data.</p>),
            pt: (<p><ExternalLink href="https://pt.wikipedia.org/wiki/Busca_antecipada_de_instru%C3%A7%C3%B5es">Prefetching</ExternalLink> (ou pré-carregamento) é uma técnica que inicia o carregamento de dados antes deles serem necessários, diminuindo o tempo total de execução, mas com o risco de carregar dados desnecessariamente.</p>)
        }),

        new LocaleContentAny({
            en: (<p>In coding, since there is more knowledge over what is needed to execute a method, it is easier to control when certain data should be loaded or not.</p>),
            pt: (<p>Na programação, através do código, o desenvolvedor pode identificar quais dados serão necessários em quais situações, reduzindo ou eliminando o risco de carregamentos desnecessários.</p>)
        }),

        new LocaleContentAny({
            en: (<p>On C#, using <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios">async</ExternalLink> and <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=net-7.0">tasks</ExternalLink> allow fetching data without interrupting the flow of code. This way, by prefetching data, the algorithm can dilute the downtime of I/O operations by working on other operations while waiting for the I/O result.</p>),
            pt: (<p>No C#, usar <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/asynchronous-programming/async-scenarios">async</ExternalLink> e <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.task?view=net-7.0">tasks</ExternalLink> permite iniciar o carregamento de dados sem interromper o fluxo do código. Isso ajuda a diluir o tempo que o algoritmo ficará esperando pelo resultado de operações de I/O, pois ele estará trabalhando em outros comandos enquanto espera o resultado.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Below are some examples of prefetching with asynchony:</p>),
            pt: (<p>Exemplos de pré-carregamento com assincronia abaixo:</p>)
        }),

        new LocaleContentAny({
            en: (<h3>Prefetching one result</h3>),
            pt: (<h3>Pré-carregando um resultado</h3>)
        }),

        new LocaleContentAny({
            en: (<p>Calling an async method will immediately start its execution without interrupting the code flow. By holding the reference of an async task, it is possible to <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/await">await</ExternalLink> the data only when it is actually needed.</p>),
            pt: (<p>Executar um método assíncrono imediatamente inicia a execução do método sem interromper o fluxo de código. Ao guardar referência à task retornada, é possível utilizar <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/language-reference/operators/await">await</ExternalLink> para aguardar o carregamento apenas quando ele será necessário.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public static async Task<string> GetHtmlAsync(string uri)
{
    using (var client = new HttpClient())
        return await client.GetStringAsync(uri);
}`}></CodeBlock>),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`// Start prefetching
var taskHtml = GetHtmlAsync("https://domain.com");
CodeWithoutHtml();

// Await and consume the result
var html = await taskHtml
CodeWithHtml(html);`}></CodeBlock>),

        new LocaleContentAny({
            en: (<h3>Prefetching multiple results</h3>),
            pt: (<h3>Executando múltiplos pré-carregamentos</h3>)
        }),

        new LocaleContentAny({
            en: (<p>Calling async methods in sequence without awaiting them is enough to fetch their data in parallel, without interrupting code flow, until an await is executed.</p>),
            pt: (<p>Invocar métodos assíncronos sem await em sequência é o suficiente para buscar os dados múltiplos dados em paralelo, sem gerar interrupções de código. O fluxo só será interrompido na presença de um await.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`// Start pre-fetching
var taskHtml1 = GetHtmlAsync("https://domain1.com");
var taskHtml2 = GetHtmlAsync("https://domain2.com");
var taskHtml3 = GetHtmlAsync("https://domain3.com");

// Await results
var html1 = await taskHtml1;
var html2 = await taskHtml2;
var html3 = await taskHtml3;`}></CodeBlock>),

        new LocaleContentAny({
            en: (<h3>Chaining prefetching</h3>),
            pt: (<h3>Encadeamento de pré-carregamentos</h3>)
        }),

        new LocaleContentAny({
            en: (<p>There are situations where an async method requires the result of another async method, creating a chain of fetches.</p>),
            pt: (<p>Existem situações em que um método assíncrono precisa de um dado carregado por outro método assíncrono, criando uma corrente de carregamentos.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Tasks can be chained through the use of <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.continuewith?view=net-7.0">ContinueWith()</ExternalLink>, which invokes a method that starts executing as soon as a task is completed, and <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskextensions.unwrap?view=net-7.0">Unwrap()</ExternalLink>, which will expose the chained task being executed inside ContinueWith. Note that, since ContinueWith will only start when the task is completed, calling <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task-1.result?view=net-7.0">.Result</ExternalLink> property will not block the thread.</p>),
            pt: (<p>Tasks podem ser encadeadas usando <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.task.continuewith?view=net-7.0">ContinueWith()</ExternalLink>, que invocará um método qualquer assim que a task for concluída, e <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.taskextensions.unwrap?view=net-7.0">Unwrap()</ExternalLink>, que expõe a task interna sendo executada no ContinueWith. Considerando que o ContinueWith só é executado depois que a task foi concluída, não há bloqueio de thread quando é chamado diretamente o <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.task-1.result?view=net-7.0">.Result</ExternalLink> da task.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`// Start pre-fetching
var taskUrl = RetrieveUrlAsync();

var taskStatusCode = taskUrl.ContinueWith(async (task) => 
{
    return await GetStatusCodeAsync(task.Result);
}).Unwrap();

var taskFavicon = taskUrl.ContinueWith(async (task) => 
{
    return await HasFaviconAsync(task.Result);
}).Unwrap();

// Await results
var statusCode = await taskStatusCode;
var hasFavicon = await taskFavicon;`}></CodeBlock>),

        new LocaleContentAny({
            en: (<h3>Prefetching with IAsyncEnumerable</h3>),
            pt: (<h3>Pré-carregamento com IAsyncEnumerable</h3>)
        }),

        new LocaleContentAny({
            en: (<p>When using <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.iasyncenumerable-1?view=net-7.0">IAsyncEnumerable</ExternalLink>, it is also possible to prefetch the next result by manipulating the <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.collections.ienumerator?view=net-7.0">IEnumerator</ExternalLink>, as demonstrated by the following <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods">extension method</ExternalLink>:</p>),
            pt: (<p>Quando utilizar <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.collections.generic.iasyncenumerable-1?view=net-7.0">IAsyncEnumerable</ExternalLink>, também é possível pré-carregar o próximo resultado ao controlar o <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.collections.ienumerator?view=net-7.0">IEnumerator</ExternalLink>, como demonstrado pelo <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/programming-guide/classes-and-structs/extension-methods">extension method</ExternalLink> abaixo:</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public static async IAsyncEnumerable<T> WithPrefetch<T>(this IAsyncEnumerable<T> enumerable)
{
    await using(var enumerator = enumerable.GetAsyncEnumerator())
    {
        ValueTask<bool> hasNextTask = enumerator.MoveNextAsync();

        while(await hasNextTask)
        {
            T data = enumerator.Current;
            hasNextTask = enumerator.MoveNextAsync();
            yield return data;
        }
    }
}`}></CodeBlock>),

LocaleContentAny.all(<CodeBlock
    language={CodeBlockLanguage.csharp}
    code={`// WithPrefetch() example
await foreach(var item in EnumerateAsync().WithPrefetch())
{
    Process(item);
}`}></CodeBlock>),

    ]
});