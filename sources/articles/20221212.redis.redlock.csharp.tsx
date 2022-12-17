import Link from "next/link";
import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";
import { RedisIntroduction20221211 } from "./20221211.redis.introduction.and.example";

export const RedisRedlockCsharp20221212 = new Article({
    code: "221212",
    date: new ArticleDate(2022, 12, 12),
    
    title: new LocaleContentText({
        en: "[C#] Implementing Redis Redlock for distributed locking",
        pt: "[C#] Implementando Redlock do Redis para lock distribuido"
    }),

    description: new LocaleContentText({
        en: "A simple distributed locking implementation using Redis, Redlock and RedLock.net",
        pt: "Uma implementação simples de lock distribuido usando Redis, Redlock e RedLock.net"
    }),

    slug: new LocaleContentText({
        en: "csharp-distributed-locking-on-redis-using-redlock",
        pt: "csharp-lock-distribuido-em-redis-usando-redlock"
    }),

    tags: [ArticleTag.csharp],

    getContent: () => [
        new LocaleContentAny({
            en: (<p>Redis can be used on systems with parallel processing, whether it's a multi-thread or multi-instance system. However, there's always the possibility that two or more threads have to cache the same value, and end up executing redundant functions. To avoid this, the system can use a lock mechanism, so a specific data is only processed by one thread at a time, and all other threads can make use of the result.</p>),
            pt: (<p>É possível usar uma única instância Redis em sistemas com processamento paralelo, seja pelo sistema ser multi-thread ou por executar várias instâncias. Porém, sempre existe a possibilidade de duas ou mais threads precisarem de um mesmo valor ao mesmo tempo, e acabarem executando funções em redundância. Neste cenário, é o sistema pode utilizar um mecanismo de lock, para que cada tipo de dado seja executado por apenas uma thread por vez, e as demais threads poderão aproveitar o resultado.</p>)
        }),

        new LocaleContentAny({
            en: (<p>For that, Redis recommends using the <a href="https://redis.com/redis-best-practices/communication-patterns/redlock/">Redlock algorithm</a>. In summary, it's a <a href="https://en.wikipedia.org/wiki/Semaphore_(programming)">semaphore</a> shared between processes, that can be implemented using Redis itself.</p>),
            pt: (<p>Pra isso, o Redis recomenda utilizar <a href="https://redis.com/redis-best-practices/communication-patterns/redlock/">Redlock</a>. Em resumo, ele é um <a href="https://en.wikipedia.org/wiki/Semaphore_(programming)">semáforo</a> compartilhado entre processos, que pode ser implementado usando o Redis.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Redlock uses the value timeout as a safe-keep, to avoid infinite locks in cases when a consumer crashes before releasing the lock. As refresher about some basic concepts, <Link href={RedisIntroduction20221211.getRoute()}>this article is an introduction about Redis</Link>.</p>),
            pt: (<p>Redlock usa o mecanismo de timeout de valores como segurança, para evitar locks intermináveis em situações que algum sistema sofra crash antes de liberar um lock. Para relembrar dos conceitos básicos, <Link href={RedisIntroduction20221211.getRoute()}>este artigo é uma introdução ao Redis</Link>.</p>)
        }),
        
        new LocaleContentAny({
            en: (<p><a href="https://www.nuget.org/packages/RedLock.net">RedLock.net</a> is one of a few C# libraries endorsed by the Redis company that can help implementing the algorithm. The code uses <a href="https://en.wikipedia.org/wiki/Double-checked_locking">double-check locking</a> to avoid reprocessing when the waiting threads acquire the lock.</p>),
            pt: (<p><a href="https://www.nuget.org/packages/RedLock.net">RedLock.net</a> é uma das bibliotecas C# apoiadas pela empresa do Redis que nos auxiliam com a implementação desse algoritmo. O código usa a técnica de <a href="https://en.wikipedia.org/wiki/Double-checked_locking">double-check locking</a> para evitar que threads enfileiradas executem um reprocessamento indevido.</p>)
        }),


        new LocaleContentAny({
            en: (<p><b>Regarding the usage</b></p>),
            pt: (<p><b>Considerações sobre o uso</b></p>)
        }),


        new LocaleContentAny({
            en: (<p>When using the Redlock algorithm, there are a few scenarios that need attention. For example, the lock can timeout before the current consumer unlocks it. So it's possible that parallel processing end up happening.</p>),
            pt: (<p>No algoritmo Redlock, alguns cenários precisam de atenção especial. Por exemplo, o lock pode dar timeout e ser liberado antes do processo ser concluído. Então é possível que mais de uma thread acabe executando o mesmo processo.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Another thing is that Redlock.net is not notified when the lock becomes available. It manages itself by checking the lock status from time to time, up to a time limit. As there's a time limit, it's also possible that the time limit is reached before the lock becomes available, and the code has to handle it in some way.</p>),
            pt: (<p>O Redlock.net também não é notificado quando um lock fica disponível. A biblioteca adquire o lock fazendo checagens periódicas no Redis, até um tempo limite. É possível que a thread chegue no tempo limite sem que o lock tenha ficado disponível, então o código deve prever esse tipo de cenário.</p>)
        }),


        new LocaleContentAny({
            en: (<p><b>Package install</b></p>),
            pt: (<p><b>Instalação do package</b></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.bash}
            code={`dotnet add package RedLock.net`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><b>Redlock in repository</b></p>),
            pt: (<p><b>Redlock em repositório</b></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`using RedLockNet.SERedis;
using RedLockNet.SERedis.Configuration;

public class RedisLockRepository
{
    // ConnectionMultiplexer should be used as a Singleton
    // Recommended to inject as IConnectionMultiplexer and dispose when the application shuts down
    private readonly static ConnectionMultiplexer Connection = ConnectionMultiplexer.Connect("localhost");

    // RedlockFactory should be used as a Singleton as well
    // Recommended to inject and dispose when the application shuts down
    private readonly static RedLockFactory LockFactory = RedLockFactory.Create(new List<RedLockMultiplexer>(){ Connection });

    private string GetLockKey(string key)
    {
        return $"lock.{key}";
    }

    private async Task<IRedLock> CreateLockAsync(string lockKey)
    {
        return await LockFactory.CreateLockAsync
        (
            lockKey,
            expiryTime: TimeSpan.FromSeconds(30), // Maximum time a process can hold the lock
            waitTime: TimeSpan.FromSeconds(10), // How much time this thread can wait for the lock until giving up
            retryTime: TimeSpan.FromSeconds(1) // How much time between rechecking if the lock is available
        );
    }

    public async Task<int> GetValueOrLoadAsync(string key, Func<Task<int>> loadAsync)
    {
        var db = Connection.GetDatabase();

        var value = await db.StringGetAsync(key);
        if(value.IsNull)
        {
            var lockKey = GetLockKey(key);

            using(var acquiredLock = await CreateLockAsync(lockKey))
            {
                if(acquiredLock.IsAcquired)
                {
                    value = await db.StringGetAsync(key);
                    if(value.IsNull)
                    {
                        value = await loadAsync();
                        await db.StringSetAsync(key, value, expiry: TimeSpan.FromSeconds(30));
                    }
                }
                else
                {
                    /* Lock not acquired, decide what to do */
                }
            }
        }
        
        return (int)value;
    }
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><b>Using the repository</b></p>),
            pt: (<p><b>Usando o repositório</b></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`var repository = new RedisLockRepository();

await repositoryLock.GetValueOrLoadAsync
(
    key: valueKey, 
    loadAsync: async () => 
    { 
        /* Execute value generation */ 
    }
);`}></CodeBlock>),

    ]
});