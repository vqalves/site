import ExternalLink from "../../components/external.link";
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
            en: (<p>When a database table starts to grow over gigabytes of data or billions of records, managing the data availability and workload on a single database instance becomes very challenging. For those scenarios, <ExternalLink href="https://en.wikipedia.org/wiki/Partition_(database)">partitioning the table</ExternalLink> is recommended to make all the data easier to manage and process.</p>),
            pt: (<p>No banco de dados, quando uma tabela cresce a ponto de chegar a gigabytes de dados ou bilhões de registros, gerenciar a disponibilidade e sobrecarga de uma única instância de banco de dados fica bastante desafiador. Nestes cenários, é recomendado <ExternalLink target="_blank" href="https://pt.wikipedia.org/wiki/Parti%C3%A7%C3%A3o_(banco_de_dados)">particionar a tabela</ExternalLink> para facilitar a gestão e processamento dos dados.</p>)
        }),

        new LocaleContentAny({
            en: (<p>One of the most drastic approaches to partitioning is <ExternalLink href="https://en.wikipedia.org/wiki/Shard_(database_architecture)">sharding the database</ExternalLink>, which splits the data and workload into different database instances, allowing the use of multiple servers and increasing the processing power and storage potential.</p>),
            pt: (<p>Uma das formas mais drásticas de particionamento é a <ExternalLink href="https://pt.wikipedia.org/wiki/Shard_(arquitetura_de_banco_de_dados)">fragmentação do banco de dados, ou sharding</ExternalLink>, que divide os registros e processamento em instâncias de banco de dados diferentes. Isso permite que sejam usados vários servidores físicos diferentes, aumentando o potencial de armazenamento e processamento.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Sharding a database brings a lot of different challenges that are often trivial on single instances databases, like data aggregation and filtering, instance selection, hotspot detection and shard management.</p>),
            pt: (<p>Aplicar sharding em um banco de dados é desafiador e gera dificuldades que costumam ser triviais em bancos de instâncias únicas, como agregação e filtro de dados, seleção e gestão de instâncias, detecção de gargalos, etc.</p>)
        }),

        new LocaleContentAny({
            en: (<p>This article focus specifically on introducing the concept of distributing data on database shards using <ExternalLink href="https://en.wikipedia.org/wiki/Consistent_hashing">consistent hashing</ExternalLink>.</p>),
            pt: (<p>Este artigo introduz o conceito de distribuição de registros de banco de dados em shards usando <ExternalLink href="https://en.wikipedia.org/wiki/Consistent_hashing">consistent hashing</ExternalLink>.</p>)
        }),


        new LocaleContentAny({
            en: (<p><b>Hashing</b></p>),
            pt: (<p><b>Hashing</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Hashing involves using an algorithm that maps object data to a numerical representation. For database sharding, we have to calculate a hash based on the record ID.</p>),
            pt: (<p>Hashing envolve usar um algoritmo que converte dados em uma representação numérica. Para sharding de registros, calculamos um hash baseado no ID do registro.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Good algorithms for sharding aims to evenly distributed values, have fast execution and be built in a way that a small input change will drastically change the output. It is not a problem to generate repeated hash values, but for flexibility <u>it is better to have a big range of outputs</u>.</p>),
            pt: (<p>Para sharding, bons algoritmos de hash distribuem os valores igualitariamente, são de rápida execução, e permitem que pequenas alterações no dado de entrada gerem grandes mudanças no dado de saída. É aceitável que diferentes inputs gerem o mesmo valor de hash, mas por flexibilidade é <u>melhor que o hash tenha um grande volume de valores possíveis</u>.</p>)
        }),

        new LocaleContentAny({
            en: (<p>For simplicity sake, the demonstration below generates values from 0 to 999, but for a real-life scenario, a range from 0 to 2^32 would be prefered.</p>),
            pt: (<p>Por simplicidade, a demonstração abaixo gera valores de 0 a 999, mas em cenário de real seria mais recomendado valores de 0 a 2^32.</p>)
        }),

        

        new LocaleContentAny({
            en: (<div>
                <div>- <u>Input</u>: string</div>
                <div>- <u>Output</u>: int</div>
                <div>- <u>Range</u>: 0 to 999</div>
            </div>),
            pt: (<div>
                <div>- <u>Input</u>: string</div>
                <div>- <u>Output</u>: int</div>
                <div>- <u>Resultados</u>: 0 a 999</div>
            </div>)
        }),

        LocaleContentAny.all(
            <table>
                <thead>
                    <tr><td><b>Input</b></td><td><b>Output</b></td></tr>
                </thead>
                <tbody>
                    <tr><td>"key_1"</td><td>22</td></tr>
                    <tr><td>"key_2"</td><td>894</td></tr>
                    <tr><td>"key_3"</td><td>379</td></tr>
                </tbody>
            </table>
        ),

        new LocaleContentAny({
            en: (<p><b>Dynamic sharding</b></p>),
            pt: (<p><b>Dynamic sharding</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Each database shard will be responsible for a specific range of the hashing output. The objective is to balance the workload, so at first it is recommended to split the data evenly.</p>),
            pt: (<p>Cada shard do banco de dados será responsável por uma faixa de valores de hash. Como o objetivo é distribuir o processamento de forma balanceada, inicialmente é recomendado dividir os dados proporcionalmente.</p>)
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
            pt: (
            <table>
                <thead>
                    <tr><td><b>Instância</b></td><td><b>Faixa</b></td></tr>
                </thead>
                <tbody>
                    <tr><td>Instance A</td><td>[000..249]</td></tr>
                    <tr><td>Instance B</td><td>[250..499]</td></tr>
                    <tr><td>Instance C</td><td>[500..749]</td></tr>
                    <tr><td>Instance D</td><td>[750..999]</td></tr>
                </tbody>
            </table>
            )
        }),

        new LocaleContentAny({
            en: (<p>This way, we can determine where the data should be kept based on the hash value.</p>),
            pt: (<p>Dessa forma, podemos determinar em qual instância cada um dos registros devem ser armazenados</p>)
        }),

        new LocaleContentAny({
            en: (
                <table>
                    <thead>
                        <tr><td><b>Input</b></td><td><b>Hash</b></td><td><b>Instance</b></td></tr>
                    </thead>
                    <tbody>
                        <tr><td>"key_1"</td><td>22</td><td>Instance A</td></tr>
                        <tr><td>"key_2"</td><td>894</td><td>Instance D</td></tr>
                        <tr><td>"key_3"</td><td>380</td><td>Instance B</td></tr>
                    </tbody>
                </table>
            ),
            pt: (
                <table>
                    <thead>
                        <tr><td><b>Input</b></td><td><b>Hash</b></td><td><b>Instância</b></td></tr>
                    </thead>
                    <tbody>
                        <tr><td>"key_1"</td><td>22</td><td>Instance A</td></tr>
                        <tr><td>"key_2"</td><td>894</td><td>Instance D</td></tr>
                        <tr><td>"key_3"</td><td>380</td><td>Instance B</td></tr>
                    </tbody>
                </table>
            ),
        }),

        new LocaleContentAny({
            en: (<p><b>Adding an instance</b></p>),
            pt: (<p><b>Adicionando uma instância</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>On situations where an instance is getting too big, or became a hotspot and cannot handle all requests, it's possible to slice that instance hash range and rellocate data from that instance only, while all others will continue operating as normal. For example, if we wanted to split the instance A in half:</p>),
            pt: (<p>Quando uma das instâncias estiver ficando muito grande, ou se tornar um hotspot com muitas requisições, podemos dividir a faixa de hash e transferir os dados apenas dessa instância, enquanto todas as outras instâncias continuam funcionando normalmente. Por exemplo, se quisermos dividir a instância A no meio:</p>)
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
                </table>
            ),
            pt: (
                <table>
                    <thead>
                        <tr><td><b>Instância</b></td><td><b>Faixa</b></td><td><b>Houve migração de dados</b></td></tr>
                    </thead>
                    <tbody>
                        <tr><td>Instance A1</td><td>[000..124]</td><td>Sim</td></tr>
                        <tr><td>Instance A2</td><td>[125..249]</td><td>Sim</td></tr>
                        <tr><td>Instance B</td><td>[250..499]</td><td>Não</td></tr>
                        <tr><td>Instance C</td><td>[500..749]</td><td>Não</td></tr>
                        <tr><td>Instance D</td><td>[750..999]</td><td>Não</td></tr>
                    </tbody>
                </table>
            )
        }),

        new LocaleContentAny({
            en: (<p><b>Removing an instance</b></p>),
            pt: (<p><b>Removendo uma instância</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Similarly, if two instances are under-used, it's simple to merge the data into a single instance without affecting the other instances. For exemple, if C and D are under-used, we can elect the instance C to absorb all the range and data of the instance D.</p>),
            pt: (<p>De forma semelhante, se duas instâncias estiverem com pouco uso, é simples juntar os dados em uma única instância. Por exemplo, se instâncias C e D estiverem com pouco uso, podemos elejer a instância C para absorver os dados da instância D.</p>)
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
            pt: (
            <table>
                <thead>
                    <tr><td><b>Instância</b></td><td><b>Faixa</b></td><td><b>Houve migração de dados</b></td></tr>
                </thead>
                <tbody>
                    <tr><td>Instance A1</td><td>[000..124]</td><td>Não</td></tr>
                    <tr><td>Instance A2</td><td>[125..249]</td><td>Não</td></tr>
                    <tr><td>Instance B</td><td>[250..499]</td><td>Não</td></tr>
                    <tr><td>Instance C merged</td><td>[500..999]</td><td>Sim</td></tr>
                </tbody>
            </table>
            )
        }),

        new LocaleContentAny({
            en: (<p><b>Virtual nodes</b></p>),
            pt: (<p><b>Virtual nodes</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>It is expected that each shard will have different workloads, even if the hash is splitting the data equally. For example, some records might have more access than others, or the ID going to the hash function is generating biased hashes.</p>),
            pt: (<p>É esperado que diferentes shards tenham diferentes níveis de uso, mesmo que o hash esteja dividindo os dados igualmente. Por exemplo, alguns registros podem ter mais acesso que outros, ou os dados de entrada da função de hash estejam emulando algum enviesamento na função.</p>)
        }),

        new LocaleContentAny({
            en: (<p>To help rebalance the instances workload without adding or removing, we can bind multiple ranges into a single instance. In this scenario, it is more appropriate to say the hash ranges are assigned to <u>virtual nodes</u> rather than database instances.</p>),
            pt: (<p>Para ajudar a rebalancear o processamento das instâncias sem alterar a quantidade, podemos atribuir diferentes faixas para uma mesma instância. Neste caso, é mais apropriado dizer que as faixas estão associadas à <u>nodos virtuais</u> do que instâncias de banco de dados.</p>)
        }),

        new LocaleContentAny({
            en: (
                <table>
                    <thead>
                        <tr><td><b>Instance</b></td><td><b>Virtual node</b></td><td><b>Range</b></td></tr>
                    </thead>
                    <tbody>
                        <tr><td>Instance A</td><td>Node 1</td><td>[000..199]</td></tr>
                        <tr><td>Instance B</td><td>Node 2</td><td>[200..399]</td></tr>
                        <tr><td>Instance C</td><td>Node 3</td><td>[400..599]</td></tr>
                        <tr><td>Instance A</td><td>Node 4</td><td>[600..799]</td></tr>
                        <tr><td>Instance B</td><td>Node 5</td><td>[800..999]</td></tr>
                    </tbody>
                </table>
            ),
            pt: (
                <table>
                    <thead>
                        <tr><td><b>Instância</b></td><td><b>Nodo virtual</b></td><td><b>Faixa</b></td></tr>
                    </thead>
                    <tbody>
                        <tr><td>Instance A</td><td>Node 1</td><td>[000..199]</td></tr>
                        <tr><td>Instance B</td><td>Node 2</td><td>[200..399]</td></tr>
                        <tr><td>Instance C</td><td>Node 3</td><td>[400..599]</td></tr>
                        <tr><td>Instance A</td><td>Node 4</td><td>[600..799]</td></tr>
                        <tr><td>Instance B</td><td>Node 5</td><td>[800..999]</td></tr>
                    </tbody>
                </table>
            )
        }),

        new LocaleContentAny({
            en: (<p><b>Why consistent hashing is favored over linear hashing</b></p>),
            pt: (<p><b>Porque é preferível usar consistent hashing ao invés de linear hashing</b></p>)
        }),

        // Adding or removing database shards requires data reallocation one way or another.

        new LocaleContentAny({
            en: (<p><ExternalLink href="https://en.wikipedia.org/wiki/Linear_hashing">Linear hashing</ExternalLink> is a strategy of distributing values on a fixed amount of data buckets. Since each bucket has a single value that represents it, it's a very intuitive and fast strategy.</p>),
            pt: (<p><ExternalLink href="https://en.wikipedia.org/wiki/Linear_hashing">Linear hashing</ExternalLink> é uma estratégia para distribuir registros em uma quantidade fixa de repositórios. Já que cada repositório possui um único valor de representação, é uma estratégia bastante intuitiva e rápida.</p>)
        }),

        new LocaleContentAny({
            en: (<p>A very common way of implementing linear hashing is using the <ExternalLink href="https://en.wikipedia.org/wiki/Modulo_operation">modulo operation</ExternalLink> on the hash value, adopting the number of database instances as the divisor. This strategy also splits the data evenly between all the instances.</p>),
            pt: (<p>A forma mais comum de implementar linear hashing é usando a <ExternalLink href="https://pt.wikipedia.org/wiki/Opera%C3%A7%C3%A3o_m%C3%B3dulo">operação de módulo (mod)</ExternalLink> nos valores de saída do hash, utilizando a quantidade de instâncias de banco de dados como divisor. Isso funciona para distribuir is registros igualmente nas instâncias de banco de dados.</p>)
        }),

        

        new LocaleContentAny({
            en: (
                <div>
                    <div>- <u>Input</u>: string</div>
                    <div>- <u>Number of instances</u>: 3</div>
                    <div>- <u>Map function</u>: <i>hashValue</i> mod <i>instanceCount</i></div>
                </div>
            ),
            pt: (
                <div>
                    <div>- <u>Input</u>: string</div>
                    <div>- <u>Quantidade de instâncias</u>: 3</div>
                    <div>- <u>Função para mapeamento</u>: <i>valorHash</i> mod <i>qntdInstancias</i></div>
                </div>
            )
        }),

        new LocaleContentAny({
            en: (
                <table>
                    <thead>
                        <tr><td><b>Database instance</b></td><td><b>Maps to mod value</b></td></tr>
                    </thead>
                    <tbody>
                        <tr><td>Instance A</td><td>0</td></tr>
                        <tr><td>Instance B</td><td>1</td></tr>
                        <tr><td>Instance C</td><td>2</td></tr>
                    </tbody>
                </table>
            ),
            pt: (
                <table>
                    <thead>
                        <tr><td><b>Instância</b></td><td><b>Valor mod</b></td></tr>
                    </thead>
                    <tbody>
                        <tr><td>Instance A</td><td>0</td></tr>
                        <tr><td>Instance B</td><td>1</td></tr>
                        <tr><td>Instance C</td><td>2</td></tr>
                    </tbody>
                </table>
            )
        }),

        new LocaleContentAny({
            en: (
                <table>
                    <thead>
                        <tr><td><b>Input</b></td><td><b>Hash value</b></td><td><b>Mod value (mod 3)</b></td><td><b>Database</b></td></tr>
                    </thead>
                    <tbody>
                        <tr><td>"key_1"</td><td>22</td><td>1</td><td>Instance B</td></tr>
                        <tr><td>"key_2"</td><td>894</td><td>0</td><td>Instance A</td></tr>
                        <tr><td>"key_3"</td><td>380</td><td>2</td><td>Instance C</td></tr>
                        <tr><td>"key_4"</td><td>643</td><td>1</td><td>Instance B</td></tr>
                    </tbody>
                </table>
            ),
            pt: (
                <table>
                    <thead>
                        <tr><td><b>Input</b></td><td><b>Hash</b></td><td><b>Valor mod (mod 3)</b></td><td><b>Instância</b></td></tr>
                    </thead>
                    <tbody>
                        <tr><td>"key_1"</td><td>22</td><td>1</td><td>Instance B</td></tr>
                        <tr><td>"key_2"</td><td>894</td><td>0</td><td>Instance A</td></tr>
                        <tr><td>"key_3"</td><td>380</td><td>2</td><td>Instance C</td></tr>
                        <tr><td>"key_4"</td><td>643</td><td>1</td><td>Instance B</td></tr>
                    </tbody>
                </table>
            )
        }),

        new LocaleContentAny({
            en: (<p>However, adding or removing instances will change the modulo divisor, so now any ID can potentially generate a different mod value than the previous function.</p>),
            pt: (<p>Porém, incluir ou remover instâncias irá mudar o divisor do módulo, então agora cada ID de registro pode gerar um valor de mod diferente do valor original.</p>)
        }),

        new LocaleContentAny({
            en: (<p>To ensure that every record is saved on the database instance corresponding to it's new mod value, it is necessary to recalculate the mod value of every ID inside the database. If the new value is different than the previous one, the record need be moved to another database instance.</p>),
            pt: (<p>Para garantir que os registros continuem salvos nas instâncias corretas de banco de dados, considerando o novo valor, é necessário recalcular o valor de mod de todos os IDs dentro do banco de dados. Se o novo valor for diferente do anterior, será necessário migrar o dados para a instância correta.</p>)
        }),

        new LocaleContentAny({
            en: (
                <table>
                    <thead>
                        <tr>
                            <td><b>Input</b></td>
                            <td><b>Hash value</b></td>
                            <td><b>Old distribution (mod 3)</b></td>
                            <td><b>New distribution (mod 4)</b></td>
                            <td><b>Move data?</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>"key_1"</td>
                            <td>22</td>
                            <td>1 = Instance B</td>
                            <td>2 = Instance C</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>"key_2"</td>
                            <td>894</td>
                            <td>0 = Instance A</td>
                            <td>2 = Instance C</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>"key_3"</td>
                            <td>380</td>
                            <td>2 = Instance C</td>
                            <td>0 = Instance A</td>
                            <td>Yes</td>
                        </tr>
                        <tr>
                            <td>"key_4"</td>
                            <td>643</td>
                            <td>1 = Instance B</td>
                            <td>3 = Instance D</td>
                            <td>Yes</td>
                        </tr>
                    </tbody>
                </table>
            ),
            pt: (
                <table>
                    <thead>
                        <tr>
                            <td><b>Input</b></td>
                            <td><b>Hash</b></td>
                            <td><b>Valor mod anterior (mod 3)</b></td>
                            <td><b>Valor mod novo (mod 4)</b></td>
                            <td><b>Alterar instância?</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>"key_1"</td>
                            <td>22</td>
                            <td>1 = Instance B</td>
                            <td>2 = Instance C</td>
                            <td>Sim</td>
                        </tr>
                        <tr>
                            <td>"key_2"</td>
                            <td>894</td>
                            <td>0 = Instance A</td>
                            <td>2 = Instance C</td>
                            <td>Sim</td>
                        </tr>
                        <tr>
                            <td>"key_3"</td>
                            <td>380</td>
                            <td>2 = Instance C</td>
                            <td>0 = Instance A</td>
                            <td>Sim</td>
                        </tr>
                        <tr>
                            <td>"key_4"</td>
                            <td>643</td>
                            <td>1 = Instance B</td>
                            <td>3 = Instance D</td>
                            <td>Sim</td>
                        </tr>
                    </tbody>
                </table>
            )
        }),

        new LocaleContentAny({
            en: (<p>Considering a properly balanced database, changing the divisor requires moving <u>at least 50% entire database</u>, affecting all the database instances, regardless by much the divisor increased or decreased. On the worst cases, the amount of records that would need to be moved can be close to 100% of the entire database.</p>),
            pt: (<p>Considerando um banco com os registros proporcionalmente distribuídos, alterar o divisor fará com que <u>pelo menos 50% dos registros de todo o banco de dados</u> precise mudar para outra instância de banco de dados, afetando todas as instâncias, independente de qual a alteração na quantidade de instâncias. Nos piores casos, a quantidade de movimentações pode chegar a quase 100% dos registros.</p>)
        }),

        new LocaleContentAny({
            en: (<p>As exemplified on a scenario with three database instances:</p>),
            pt: (<p>Como demonstrado em um cenário com três instâncias de banco de dados:</p>)
        }),

        new LocaleContentAny({
            en: (
                <table>
                    <thead>
                        <tr>
                            <td><b>Current instance count</b></td>
                            <td><b>Change</b></td>
                            <td><b>Result instance count</b></td>
                            <td><b>% of records moved</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3</td>
                            <td>Remove 2 instances</td>
                            <td>1</td>
                            <td>66.6%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Remove 1 instance</td>
                            <td>2</td>
                            <td>66.6%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Add 1 instance</td>
                            <td>4</td>
                            <td>75.0%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Add 2 instances</td>
                            <td>5</td>
                            <td>80.0%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Add 3 instances</td>
                            <td>6</td>
                            <td>50.0%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Add 4 instances</td>
                            <td>7</td>
                            <td>85.7%</td>
                        </tr>
                    </tbody>
                </table>
            ),
            pt: (
                <table>
                    <thead>
                        <tr>
                            <td><b>Qntd. inicial de instâncias</b></td>
                            <td><b>Alteração realizada</b></td>
                            <td><b>Qntd. resultante de instâncias</b></td>
                            <td><b>% de registros para movimentar</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3</td>
                            <td>Retirar 2 instâncias</td>
                            <td>1</td>
                            <td>66.6%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Retirar 1 instância</td>
                            <td>2</td>
                            <td>66.6%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Incluir 1 instância</td>
                            <td>4</td>
                            <td>75.0%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Incluir 2 instâncias</td>
                            <td>5</td>
                            <td>80.0%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Incluir 3 instâncias</td>
                            <td>6</td>
                            <td>50.0%</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Incluir 4 instâncias</td>
                            <td>7</td>
                            <td>85.7%</td>
                        </tr>
                    </tbody>
                </table>
            )
        }),
        
        new LocaleContentAny({
            en: (<p>On a real-world scenario, if a database instance A is overloaded, adding a new instance would require moving around records from all the database, not only instance A, which not only is unoptimized, but makes database availability much harder to manage.</p>),
            pt: (<p>Em um cenário do mundo real, se a instância A está sobrecarregada, adicionar uma nova instância precisaria movimentar registros de todo o banco de dados, e não apenas da instância A. Além de não ser um processo otimizado, torna muito mais difícil de administrar a disponibilidade do banco de dados para os sistemas.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Projecting the outcome is also much harder. There's a possibility that after the data migration, one instance end up with most of the high-request records, potentially becoming more overloaded than the previous hotspot.</p>),
            pt: (<p>Estimar o resultado da distribuição também é difícil. Existe a possibilidade de depois dos dados terem sido redistribuidos, alguma instância acabe com um grande volume de registros acessados com alta frequência, potencialmente ficando mais sobrecarregado do que a instância anterior.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Dynamic table mitigates most problems</b></p>),
            pt: (<p><b>Dynamic table mitiga a maioria dos problemas</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Using a dynamic table allows to rearrange only specific hash ranges. There's much more control on how many records would need to be analyzed and rellocated, and how many databases instances will be affected at a time.</p>),
            pt: (<p>Usar uma tabela dinâmica permite especificar quais faixas de hash devem ser reorganizadas. Assim é mais fácil controlar quantos registros precisarão ser analisados e movimentados, quantas instâncias de banco de dados serão impactados.</p>)
        }),

        new LocaleContentAny({
            en: (<p>On the scenario where an instance is overloaded, even if the range is badly chosen and doesn't alleviate a hotspot, there's no risk of increasing the workload of the instance.</p>),
            pt: (<p>Na situação em que uma instância esteja sobrecarregada, mesmo se não escolhermos uma faixa que iria distribuir devidamente o nível de processamento, não haverá o risco de aumentar a sobrecarga da instância.</p>)
        }),
    ]
});