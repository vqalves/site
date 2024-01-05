import Link from "next/link";
import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import ExternalLink from "../../components/external.link";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";
import { IOAsyncProgramming20221231 } from "./20221231.io.async.programming";
import { YieldIEnumerable20230826 } from "./20230826.yield.ienumerable";
import GithubGist from "../../components/github.gist";

export const RequestCoalescing20231029 = new Article({
    code: "231029",
    date: new ArticleDate(2023, 10, 29),
    
    title: new LocaleContentText({
        en: "[Concept] Request coalescing",
        pt: ""
    }),

    description: new LocaleContentText({
        en: "Request coalescing protects against sudden spikes and optimizes underlying resources consumption.",
        pt: ""
    }),

    slug: new LocaleContentText({
        en: "request-coalescing",
        pt: "coalescencia-de-requisicao"
    }),

    tags: [ArticleTag.concept, ArticleTag.codeSnippet],

    getContent: () => [
        new LocaleContentAny({
            en: (<p>Request coalescing is a technique in which, when there are multiple requests for the same data in a short amount of time, only the first request starts a process for data retrieval while the subsequent requests subscribe to the created process, so the same piece of data is returned to every request subscribed, avoiding generating the same data multiple times.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>This technique can be implemented in sinergy with a caching system, but they are different by nature. <ExternalLink href="https://en.wikipedia.org/wiki/Cache_(computing)">Caching</ExternalLink> is concerned about the reuse of generated data for a determined time, while request coalescing is concerned about avoiding redundant processing.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>The most common place to implement request coalescing is on the API server, for example using <ExternalLink href="https://en.wikipedia.org/wiki/Reverse_proxy">reverse proxy</ExternalLink> services that funnel and distributes requests, such as <ExternalLink href="https://www.nginx.com/">nginx</ExternalLink> and <ExternalLink href="https://varnish-cache.org/">Varnish</ExternalLink>. Its also not uncommon to implement it inside the API application, for example using <ExternalLink href="https://go.dev/">golang</ExternalLink> <ExternalLink href="https://go.dev/tour/concurrency/2">channel</ExternalLink>.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>However, while the technique traditionally is applied for web requests, the same concept can be inside the layers of a software, using fairly simple implementations. Below are two examples of implementation, one for functions with parameters and another parameterless.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<GithubGist hash="651c83ee39378ca3494859079f220a57" />),
            pt: (<GithubGist hash="651c83ee39378ca3494859079f220a57" />)
        }),

        new LocaleContentAny({
            en: (<p>Those simple classes can be used as singletons by consumers, either by creating a static instance or dependency injection. This ensures the same task instance will be used for all method calls.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public partial class DateTimeRepository
{
    // Should be a singleton, either static or by dependency injection
    private static readonly RequestCoalescing<DateTime> GetCurrentCoalesce = new RequestCoalescing<DateTime>();

    public async Task<DateTime> CurrentAsync()
    {
        return await GetCurrentCoalesce.CoalesceAsync(async () => 
        {
            await Task.Delay(1_000);
            return DateTime.Now;
        });
    }
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>For the version with parameters, the implementation uses a dictionary where the key contains all the parameter values. This way, there may be multiple tasks coexisting for different parameter values.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/structs">Structs</ExternalLink> are <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.valuetype?view=net-7.0">value-types</ExternalLink> and their equality is done by checking the equality of all its internal properties. By declaring a struct with primite properties representing the parameters, it is possible to use of the dictionary lookup methods easily.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public partial class DateTimeRepository
{
    // Should be a singleton, either static or by dependency injection
    private static readonly RequestCoalescing<DateTime, Parameter> GetByParameterCoalesce = new RequestCoalescing<DateTime, Parameter>();

    public async Task<DateTime> GetByParameterAsync(string timezone)
    {
        var parameters = new Parameter { Timezone = timezone };

        return await GetByParameterCoalesce.CoalesceAsync(parameters, async() => 
        {
            await Task.Delay(1_000);
            
            var timezone = TimeZoneInfo.FindSystemTimeZoneById(parameters.Timezone);
            var result = TimeZoneInfo.ConvertTime(DateTime.Now, timezone);
            return result;
        });
    }

    public struct Parameter
    {
        public string Timezone { get; set; }
    }
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>This way, the use of coalescing becomes transparent to the caller, as demonstrated by the multi-thread simulation below.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`var repository = new DateTimeRepository();

await Parallel.ForEachAsync
(
    Enumerable.Range(1, 1000), 
    new ParallelOptions { MaxDegreeOfParallelism = 200 }, 
    async (item, c) => 
    {
        var current = await repository.CurrentAsync();
        Console.WriteLine(current);

        var germany = await repository.GetByParameterAsync("Europe/Berlin");
        Console.WriteLine(germany);
    }
);`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>For observability purposes, below is another implementation, for an observable coalescer that invokes a callback everytime a task is completed, passing the amount of coalesced calls for that particular task.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public class ObservableCoalescing<Value>
{
    private readonly object Locker = new object();
    private int ObserverCount = 0;
    private Action<int>? OnCompleted;

    public ObservableCoalescing(Action<int>? onCompleted = null)
    {
        OnCompleted = onCompleted;
    }

    private Task<Value>? CurrentValue;
    public Task<Value> CoalesceAsync(Func<Task<Value>> execute)
    {
        lock(Locker)
        {
            var value = CurrentValue;

            if(value == null)
            {
                value = execute();
                CurrentValue = value;

                CurrentValue.ContinueWith(x => 
                {
                    lock(Locker)
                    {
                        OnCompleted?.Invoke(ObserverCount);
                        CurrentValue = null;
                        ObserverCount = 0;
                    }
                });

            }

            ObserverCount++;
            return value;
        }            
    }
}`}></CodeBlock>),
    ]
});