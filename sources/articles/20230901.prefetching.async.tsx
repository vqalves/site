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
            en: (<p>Through the use of <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=net-7.0">Tasks</ExternalLink>, it is fairly simple to start a prefetch an execute codes before reaching a point where the data is required.</p>),
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

// Code that doesn't require the result
ExecuteCodeWithoutHtml();

// Load the result
var html = await taskHtml;`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>Once a task is completed, the result is kept within the object and reused any time the task is awaited. This can simplify data flow when multiple methods require the same information.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`var taskFetchHtml = GetHtmlAsync("https://domain.com");

// Await until the task is completed for the first time
var hasDiv = (await taskFetchHtml).Contains("<div")

// Task was already completed, so the result is immediate
var length = (await taskFetchHtml).Length;`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>When there are multiple asynchronous calls producing the same result type, all tasks can be started upfront and consolidated with <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.whenany?view=net-7.0">WhenAny()</ExternalLink> as they are completed.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`var tasks = new[]
{
    GetHtmlAsync("https://site1.com"),
    GetHtmlAsync("https://site2.com"),
    GetHtmlAsync("https://site3.com"),
}.ToList();

List<string> results = new List<string>();

while(tasks.Any())
{
    var completedTask = await Task.WhenAny(tasks);
    tasks.Remove(completedTask);

    var result = await completedTask;
    results.Add(result);
}`}></CodeBlock>), 
    ]
});