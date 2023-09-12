import Link from "next/link";
import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import ExternalLink from "../../components/external.link";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";
import { IOAsyncProgramming20221231 } from "./20221231.io.async.programming";

/*
new LocaleContentAny({
    en: (<p><b>Próximo tópico: Parallel Select</b></p>),
    pt: (<p><b>Próximo tópico: Parallel Select</b></p>)
}),

new LocaleContentAny({
    en: (<p><b>Próximo tópico: Frontloading async</b></p>),
    pt: (<p><b>Próximo tópico: Frontloading async</b></p>)
}),
*/

export const PrefetchingAsync20230901 = new Article({
    code: "230901",
    date: new ArticleDate(2023, 9, 1),
    
    title: new LocaleContentText({
        en: "[C#] Prefetching async methods for performance",
        pt: ""
    }),

    description: new LocaleContentText({
        en: "Starting I/O operations before needed can help speed up the runtime",
        pt: ""
    }),

    slug: new LocaleContentText({
        en: "prefetching-async",
        pt: "prefetching-async"
    }),

    tags: [ArticleTag.concept, ArticleTag.csharp, ArticleTag.codeSnippet, ArticleTag.explanation],

    getContent: () => [
        new LocaleContentAny({
            en: (<p><ExternalLink href="https://en.wikipedia.org/wiki/Prefetching">Prefetching</ExternalLink> is a technique that starts loading data before it is needed, reducing total runtime at the risk of loading unnecessary data.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>In coding, since there is more knowledge over what is needed to execute a method, it is easier to control when certain data should be loaded or not.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>On C#, using <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios">asynchrony</ExternalLink> and <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=net-7.0">Task</ExternalLink> allows fetching data without interrupting the flow of code. This way, by prefetching data, the algorithm can dilute the downtime of I/O operations by working on other operations while waiting for the I/O result.</p>),
            pt: (<p></p>)
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
            en: (<p>Multiple prefetches can be started in sequence.</p>),
            pt: (<p></p>)
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
            en: (<p>Tasks can also be chained through the use of <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.continuewith?view=net-7.0">ContinueWith()</ExternalLink>, which invokes a method that starts executing as soon as a task is completed, and <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.taskextensions.unwrap?view=net-7.0">Unwrap()</ExternalLink>, which will expose the chained task being executed inside ContinueWith. Note that, since ContinueWith will only start when the task is completed, calling <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task-1.result?view=net-7.0">.Result</ExternalLink> property will not block the thread.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`// Start pre-fetching
var taskUrl = RetrieveUrlAsync();

var taskStatusCode = taskUrl.ContinueWith(async (task) => 
{
    return await GetStatusCodeAsync(task.Result);
}).Unwrap();

var taskFavicon = taskUrl.ContinueWith(task => 
{
    return HasFaviconAsync(task.Result);
}).Unwrap();

// Await results
var statusCode = await taskStatusCode;
var hasFavIcon = await taskFavicon;`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>When using <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.iasyncenumerable-1?view=net-7.0">IAsyncEnumerable</ExternalLink>, it is also possible to prefetch the next result by manipulating the <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.collections.ienumerator?view=net-7.0">IEnumerable</ExternalLink>, as demonstrated by the following <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods">extension method</ExternalLink>:</p>),
            pt: (<p></p>)
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