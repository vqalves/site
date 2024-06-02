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
            en: (<p>When using <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.iasyncenumerable-1?view=net-7.0">IAsyncEnumerable</ExternalLink>, it is also possible to prefetch the next result by manipulating the <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.collections.ienumerator?view=net-7.0">IEnumerator</ExternalLink>, as demonstrated by the following <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods">extension method</ExternalLink>. Benchmarks generated by <ExternalLink href="https://www.nuget.org/packages/BenchmarkDotNet">BenchmarkDotNet</ExternalLink>.</p>),
            pt: (<p>Quando utilizar <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.collections.generic.iasyncenumerable-1?view=net-7.0">IAsyncEnumerable</ExternalLink>, também é possível pré-carregar o próximo resultado ao controlar o <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.collections.ienumerator?view=net-7.0">IEnumerator</ExternalLink>, como demonstrado pelo <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/programming-guide/classes-and-structs/extension-methods">extension method</ExternalLink> abaixo. Os benchmarks foram gerados pelo <ExternalLink href="https://www.nuget.org/packages/BenchmarkDotNet">BenchmarkDotNet</ExternalLink>.</p>)
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
    code={`// Prefetching 1 item
await foreach(var item in EnumerateAsync().WithPrefetch())
    Process(item);`}></CodeBlock>),

    new LocaleContentAny({
        en: (<p>There is a significant performance improvement prefetching data when fetch time and processing time are close. Attempting to use prefetch on data already in memory overloads the system with no gains.</p>),
        pt: (<p>Há um ganho de performance significante em utilizar pré-carregamento quando o tempo de carregamento e o tempo de processamento são próximos. Pré-carregamento apresenta uma sobrecarga desnecessária para dados que já estão em memória.</p>)
    }),

    LocaleContentAny.all(
        <table>
            <thead>
                <tr><td>Fetch</td><td>Process</td><td>Execution time (no-prefetch)</td><td>Execution time (prefetch)</td><td>Improvement</td></tr>
            </thead>
            <tbody>
                <tr><td>0 ms</td><td>0 ms</td><td>0.0006 ms</td><td>0.0013 ms</td><td>-116%</td></tr>
                <tr><td>20 ms</td><td>20 ms</td><td>964 ms</td><td>497 ms</td><td>93%</td></tr>
                <tr><td>100 ms</td><td>20 ms</td><td>2117 ms</td><td>1675 ms</td><td>26%</td></tr>
                <tr><td>20 ms</td><td>100 ms</td><td>2118 ms</td><td>1674 ms</td><td>26%</td></tr>
                <tr><td>200 ms</td><td>20 ms</td><td>3540 ms</td><td>3099 ms</td><td>14%</td></tr>
                <tr><td>20 ms</td><td>200 ms</td><td>3572 ms</td><td>3093 ms</td><td>15%</td></tr>
            </tbody>
        </table>
    ),

    new LocaleContentAny({
        en: (<p>There are no benefits prefeching more items when only a single item is processed at a time. Below is a code to prefetch more a single item:</p>),
        pt: (<p>Não há benefícios em pré-carregar mais que um item por vez, se for realizar o processamento de um item por vez. Código para pré-carregar mais de um item:</p>)
    }),
    
    LocaleContentAny.all(<CodeBlock
        language={CodeBlockLanguage.csharp}
        code={`public static IAsyncEnumerable<T> WithPrefetch<T>(this IAsyncEnumerable<T> enumerable, int prefetchDepth)
{
    while(prefetchDepth > 0)
    { 
        enumerable = enumerable.WithPrefetch();
        prefetchDepth--;
    }

    return enumerable;
}`}></CodeBlock>),

    LocaleContentAny.all(<CodeBlock
        language={CodeBlockLanguage.csharp}
        code={`// Prefetching 10 items
await foreach(var item in EnumerateAsync().WithPrefetch(10))
    Process(item);`}></CodeBlock>),
    
        new LocaleContentAny({
            en: (<p>Benchmarks demonstrate that prefetching more than one data causes a linear increase on processing time.</p>),
            pt: (<p>Benchmarks constatam que pré-carregar múltiplos registros causa um aumento linear de tempo baseado na profundidade de pré-carregamento.</p>)
        }),

        new LocaleContentAny({
            en: (<p>The method used as a reference sums 100 numbers from an enumerator when data is loaded synchronously, asynchronously or asynchronously with prefetch. 1 ms = 1,000,000 ns</p>),
            pt: (<p>O método utilizado como referência soma 100 números de uma enumeração nos cenários em que ela é carregada de forma síncrona, assíncrona ou assíncrona com pré-carregamento. 1 ms = 1.000.000 ns</p>)
        }),

        LocaleContentAny.all(
            <table>
                <thead>
                    <tr><td>Method</td><td>Mean</td><td>Error</td><td>StdDev</td><td>Gen0</td><td>Allocated</td></tr>
                </thead>
                <tbody>
                    <tr><td>Sync</td><td>132.4 ns</td><td>0.53 ns</td><td>0.44 ns</td><td>-</td><td>-</td></tr>
                    <tr><td>AsyncWithoutPrefetch</td><td>5,062.2 ns</td><td>49.27 ns</td><td>46.09 ns</td><td>0.0381</td><td>168 B</td></tr>
                    <tr><td>AsyncWithPrefetch_01_Record</td><td>8,872.0 ns</td><td>175.48 ns</td><td>195.05 ns</td><td>0.0763</td><td>344 B</td></tr>
                    <tr><td>AsyncWithPrefetch_02_Records</td><td>15,175.8 ns</td><td>260.77 ns</td><td>243.93 ns</td><td>0.1221</td><td>520 B</td></tr>
                    <tr><td>AsyncWithPrefetch_04_Records</td><td>21,440.6 ns</td><td>143.50 ns</td><td>127.21 ns</td><td>0.1831</td><td>872 B</td></tr>
                    <tr><td>AsyncWithPrefetch_08_Records</td><td>37,753.9 ns</td><td>251.59 ns</td><td>196.43 ns</td><td>0.3662</td><td>1576 B</td></tr>
                    <tr><td>AsyncWithPrefetch_16_Records</td><td>78,780.6 ns</td><td>944.58 ns</td><td>837.35 ns</td><td>0.6104</td><td>2984 B</td></tr>
                    <tr><td>AsyncWithPrefetch_32_Records</td><td>159,310.1 ns</td><td>2,197.14 ns</td><td>2,055.21 ns</td><td>1.2207</td><td>5800 B</td></tr>
                </tbody>
            </table>
        ),

        new LocaleContentAny({
            en: (<p>Changing only processing time or fetching time without the other does not impact on the execution time of the function, regardless of the configured depth of prefetched data.</p>),
            pt: (<p>Alterações exclusivamente no tempo de processamento ou tempo de carregamento não afeta o tempo geral da execução da função, independente da profundidade de pré-carregamentos.</p>)
        }),

        LocaleContentAny.all(
            <table>
                <thead>
                    <tr><td>Method</td><td>Mean</td><td>Error</td><td>StdDev</td><td>Gen0</td><td>Allocated</td></tr>
                </thead>
                <tbody>
                    <tr><td>Fetch0ms_Process20ms_Prefetch0</td><td>468.0 ms</td><td>9.0 ms</td><td>7.5ms</td><td>-</td><td>16608 B</td></tr>
                    <tr><td>Fetch0ms_Process20ms_Prefetch1</td><td>466.0 ms</td><td>2.2 ms</td><td>2.0ms</td><td>-</td><td>16784 B</td></tr>
                    <tr><td>Fetch0ms_Process20ms_Prefetch2</td><td>470.8 ms</td><td>7.9 ms</td><td>7.0ms</td><td>-</td><td>10992 B</td></tr>
                    <tr><td>Fetch0ms_Process20ms_Prefetch10</td><td>465.8 ms</td><td>4.2 ms</td><td>3.3ms</td><td>-</td><td>18376 B</td></tr>
                    <tr><td>Fetch20ms_Process0ms_Prefetch0</td><td>469.9 ms</td><td>5.8 ms</td><td>5.4 ms</td><td>-</td><td>17072 B</td></tr>
                    <tr><td>Fetch20ms_Process0ms_Prefetch1</td><td>466.4 ms</td><td>3.2 ms</td><td>2.8 ms</td><td>-</td><td>17664 B</td></tr>
                    <tr><td>Fetch20ms_Process0ms_Prefetch2</td><td>466.3 ms</td><td>3.0 ms</td><td>2.5 ms</td><td>-</td><td>17976 B</td></tr>
                    <tr><td>Fetch20ms_Process0ms_Prefetch10</td><td>466.0 ms</td><td>2.6 ms</td><td>2.3 ms</td><td>-</td><td>20840 B</td></tr>
                </tbody>
            </table>
        ),

        new LocaleContentAny({
            en: (<p>Increasing the prefetching depth also does not improve performance even when processing time and fetching time favor parallelism.</p>),
            pt: (<p>Aumentar a profundidade de pré-carregamentos não apresenta melhoria na performance mesmo em situações aonde carregamento e processamento favorecem o paralelismo.</p>)
        }),

        LocaleContentAny.all(
            <table>
                <thead>
                    <tr><td>Method</td><td>Mean</td><td>Improvement to non-prefetch</td></tr>
                </thead>
                <tbody>
                    <tr><td>Fetch100ms_Process20ms_Prefetch0</td><td>2.117 s</td><td>N/A</td></tr>
                    <tr><td>Fetch100ms_Process20ms_Prefetch1</td><td>1.675 s</td><td>26.39%</td></tr>
                    <tr><td>Fetch100ms_Process20ms_Prefetch2</td><td>1.681 s</td><td>25.94%</td></tr>
                    <tr><td>Fetch100ms_Process20ms_Prefetch10</td><td>1.675 s</td><td>26.39%</td></tr>
                </tbody>
            </table>
        ),

        LocaleContentAny.all(
            <table>
                <thead>
                    <tr><td>Method</td><td>Mean</td><td>Improvement to non-prefetch</td></tr>
                </thead>
                <tbody>
                    <tr><td>Fetch200ms_Process20ms_Prefetch0</td><td>3.540 s</td><td>N/A</td></tr>
                    <tr><td>Fetch200ms_Process20ms_Prefetch1</td><td>3.099 s</td><td>14.23%</td></tr>
                    <tr><td>Fetch200ms_Process20ms_Prefetch2</td><td>3.096 s</td><td>15.35%</td></tr>
                    <tr><td>Fetch200ms_Process20ms_Prefetch10</td><td>3.099 s</td><td>14.23%</td></tr>
                </tbody>
            </table>
        ),

        LocaleContentAny.all(
            <table>
                <thead>
                    <tr><td>Method</td><td>Mean</td><td>Improvement to non-prefetch</td></tr>
                </thead>
                <tbody>
                    <tr><td>Fetch20ms_Process100ms_Prefetch0</td><td>2.118 s</td><td>N/A</td></tr>
                    <tr><td>Fetch20ms_Process100ms_Prefetch1</td><td>1.674 s</td><td>26.52%</td></tr>
                    <tr><td>Fetch20ms_Process100ms_Prefetch2</td><td>1.680 s</td><td>26.07%</td></tr>
                    <tr><td>Fetch20ms_Process100ms_Prefetch10</td><td>1.675 s</td><td>26.45%</td></tr>
                </tbody>
            </table>
        ),

        LocaleContentAny.all(
            <table>
                <thead>
                    <tr><td>Method</td><td>Mean</td><td>Improvement to non-prefetch</td></tr>
                </thead>
                <tbody>
                    <tr><td>Fetch20ms_Process200ms_Prefetch0</td><td>3.527 s</td><td>N/A</td></tr>
                    <tr><td>Fetch20ms_Process200ms_Prefetch1</td><td>3.093 s</td><td>14.03%</td></tr>
                    <tr><td>Fetch20ms_Process200ms_Prefetch2</td><td>3.096 s</td><td>13.92%</td></tr>
                    <tr><td>Fetch20ms_Process200ms_Prefetch10</td><td>3.091 s</td><td>14.11%</td></tr>
                </tbody>
            </table>
        ),
    ]
});