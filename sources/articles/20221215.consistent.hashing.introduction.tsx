import Link from "next/link";
import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";

export const ConsistentHashingIntroduction20221215 = new Article({
    code: "221215",
    date: new ArticleDate(2022, 12, 15),
    
    title: new LocaleContentText({
        en: "[Concept] Database sharding and consistent hashing",
        pt: "[Conceito] Shards de banco de dados e consistent hashing"
    }),

    description: new LocaleContentText({
        en: "Introduction to the concept of consistent hashing as a database sharding strategy",
        pt: "Introdução ao conceito de consistent hashing como estratégia de sharding de banco de dados"
    }),

    slug: new LocaleContentText({
        en: "db-sharding-and-consistent-hashing",
        pt: "db-sharding-e-consistent-hashing"
    }),

    tags: [ArticleTag.concept, ArticleTag.database],

    getContent: () => [
        new LocaleContentAny({
            en: (<p>When a database table starts to grow over gigabytes of data or billions of records, managing the data availability and workload on a single database instance becomes very challenging. For those scenarios, <a target="_blank" href="https://en.wikipedia.org/wiki/Partition_(database)">partitioning the table</a> is recommended to make all the data easier to manage and process.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>One of the most drastic approaches to partitioning is <a target="_blank" href="https://en.wikipedia.org/wiki/Shard_(database_architecture)">sharding the database</a>, which splits the data and workload into different database instances, allowing the use of multiple servers and increasing the processing power and storage potential.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Sharding a database brings a lot of different challenges that are often trivial on single instances databases, like data aggregation and filtering, instance selection, hotspot detection and shard management.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>This article focus specifically on introducing the concept of distributing data on database shards using <a target="_blank" href="https://en.wikipedia.org/wiki/Consistent_hashing">consistent hashing</a>, which makes the data easier to manage than <a target="_blank" href="https://en.wikipedia.org/wiki/Linear_hashing">linear hashing</a>.</p>),
            pt: (<p></p>)
        }),


        new LocaleContentAny({
            en: (<p><b>Hashing</b></p>),
            pt: (<p><b>Hashing</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Hashing involves using an algorithm that maps object data to a numerical representation. For database sharding, we have to calculate a hash based on the record ID.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Good algorithms for sharding aims for evenly distributed values, where small input changes drasticly changes on the output, and is fast to execute. This demonstration generates values from 0 to 999, but <u>a bigger range of outputs is better</u> for granularity, for example 0 to 2^32.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<div>
                <div>- <u>Input</u>: string</div>
                <div>- <u>Output</u>: int</div>
                <div>- <u>Range</u>: 0 to 999</div>
            </div>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (
            <table>
                <thead>
                    <tr><td><b>Input</b></td><td><b>Output</b></td></tr>
                </thead>
                <tbody>
                    <tr><td>"key_1"</td><td>22</td></tr>
                    <tr><td>"key_2"</td><td>894</td></tr>
                    <tr><td>"key_3"</td><td>379</td></tr>
                </tbody>
            </table>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Dynamic sharding</b></p>),
            pt: (<p><b>Dynamic sharding</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Each database shard will be responsible for a specific range of the hashing output. The objective is balance the workload, so at first it is recommended to split the data evenly.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (
            <table>
                <thead>
                    <tr><td><b>Database instance</b></td><td><b>Range</b></td></tr>
                </thead>
                <tbody>
                    <tr><td>Instance A</td><td>[000..249]</td></tr>
                    <tr><td>Instance B</td><td>[250..499]</td></tr>
                    <tr><td>Instance C</td><td>[500..749]</td></tr>
                    <tr><td>Instance D</td><td>[750..999]</td></tr>
                </tbody>
            </table>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>This way, we can determine where the data should be kept based on the hash value.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (
            <table>
                <thead>
                    <tr><td><b>Input</b></td><td><b>Hash</b></td><td><b>Database</b></td></tr>
                </thead>
                <tbody>
                    <tr><td>"key_1"</td><td>22</td><td>Instance A</td></tr>
                    <tr><td>"key_2"</td><td>894</td><td>Instance D</td></tr>
                    <tr><td>"key_3"</td><td>379</td><td>Instance B</td></tr>
                </tbody>
            </table>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Why dynamic table instead of modulo</b></p>),
            pt: (<p><b>Porque tabela dinâmica ao invés de módulo</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Adding or removing database shards requires data reallocation one way or another. But using hashing range + dynamic table, the hashing function can stay the same, without impacting the hashing output, so we have much more control on what and how many shards will be affected by the migration.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Since data migration causes slowness or downtime, this lowers the impact on system availability. As demonstrated below:</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Adding a server</b></p>),
            pt: (<p><b>Adicionando um servidor</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>On situations where a server is getting too big, or became a hotstop and cannot handle all requests, adding a new server will require reallocating data from that server only, while all others will continue operating as normal. For example, if we wanted to split the instance A in half:</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (
            <table>
                <thead>
                    <tr><td><b>Database instance</b></td><td><b>Range</b></td><td><b>Required data reallocation</b></td></tr>
                </thead>
                <tbody>
                    <tr><td>Instance A1</td><td>[000..124]</td><td>Yes</td></tr>
                    <tr><td>Instance A2</td><td>[125..249]</td><td>Yes</td></tr>
                    <tr><td>Instance B</td><td>[250..499]</td><td>No</td></tr>
                    <tr><td>Instance C</td><td>[500..749]</td><td>No</td></tr>
                    <tr><td>Instance D</td><td>[750..999]</td><td>No</td></tr>
                </tbody>
            </table>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Removing a server</b></p>),
            pt: (<p><b>Removendo um servidor</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Similarly, if two servers are under-used, it's simple to merge the data into a single instance without affecting the other servers. For exemple, if C and D are under-used, we can elect the instance C absorb all the range and data of the instance D.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (
            <table>
                <thead>
                    <tr><td><b>Database instance</b></td><td><b>Range</b></td><td><b>Required data reallocation</b></td></tr>
                </thead>
                <tbody>
                    <tr><td>Instance A1</td><td>[000..124]</td><td>No</td></tr>
                    <tr><td>Instance A2</td><td>[125..249]</td><td>No</td></tr>
                    <tr><td>Instance B</td><td>[250..499]</td><td>No</td></tr>
                    <tr><td>Instance C merged</td><td>[500..999]</td><td>Yes</td></tr>
                </tbody>
            </table>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Virtual nodes</b></p>),
            pt: (<p><b>Virtual nodes</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>It is expected that each shard will have different workloads, even if the hash is splitting the data equally. For example, some records might have more access than others, or the ID going to the hash function is generating biased hashes.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>To help rebalance the servers workload without adding or removing, we can bind multiple ranges into a single physical server instance. In this scenario, it is more appropriate to say the hash ranges are assigned to <u>virtual nodes</u> rather than database instances.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (
            <table>
                <thead>
                    <tr><td><b>Physical database</b></td><td><b>Virtual node</b></td><td><b>Range</b></td></tr>
                </thead>
                <tbody>
                    <tr><td>Instance A</td><td>Node 1</td><td>[000..199]</td></tr>
                    <tr><td>Instance B</td><td>Node 2</td><td>[200..399]</td></tr>
                    <tr><td>Instance C</td><td>Node 3</td><td>[400..599]</td></tr>
                    <tr><td>Instance A</td><td>Node 4</td><td>[600..799]</td></tr>
                    <tr><td>Instance B</td><td>Node 5</td><td>[800..999]</td></tr>
                </tbody>
            </table>),
            pt: (<p></p>)
        }),
    ]
});