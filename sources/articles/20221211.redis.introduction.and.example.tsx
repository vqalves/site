import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";

export const RedisIntroduction20221211 = new Article({
    code: "221211",
    date: new ArticleDate(2022, 12, 11),
    
    title: new LocaleContentText({
        en: "[C#] Redis introduction for C# developers",
        pt: "[C#] Introdução ao Redis para desenvolvedores C#"
    }),

    description: new LocaleContentText({
        en: "What is Redis and how to use it on C# applications",
        pt: "O que é o Redis e como usar ele em aplicações C#"
    }),

    slug: new LocaleContentText({
        en: "csharp-redis-introduction",
        pt: "csharp-introducao-redis"
    }),

    tags: [ArticleTag.csharp],

    content: [
        new LocaleContentAny({
            en: (<p><a href="https://redis.io/">Redis</a> is an in-memory key/value database that runs as a service and can be accessed by network. In other words, it's like a online Dictionary (or HashMap) structure, lightweight and very fast, but unlike it's competitor <a href="https://www.memcached.org/">memcached</a>, it does have extra database features to make it more versatile.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Basic use case</b></p>),
            pt: (<p><b>Caso de uso básico</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Redis does not maintain any official C# library, but it does endorse <a href="https://github.com/StackExchange/StackExchange.Redis">StackExchange.Redis</a>.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.bash}
            code={`dotnet add package StackExchange.Redis`}></CodeBlock>),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`using StackExchange.Redis;

public class RedisRepository
{
    // ConnectionMultiplexer should be used as a Singleton - recommended to inject as IConnectionMultiplexer and dispose when the application shuts down
    private readonly static ConnectionMultiplexer Connection = ConnectionMultiplexer.Connect("localhost");

    public async Task<int?> GetValueAsync(string key)
    {
        var db = Connection.GetDatabase();
        var value = await db.StringGetAsync(key);
        return (int?)value;
    }

    public async Task SetValueAsync(string key, int value)
    {
        var db = Connection.GetDatabase();
        await db.StringSetAsync(key, value);
    }

    public async Task RemoveValueAsync(string key)
    {
        var db = Connection.GetDatabase();
        await db.KeyDeleteAsync(key);
    }
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>By default, all values are permanent until manually removed, but Redis implements an <u>expiry</u> parameter, so each value can have a specific time to live and be removed automatically after the set time.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            useEncode={false}
            code={`// Keep the value for only 5 seconds
await db.StringSetAsync(key, value, <span class="code-highlight">expiry: TimeSpan.FromSeconds(5)</span>);`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>Redis does not implement sliding expiration natively, but it's possible to reset the expiry timer using KeyExpireAsync. Use it after every successful get operation to simulate the sliding feature.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            useEncode={false}
            code={`// Reset the expiry to live for 5 seconds starting from now
await db.<span class="code-highlight">KeyExpireAsync</span>(key, expiry: TimeSpan.FromSeconds(5));`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><b>About Redis</b></p>),
            pt: (<p><b>Sobre o Redis</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Redis can <a href="https://redis.io/docs/getting-started/installation/">be installed on a local machine</a>, but there's no native support for Windows. However, Redis maintains an <a href="https://hub.docker.com/_/redis/">official docker image</a> on Docker HUB, so it's fairly easy to launch an instance on a cloud environment.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Redis is <a href="https://redis.io/docs/management/security/">designed for performance, not security</a>, so it should be used on trusted networks with trusted clients and avoid external access. Still, it does offer authentication and a few configuration options, overall is pretty stable and prevents common exploits.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Redis persists data as key/value pairs and supports a few <a href="https://redis.io/docs/data-types/">data types</a>. <u>Key</u> accepts only string and byte[]. <u>Value</u> accepts most of the primitives (string, int, float, byte[], etc) and built-in has some complex types, like bitmaps, hashmaps, sets, geospatial data and others.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Some of the extra features Redis provides are <a href="https://redis.io/docs/management/replication/">master/slave data replication</a> for high availability, <a href="https://redis.io/docs/management/persistence/">data persistence strategies and snapshots</a> so the Redis instance can recover from a crash with pre-populated data and <a href="https://redis.io/docs/manual/transactions/">batch command execution</a>, which Redis call "transaction" but does not support rollbacks. It can also <a href="https://redis.io/docs/manual/programmability/eval-intro/">run Lua scripts</a>, which can be used similarly as SQL's stored procedures.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Using Redis with containerized applications (or with multiple instances)</b></p>),
            pt: (<p><b>Usando Redis com aplicações em container (ou com múltiplas instâncias)</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>A single Redis service can be used in multiple application instances, however it is possible that N instances will look-up a key in Redis at the same time, and by not finding a value, will start processing their own value.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>To avoid simultaneous redundant processing, Redis recommends using the <a href="https://redis.com/redis-best-practices/communication-patterns/redlock/">Redlock algorithm</a>, as they call it. In summary, it's a shared <a href="https://en.wikipedia.org/wiki/Semaphore_(programming)">semaphore</a> that can be implemented using Redis itself, and use the timeout feature just in case a consumer crashes while holding a lock.</p>),
            pt: (<p></p>)
        }),
        

        new LocaleContentAny({
            en: (<p>To implement it, we can use another package endorsed by Redis called <a href="https://www.nuget.org/packages/RedLock.net">RedLock.net</a>. Bear in mind that the library is not notified when the lock is available, so it uses retries and timeout for that purpose and is <u>not fail-proof</u>. It is totally possible the lock stays in use for more time than the process is willing to wait, and the lock is never acquired.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>The code below demonstrates how to use the library. The application will look for the value on Redis, and if not found, will reserve a lock and execute the load function, while all other threads or instances wait. It's also recommended to use the <a href="https://en.wikipedia.org/wiki/Double-checked_locking">double-check locking technique</a> to avoid reprocessing on the threads that couldn't find the value at first and are waiting the lock</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.bash}
            code={`dotnet add package RedLock.net`}></CodeBlock>),

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