import Link from "next/link";
import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";
import { RedisRedlockCsharp20221212 } from "./20221212.redis.redlock.csharp";

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

    getContent: () => [
        new LocaleContentAny({
            en: (<p><a target="_blank" href="https://redis.io/">Redis</a> is an in-memory key/value database that runs as a service and can be accessed by network. In other words, it's like a online Dictionary (or HashMap) structure, lightweight and very fast, but unlike it's competitor <a target="_blank" href="https://www.memcached.org/">memcached</a>, it does have extra database features to make it more versatile.</p>),
            pt: (<p><a target="_blank" href="https://redis.io/">Redis</a> é um banco de dados chave/valor em memória, instalado como serviço e que pode ser acessado remotamente. Em outras palavras, funciona como uma estrutura online de Dictionary (ou HashMap), leve e rápido, mas diferente de seu concorrente <a target="_blank" href="https://www.memcached.org/">memcached</a>, ele possui funcionalidades de banco de dados que o deixa mais versátil.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Basic use case</b></p>),
            pt: (<p><b>Caso de uso básico</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Redis does not maintain any official C# library, but it does endorse <a target="_blank" href="https://github.com/StackExchange/StackExchange.Redis">StackExchange.Redis</a>.</p>),
            pt: (<p>Redis não possui bibliotecas C# oficiais, mas apoia a biblioteca <a target="_blank" href="https://github.com/StackExchange/StackExchange.Redis">StackExchange.Redis</a>.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.bash}
            code={`dotnet add package StackExchange.Redis`}></CodeBlock>),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`using StackExchange.Redis;

public class RedisRepository
{
    // ConnectionMultiplexer should be used as a Singleton
    // Recommended to inject as IConnectionMultiplexer and dispose when the application shuts down
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
            pt: (<p>Por padrão, todos os valores inseridos são permanentes até que sejam manualmente removidos, mas o Redis implementa um parâmetro <u>expiry</u>, aonde cada valor pode ter seu próprio tempo de vida e é automaticamente removido depois do tempo configurado.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            useEncode={false}
            code={`// Keep the value for only 5 seconds
await db.StringSetAsync(key, value, <span class="code-highlight">expiry: TimeSpan.FromSeconds(5)</span>);`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>Redis does not implement sliding expiration natively, but it's possible to reset the expiry timer using KeyExpireAsync. Use it after every successful get operation to simulate the sliding feature.</p>),
            pt: (<p>Redis não possui sliding de tempo de vida, para extender o tempo de vida automaticamente a cada consulta, mas é possível alterar o tempo de vida usando KeyExpireAsync. Ao alterar o valor a cada operação de busca, é possível simular a função de slide.</p>)
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
            en: (<p>Redis can <a target="_blank" href="https://redis.io/docs/getting-started/installation/">be installed on a local machine</a>, but there's no native support for Windows. However, Redis maintains an <a target="_blank" href="https://hub.docker.com/_/redis/">official docker image</a> on Docker HUB and is supported by the biggest cloud platforms, so it's fairly easy to launch an instance on a cloud environment.</p>),
            pt: (<p>Redis pode ser <a target="_blank" href="https://redis.io/docs/getting-started/installation/">instalado na máquina local</a>, mas não tem suporte nativo no Windows. Porém, Redis mantém uma <a target="_blank" href="https://hub.docker.com/_/redis/">imagem oficial de docker</a> no Docker HUB e é suportado naturalmente pelas maiores plataformas cloud, então é relativamente fácil de subir uma instância em alguma plataforma cloud.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Redis is <a target="_blank" href="https://redis.io/docs/management/security/">designed for performance, not security</a>, so it should be used on trusted networks with trusted clients and avoid external access. Still, it does offer authentication and a few configuration options, overall is pretty stable and cares about vulnerabilities.</p>),
            pt: (<p>Redis é <a target="_blank" href="https://redis.io/docs/management/security/">focado em performance, não segurança</a>, então ele deve usado em redes confiáveis com clients confiáveis, evitando acesso externo. Mesmo assim, Redis oferece um mecanismo de autenticação e algumas opções de configurações, e no geral é bastante estável e se preocupa com vulnerabilidades.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Redis persists data as key/value pairs and supports a few <a target="_blank" href="https://redis.io/docs/data-types/">data types</a>. <u>Key</u> accepts only string and byte[]. <u>Value</u> accepts most of the primitives (string, int, float, byte[], etc) and built-in has some complex types, like bitmaps, hashmaps, sets, geospatial data and others.</p>),
            pt: (<p>Redis mantém dados como pares de chave/valor e suporta alguns <a target="_blank" href="https://redis.io/docs/data-types/">tipos de dados</a>. <u>Chaves</u> podem ser alimentadas apenas com string e byte[]. <u>Valores</u> podem ser alimentados com a maioria dos primitivos (string, int, float, byte[], etc) e algumas estruturas complexas implementadas pelo próprio Redis, como bitmaps, hashmaps, sets, registros geoespaciais e outros.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Some of the extra features Redis provides are <a target="_blank" href="https://redis.io/docs/management/replication/">master/slave data replication</a> for high availability, <a target="_blank" href="https://redis.io/docs/management/persistence/">data persistence strategies and snapshots</a> so the Redis instance can recover from a crash with pre-populated data and <a target="_blank" href="https://redis.io/docs/manual/transactions/">batch command execution</a>, which Redis call "transaction" but does not support rollbacks. It can also <a target="_blank" href="https://redis.io/docs/manual/programmability/eval-intro/">run Lua scripts</a>, which can be used similarly as SQL's stored procedures.</p>),
            pt: (<p>Algumas das funcionalidades extras que Redis oferece são <a target="_blank" href="https://redis.io/docs/management/replication/">replicação de dados via master/slave</a> para aumento de disponibilidade, <a target="_blank" href="https://redis.io/docs/management/persistence/">estratégias de persistência de dados e snapshots</a> para recuperar instâncias já com dados pré-populados em casos de crashes e <a target="_blank" href="https://redis.io/docs/manual/transactions/">execução de comandos em batch</a>, que o Redis chama de "transação" mas não é possível realizar rollbacks. Também é possível <a target="_blank" href="https://redis.io/docs/manual/programmability/eval-intro/">rodas scripts Lua</a>, que podem simular funcionalidades semelhantes às stored procedures do SQL.</p>)
        }),

        new LocaleContentAny({
            en: (<p>When using a system with multiple instances and a shared Redis instance, it is recommended to use a distribuited lock strategy. <Link href={RedisRedlockCsharp20221212.getRoute()}>This article has an example of a simple implementation.</Link></p>),
            pt: (<p>Quando um sistema que cria múltiplas instâncias quer utilizar um único Redis compartilhado, é recomendado usar uma estratégia de lock distribuido. <Link href={RedisRedlockCsharp20221212.getRoute()}>Este artigo demonstra uma implementação simplificada.</Link></p>)
        }),
    ]
});