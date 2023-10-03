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

export const ScalabilityTips20231009 = new Article({
    code: "231009",
    date: new ArticleDate(2023, 10, 9),
    
    title: new LocaleContentText({
        en: "[C#] Scalability tips",
        pt: "[C#] Dicas de escalabilidade"
    }),

    description: new LocaleContentText({
        en: "Systems with bad scalability may hinder the business growth. Here are a few tips to help systems to scale better.",
        pt: "Sistemas com baixa escalabilidade podem travar o crescimento da empresa. Veja algumas dicas que ajudará sistemas a escalar mais"
    }),

    slug: new LocaleContentText({
        en: "scalability-tips",
        pt: "dicas-escalabilidade"
    }),

    tags: [ArticleTag.concept, ArticleTag.explanation, ArticleTag.architecture],

    getContent: () => [
        new LocaleContentAny({
            en: (<p>In computing, <ExternalLink href="https://en.wikipedia.org/wiki/Scalability">scalability</ExternalLink> is the capability of a system to handle an increasing workload gracefully. In other words, how well the system behaves when there are more users, more requests or more data, and how easy and cheap it is to increase the system throughput.</p>),
            pt: (<p>Em computação, <ExternalLink href="https://pt.wikipedia.org/wiki/Escalabilidade">escalabilidade</ExternalLink> é a capacidade de um sistema de lidar com cargas e solicitações crescentes. Em outras palavras, o quanto um sistema aguenta quando precisa funcionar com um grande volume de usuários, requisições ou dados, e o quão simples e barato é aumentar essa capacidade.</p>)
        }),

        new LocaleContentAny({
            en: (<p>The concept relates to performance, but the definition can differ. Performance usually refers to how much time an operation takes to complete, while scalability is more focused on how many operations the system can handle concurrently without breaking. Note that some test scenarios will include scalability as one indicator of overall performance.</p>),
            pt: (<p>O conceito está relacionado com performance, mas as definições podem ser diferentes. Performance costuma se referir a quanto tempo uma operação leva, enquanto escalabilidade foca mais em quantas operações simultâneas o sistema consegue suportar sem quebrar. Note que em alguns cenários de testes, escalabilidade é considerado um dos indicadores de performance.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Systems with bad scalability have an established limit of how much workload it can handle. This can hinder the growth of the company, because increasing the amount of users or data may break the software.</p>),
            pt: (<p>Sistemas com escalabilidade ruim tem um limite estabelecido de quanto processamento ele consegue suportar. Isso pode limitar o crescimento das empresas, pois o aumento de usuários ou dados pode acabar quebrando o software.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Below are a few insights on how to increase and maintain the scalability of a system:</p>),
            pt: (<p>Abaixo está listado alguns insights sobre como pode ser possível aumentar e manter a escalabilidade de sistemas:</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Enable horizontal scaling whenever possible</h3></p>),
            pt: (<p><h3>Use ferramentas com escalabilidade horizontal</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>Consider using databases that automatically scale over those that do not, such as MongoDB over SQL. Non-scalable databases usually can only be scaled vertically, which becomes exponentially more expensive. Splitting the database per tenant or into different microsservices can also be valid strategies.</p>),
            pt: (<p>Considere usar bancos de dados que possuem escalabilidade nativa, como MongoDB, ao invés de bancos como SQL. Bancos não-escaláveis normalmente só aumentam a capacidade verticalmente, aonde o custo aumenta exponencialmente. Dispersar os bancos de dados entre clientes diferentes ou diferentes microsserviços podem ser estratégias válidas.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Consider deploying your web application under mechanisms that allows additional instances easily, with load balancing, such as deploying over kubernetes or a corresponding cloud service. When the demand becomes too high, it becomes easier to add more instances instead of over-optimizing code.</p>),
            pt: (<p>Pense na possibilidade de publicar aplicações web com mecanismos que permita adicionar instâncias com load balancing, como publicar em kubernetes ou outro serviço cloud equivalente. Quando a demanda do sistema aumenta muito, é mais fácil criar mais instâncias do que super-otimizar o código.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Use your resources wisely</h3></p>),
            pt: (<p><h3>Use recursos com sabedoria</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>If there is any resource that cannot scale horizontally, keep its workload to a minimum. Direct consumption of that resource will eventually become a bottleneck.</p>),
            pt: (<p>Se utilizar algum recurso que não pode ser escalado horizontalmente, mantenha seu consumo no mínimo. Consumir esse tipo de recurso diretamente eventualmente fará ele se tornar um gargalo.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Do not overuse memory or processing power, specially on non-scalable resources. Trying to improve performance by consuming more memory or processing power can hurt scalability in the long run, and should be done with caution.</p>),
            pt: (<p>Não abuse do uso de memória ou processador, especialmente em recursos não escaláveis. Tentar aumentar a performance consumindo mais memória ou processador pode prejudicar a escalabilidade a longo prazo, e deve ser feito com cautela.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Optimize your external resources. For example, when using a SQL database, make proper use of indexes, avoid huge data read/write operations or load too much data in memory through temporary tables.</p>),
            pt: (<p>Otimize as ferramentas externas. Por exemplo, se usar um banco de dados SQL, crie e use índices apropriadamente, evite operações que leiam ou escrevam muitos dados, ou evite sobrecarregar a memória quando trabalhar com tabelas temporárias.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Use asynchronous programming to make better use of threads, for example by using the C# <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios">async and await</ExternalLink>. <Link href={IOAsyncProgramming20221231.getRoute()}>This link leads to an article about asynchrony.</Link></p>),
            pt: (<p>Faça uso otimizado das threads através de programação assíncrona, por exemplo usando <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/asynchronous-programming/async-scenarios">async e await</ExternalLink> do C#. <Link href={IOAsyncProgramming20221231.getRoute()}>Este link leva a um artigo escrito sobre assincronia.</Link></p>)
        }),

        new LocaleContentAny({
            en: (<p>Stream big collections instead of loading all in memory, for example by using the C# <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/yield">yield</ExternalLink>. <Link href={YieldIEnumerable20230826.getRoute()}>This link leads to an article about yielding and IEnumerable.</Link></p>),
            pt: (<p>Quando trabalhar com grandes coleções, opte por utilizar estratégias de streaming ao invés de carregar tudo em memória, por exemplo usando o <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/language-reference/statements/yield">yield</ExternalLink> o C#. <Link href={YieldIEnumerable20230826.getRoute()}>Este link leva a um artigo escrito sobre yield e IEnumerable.</Link></p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Use infrastructure in your favor</h3></p>),
            pt: (<p><h3>Infraestrutura a seu favor</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>It is good to cache data or results that changes infrequently. They are relatively easy to manage, and cached results not only avoid consuming resources from the infrastructure to generate the same data everytime, but also speed up processing time. This is specially useful when caching results of non-scalable resources.</p>),
            pt: (<p>É interessante cachear dados e resultados que não mudam com frequência. Além de serem relativamente simples de gerenciar, resultados cacheados evitam os gastos de recursos pra gerar resultados com os mesmos dados toda requisição, e ajudam na performance de processamento. Cacheamento é especialmente útil quando evita o consumo de recursos não-escaláveis.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Apply request coalescing in non-mutable and frequently called functions. Request coalescing means that different function calls that predictably return the same result do not need to be executed twice - attach the second request to the first and return the same data to both. I created a thread-safe C# library that allows both request coalescing and in-memory cache, called <ExternalLink href="https://www.nuget.org/packages/TimedDictionary">TimedDictionary</ExternalLink>.</p>),
            pt: (<p>Aplique coalescência de chamadas nas funções e requisições não-mutáveis e que são chamadas com frequência. Essa técnica faz com que diferentes chamadas pra uma mesma função e que retornam o mesmo resultado não precisa ser processado múltiplas vezes - basta propagar o resultado da primeira requisição para as demais e todos receberão os mesmos dados. Eu criei uma biblioteca C# thread-safe que permite tanto a coalescência como um cache em memória, chamado <ExternalLink href="https://www.nuget.org/packages/TimedDictionary">TimedDictionary</ExternalLink>.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Execute only what is necessary, and avoid using generic functions that generate and return much more data than is required to fulfill the request. Try to keep a balance between practicality and optimization.</p>),
            pt: (<p>Execute apenas o que for necessário, e evite funções genéricas que criam e retornam muito mais dados do que é necessário para concluir uma execução. Tente manter um balanço entre praticalidade e otimização.</p>)
        })
    ]
});