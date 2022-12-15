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
        en: "[C#] Implementing Redis Redlock for distributed locking on C#",
        pt: "[C#] Implementando Redlock do Redis para lock distribuido no C#"
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
            en: (<p>Scalable systems can have multiple instances running at the same time, and usually those instances don't talk among eachother. While they can share the same Redis instance, there's a possibility that an uncached data is requested on multiple instances at the same time. When that happens, multiple instances will process data that will ultimately override one another. To avoid wasting processing power, it is recommended to implement a distributed lock strategy, so a specific data will only be processed by an instance at a time. </p>),
            pt: (<p>Sistemas escaláveis podem rodar múltiplas instâncias ao mesmo tempo, e normalmente estas instâncias não se comunicam diretamente. Quando as instâncias compartilham um mesmo Redis, existe a possibilidade de que múltiplas instâncias precisem trabalhar com um dado ainda não cacheado. Neste cenário, múltimas instâncias irão processar o dado em paralelo, apenas para no fim um sobrescrever o outro. Para evitar desperdício de processamento, é recomendado implementar uma estratégia de lock distribuido, para garantir que cada valor seja processado por apenas uma instância por vez.</p>)
        }),

        new LocaleContentAny({
            en: (<p>For that, Redis recommends using the <a href="https://redis.com/redis-best-practices/communication-patterns/redlock/">Redlock algorithm</a>, as they call it. In summary, it's a shared <a href="https://en.wikipedia.org/wiki/Semaphore_(programming)">semaphore</a> that can be implemented using Redis itself, and use the timeout feature as a fail-safe, just in case a consumer crashes while holding a lock. For a refresher about what is Redis, <Link href={RedisIntroduction20221211.getRoute()}>this article touch on a few introductory concepts</Link>.</p>),
            pt: (<p>Pra isso, o Redis recomenda utilizar um algoritmo apelidado como <a href="https://redis.com/redis-best-practices/communication-patterns/redlock/">Redlock</a>. Em resumo, ele é um <a href="https://en.wikipedia.org/wiki/Semaphore_(programming)">semáforo</a> compartilhado que pode ser implementado usando o próprio Redis, e usa o timeout como proteção, para os casos que algum sistema consumidor seja derrubado enquanto reservou um lock. Para relembrar dos conceitos gerais do Redis, <Link href={RedisIntroduction20221211.getRoute()}>este artigo introduz os conceitos mais relevantes</Link>.</p>)
        }),
        
        new LocaleContentAny({
            en: (<p>To implement it, we can use another package endorsed by Redis called <a href="https://www.nuget.org/packages/RedLock.net">RedLock.net</a>. Bear in mind that the library is not notified when the lock is available, so it uses retries and timeout for that purpose and is <u>not fail-proof</u>. It is totally possible that the lock stays in use for more time than the process is willing to wait, so the library gives up and moves on.</p>),
            pt: (<p>Para implementar o algoritmo, podemos usar uma biblioteca apoiada pelo Redis chamada <a href="https://www.nuget.org/packages/RedLock.net">RedLock.net</a>. Vale ressaltar que esta biblioteca não é notificada quando um lock é devolvido, e para isso ela usa uma estratégia de timeouts e retentativas, e portanto <u>não é à prova de falhas</u>. É totalmente possível que um lock fique reservado por mais tempo do que um processo foi configurado para esperar, e a biblioteca simplesmente avança com a execução.</p>)
        }),

        new LocaleContentAny({
            en: (<p>The code below demonstrates one way to use the library. The application will look for the value on Redis, and if not found, will reserve the lock and execute a load function. Any other thread or process that tries to execute concurrently will wait for the lock. The code uses <a href="https://en.wikipedia.org/wiki/Double-checked_locking">double-check locking</a> to avoid reprocessing when the waiting threads acquire the lock.</p>),
            pt: (<p>O código abaixo demonstra uma forma de utilizar a biblioteca. Primeiro a aplicação buscará o valor no Redis, e se não for encontrado, irá reservar um lock e executar a função de carregamento. Outras threads e processo que precisarem do dado irão aguardar a liberação do lock. O código usa a técnica de <a href="https://en.wikipedia.org/wiki/Double-checked_locking">double-check locking</a> para evitar que threads enfileiradas executem um reprocessamento indevido.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.bash}
            code={`dotnet add package RedLock.net`}></CodeBlock>),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`var repository = new RedisLockRepository();
await repositoryLock.GetValueOrLoadAsync
(
    key: valueKey, 
    loadAsync: async () => { /* Execute value generation */ }
);`}></CodeBlock>),

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
    ]
});