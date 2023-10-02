import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import ExternalLink from "../../components/external.link";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";

export const ScalabilityTips20231009 = new Article({
    code: "231009",
    date: new ArticleDate(2023, 10, 9),
    
    title: new LocaleContentText({
        en: "[C#] Scalability tips",
        pt: "[C#] Dicas de escalabilidade"
    }),

    description: new LocaleContentText({
        en: "Systems with bad scalability may hinder the business growth. Here are a few tips to help systems to scale better.",
        pt: ""
    }),

    slug: new LocaleContentText({
        en: "scalability-tips",
        pt: "dicas-escalabilidade"
    }),

    tags: [ArticleTag.concept, ArticleTag.explanation, ArticleTag.architecture],

    getContent: () => [
        new LocaleContentAny({
            en: (<p>In computing, <ExternalLink href="https://en.wikipedia.org/wiki/Scalability">scalability</ExternalLink> is the capability of a system to handle a increasing workload gracefully. In other words, as the user base, amount of requests or amount of data grows, how well does the software handle the workload and how easy and cheap it is to increase its throughput.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>The concept relates to performance, but the definition can differ. Performance usually refers to how much time an operation takes to complete, while scalability is more focused on how many operations the system can handle concurrently without breaking. Note that some test scenarios will include scalability as one indicator of overall performance.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Systems with bad scalability have a hard cap on how much workload it can handle. This can hinder the growth of the company, because increasing the amount of users or data may break the software.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Below are a few insights on how to increate and maintain the scalability of a system:</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Enable horizontal scaling whenever possible</h3></p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Consider using databases that automatically scale over those that do not, such as MongoDB over SQL. Non-scalable databases usually can only be scaled vertically, which becomes exponentially more expensive. Splitting the database per tenant or into different microsservices can also be valid strategies.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Consider deploying your web application under mechanisms that allows additional instances easily, with load balancing, such as deploying over kubernetes or a corresponding cloud service. When the demand becomes too high, it becomes easier to add more instances instead of over-optimizing code.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Use your resources wisely</h3></p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>If there is any resource that cannot scale horizontally, keep its workload to a minimum. Direct consumption of that resource will eventually become a bottleneck.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Do not overuse memory or processing power, specially on non-scalable resources. Consuming more resources to squeeze a few milliseconds of performance can hurt scalability in the long run, and should be done with caution.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Optimize your external resources. For example, when using a SQL database, make proper use of indexes, avoid huge data read/write operations or load too much data in memory through temporary tables.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Use asynchronous programming to make better use of threads, for example by using the C# <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios">async and await</ExternalLink>.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Stream big collections instead of loading all in memory, for example by using the C# <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/yield">yield</ExternalLink>.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Use infrastructure in your favor</h3></p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Cache data or results that changes infrequently. They are relatively easy to manage, and cached results not only avoid consuming resources from the infrastructure to generate the same data everytime, but also speed up processing time. This is specially useful when caching results of non-scalable resources.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Apply request coalescing in non-mutable and frequently called functions. Request coalescing means that different function calls that predictably return the same result do not need to be executed twice - attach the second request to the first and return the same data to both. I created a thread-safe C# library that allows both request coallescing and in-memory cache, called <ExternalLink href="https://www.nuget.org/packages/TimedDictionary">TimedDictionary</ExternalLink>.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Execute only what is necessary, and avoid using generic functions that generate and return much more data than is required to fulfill the request. Try to keep a balance between practicallity and optimization.</p>),
            pt: (<p></p>)
        })
    ]
});