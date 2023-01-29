import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import ExternalLink from "../../components/external.link";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";

export const ConcurrencyUpdatesToken230121 = new Article({
    code: "230121",
    date: new ArticleDate(2023, 1, 21),
    
    title: new LocaleContentText({
        en: "[Concept] Commitment ordering",
        pt: "[Conceito] Commitment ordering"
    }),

    description: new LocaleContentText({
        en: "Avoiding overrides and conflicts when updating entity objects on environments with concurrency",
        pt: "Evitando sobreescritas e conflitos ao atualizar objetos de entidade em ambientes com concorrência"
    }),

    slug: new LocaleContentText({
        en: "commitment-ordering",
        pt: "commitment-ordering"
    }),

    tags: [ArticleTag.concept, ArticleTag.csharp],

    getContent: () => [
        new LocaleContentAny({
            en: (<p>It's common for object-oriented languages to handle database records by creating classes and loading objects representing the database structure. Eric Evans on his <ExternalLink href="https://en.wikipedia.org/wiki/Domain-driven_design">domain-driven design</ExternalLink> book classifies such classes as Entity classes.</p>),
            pt: (<p>Linguagens orientadas a objetos costumam gerenciar registros de banco de dados através classes e objetos que representam a estrutura do banco. Eric Evans, em seu livro de <ExternalLink href="https://en.wikipedia.org/wiki/Domain-driven_design">domain-driven design</ExternalLink>, classifica estas classes como classes de Entidade.</p>)
        }),

        new LocaleContentAny({
            en: (<p>This way, business rules can be executed against those objects to verify and change their values, so later those changed objects can be persisted to the database with consistency.</p>),
            pt: (<p>Assim, regras de negócios podem usar esses objetos para fazer checagens e alterar seus valores, e posteriormente os novos dados podem ser persistidos no banco de dados de uma forma consistente.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Concurrency scenarios</b></p>),
            pt: (<p><b>Cenários com concorrência</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>On environments with parallel executions, such as web APIs, a single entity can be requested by multiple threads at the same time, where each thread changes the object data according to the business rules being handled.</p>),
            pt: (<p>Em ambientes com execuções em paralelismo, como web APIs, um única entidade pode ser acessada por múltiplas threads ao mesmo tempo, carregando objetos distintos, sendo que cada thread pode alterar os valores do seu objeto de acordo com a regra de negócio correspondente.</p>)
        }),

        new LocaleContentAny({
            en: (<p>However, trying to persist all the different object instances to a single database record can generate conflicts and data might be overridden, breaking the consistency.</p>),
            pt: (<p>Porém, tentar persistir todos os objetos dessa entidade em um único registro do banco de dados pode gerar conflitos e dados podem ser sobreescritos, quebrando a consistência.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Inconsistency example</b></p>),
            pt: (<p><b>Exemplo de inconsistência</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>The code below demonstrates a scenario where multiple threads try to increment a value on the same entity 10000 times in parallel.</p>),
            pt: (<p>O código abaixo demonstra um cenário aonde diversas threads tentam incrementar o valor de uma única entidade 10.000 vezes em paralelo.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`var userId = 1;

// Setup
var userRepository = new UserRepository();
var parallelOptions = new ParallelOptions() 
{ 
    MaxDegreeOfParallelism = 10 
};

// Execution
Parallel.For(0, 10_000, parallelOptions, (attempt) => 
{
    var user = userRepository.GetByID(userId);
    user!.IncrementalValue++;

    userRepository.Update(user);
});`}></CodeBlock>),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`// UserRepository Class
public void Update(User user)
{
    using(var conn = new MySqlConnection(ConnectionString))
    using(var command = conn.CreateCommand())
    {
        command.CommandText = "UPDATE User SET IncrementalValue = @IncrementalValue WHERE ID = @ID;";
        command.Parameters.AddWithValue("@ID", user.ID);
        command.Parameters.AddWithValue("@IncrementalValue", user.IncrementalValue);

        conn.Open();
        command.ExecuteNonQuery();
    }
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>Since each execution incremented the value by 1, the expectation is that after 10000 runs the <u>IncrementalValue</u> should end up with 10000. But since the UPDATE function just blindly overrides the data on a high-concurrency scenario, in practice the value is likely much less, sometimes being less than 2000 on some test runs.</p>),
            pt: (<p>Como cada execução incrementa o valor em 1, é esperado que depois de 10.000 execuções o <u>IncrementalValue</u> esteja com 10.000. Mas como a função UPDATE apenas sobreescreve os dados cegamente em um cenário de alta concorrência, na prática o valor final será muito menor, em alguns testes chegando a valores menores que 2.000.</p>)
        }),

        new LocaleContentAny({
            en: (<p>On a production environment, this could represent an <u>inconsistency of more than 80% of the operations</u>.</p>),
            pt: (<p>Em um ambiente de produção, isso indica que potencialmente <u>80% das operações gerem resultados inconsistentes</u>.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Making it consistent</b></p>),
            pt: (<p><b>Mantendo a consistência</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Those scenarios require the implementation of a <ExternalLink href="https://en.wikipedia.org/wiki/Concurrency_control">concurrency control</ExternalLink>, so one thread doesn't override the results of the others.</p>),
            pt: (<p>Este tipo de cenário precisa implementar algum tipo de <ExternalLink href="https://en.wikipedia.org/wiki/Concurrency_control">controle de concorrência</ExternalLink>, de forma que uma thread não sobreescreva os resultados das demais</p>)
        }),

        new LocaleContentAny({
            en: (<p>A popular way to avoid concurrency is by using <ExternalLink href="https://en.wikipedia.org/wiki/Lock_(computer_science)">locks</ExternalLink>, so one thread cannot use a resource or access a code snippet while another process is locking it.</p>),
            pt: (<p>Uma forma popular de evitar concorrências é através do uso de <ExternalLink href="https://en.wikipedia.org/wiki/Lock_(computer_science)">locks</ExternalLink>. Assim uma thread não pode utilizar um recurso, ou acessar um trecho de código, enquanto outro processo mantiver um lock nele. </p>)
        }),

        new LocaleContentAny({
            en: (<p>However, locking does have a few drawbacks, such as requiring a <ExternalLink href="https://en.wikipedia.org/wiki/Deadlock">deadlock</ExternalLink> management, proper granularity to avoid excess <ExternalLink href="https://stackoverflow.com/questions/1970345/what-is-thread-contention">contention</ExternalLink>, and <ExternalLink href="https://en.wikipedia.org/wiki/Fault_tolerance">fault-tolerance</ExternalLink> on distributed systems scenarios.</p>),
            pt: (<p>Porém, locks oferecem algumas desvantagens, como a necessidade de gestão de <ExternalLink href="https://pt.wikipedia.org/wiki/Deadlock">deadlocks</ExternalLink>, granularidade eficiente para evitar excesso de <ExternalLink href="https://stackoverflow.com/questions/1970345/what-is-thread-contention">contenção</ExternalLink> e <ExternalLink href="https://pt.wikipedia.org/wiki/Toler%C3%A2ncia_%C3%A0_falha">tolerância à falhas</ExternalLink> em cenários com sistemas distribuídos.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Besides lock, there are many other concurrency control methods and implementations, each better suited for different scenarios.</p>),
            pt: (<p>Além do lock, existem diversas outras formas e implementações de controle de concorrência, aonde cada solução é mais apropriada para diferentes tipos de cenários.</p>)
        }),


        new LocaleContentAny({
            en: (<p><b>Commitment ordering</b></p>),
            pt: (<p><b>Commitment ordering</b></p>)
        }),


        new LocaleContentAny({
            en: (<p><ExternalLink href="https://en.wikipedia.org/wiki/Commitment_ordering">Commitment ordering</ExternalLink> is an <ExternalLink href="https://en.wikipedia.org/wiki/Optimistic_concurrency_control">optimistic concurrency control</ExternalLink> method without locks.</p>),
            pt: (<p><ExternalLink href="https://en.wikipedia.org/wiki/Commitment_ordering">Commitment ordering</ExternalLink> é um método de <ExternalLink href="https://en.wikipedia.org/wiki/Optimistic_concurrency_control">controle de concorrência otimista</ExternalLink> sem uso de locks.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Under this method, the object data can only be persisted if the database still contains the same data that created the original object. One way to check this is by versioning the record, where any record update also changes the record version.</p>),
            pt: (<p>Neste método, um objeto só pode ser persistido se o banco de dados ainda estiver com os mesmos dados que foram utilizados para criar o objeto. Uma forma de realizar essa verificação é através do versionamento do registro, em que qualquer atualização do registro também deve alterar a versão dele.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Version mismatches can be handled based on the use case. For example, if the function is triggered by users, it's possible to throw an error to them informing that the source data has changed and refresh the data displayed, so they can analyze if the function should still be executed over the new set of data.</p>),
            pt: (<p>Quando ocorre uma falha por divergência de versão, o tratamento pode ser feito baseado no caso de uso. Por exemplo, se a função é disparada por usuários, seria possível emitir um erro indicando que os dados originais foram alterados e recarregar os dados exibidos. Dessa forma, o usuário pode decidir se ainda faz sentido executar a função em cima do novo conjunto de dados.</p>)
        }),

        new LocaleContentAny({
            en: (<p>This is a fairly easy concurrency control solution for distributed or containerized systems, where the use of external locks can become tricky.</p>),
            pt: (<p>Esta é uma solução de controle de concorrência relativamente simples para ser implementado em sistemas distribuidos ou containerizados, aonde o uso de locks externos pode ser complexo.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Implementation</b></p>),
            pt: (<p><b>Implementação</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Some databases and libraries already offer support for commitment ordering. For example, the <ExternalLink href="https://www.microsoft.com/en-us/sql-server/">SQL Server</ExternalLink> database offer a column type <ExternalLink href="https://learn.microsoft.com/en-us/sql/t-sql/data-types/rowversion-transact-sql?view=sql-server-ver16">rowversion</ExternalLink>, and the ORM library <ExternalLink href="https://learn.microsoft.com/en-us/aspnet/entity-framework">Entity Framework</ExternalLink> has <ExternalLink href="https://learn.microsoft.com/en-us/ef/core/saving/concurrency?tabs=fluent-api#optimistic-concurrency">concurrency tokens</ExternalLink>. However, the logic is not hard to implement on most SQL databases.</p>),
            pt: (<p>Alguns bancos de dados e bibliotecas já oferecem funcionalidades de commit ordering. Por exemplo, o <ExternalLink href="https://www.microsoft.com/pt-br/sql-server/">SQL Server</ExternalLink> possui o tipo de coluna <ExternalLink href="https://learn.microsoft.com/pt-br/sql/t-sql/data-types/rowversion-transact-sql?view=sql-server-ver16">rowversion</ExternalLink> e a biblioteca de ORM <ExternalLink href="https://learn.microsoft.com/pt-br/aspnet/entity-framework">Entity Framework</ExternalLink> possui <ExternalLink href="https://learn.microsoft.com/pt-br/ef/core/saving/concurrency?tabs=fluent-api#optimistic-concurrency">concurrency tokens</ExternalLink>. Mesmo assim, a lógica não é difícil de implementar na maioria dos bancos SQL.</p>)
        }),

        new LocaleContentAny({
            en: (<p>The example below demonstrates a simplified implementation, handling mismatches by simply restarting the process from scratch and reloading all the entities with the most up-to-date data.</p>),
            pt: (<p>O exemplo abaixo demonstra uma implementação simplificada, adotando a estratégia de, quando houver um conflito de versão, deve reiniciar o processo do começo, recarregando todos os objetos com os dados mais recentes.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`var userId = 1;

// Setup
var userRepository = new UserRepository();
var parallelOptions = new ParallelOptions() 
{ 
    MaxDegreeOfParallelism = 10 
};

// Execution
Parallel.For(0, 10_000, parallelOptions, (attempt) => 
{
    var successful = false;

    do
    {
        var user = repo.GetByID(id);
        user!.IncrementalValue++;

        successful = repo.TryUpdateWithToken(user);
    } while(!successful);
});`}></CodeBlock>),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`// UserRepository Class
public bool TryUpdateWithToken(User user)
{
    var newVersion = Guid.NewGuid();

    using(var conn = new MySqlConnection(ConnectionString))
    using(var command = conn.CreateCommand())
    {
        command.CommandText = "UPDATE User SET total = @total, version = @newVersion WHERE id = @id AND version = @oldVersion;";
        command.Parameters.AddWithValue("@id", user.ID);
        command.Parameters.AddWithValue("@total", user.IncrementalValue);
        command.Parameters.AddWithValue("@oldVersion", user.Version);
        command.Parameters.AddWithValue("@newVersion", newVersion);

        conn.Open();
        var changedRowCount = command.ExecuteNonQuery();
        var hasChanged = changedRowCount > 0;

        if(hasChanged)
            user.Version = newVersion;

        return hasChanged;
    }
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>After the execution, the <u>IncrementalValue</u> correctly ends up with 10000. However, this handling strategy is best suited for situations where only a small amount of threads try update the same entity in parallel, otherwise the continuous retries can become computationaly expensive.</p>),
            pt: (<p>Após a execução, o <u>IncrementalValue</u> corretamente termina com o valor 10.000. Porém, esta estratégia de tratamento é mais adequada para situações aonde apenas uma pequena quantidade de threads tenta atualizar a mesma entidade. Caso contrário, as repetidas tentativas de atualização podem ser computacionalmente caras.</p>)
        }),

        new LocaleContentAny({
            en: (<p>For this demonstration alone, each iteration triggered 9 version mismatches on average before finally being able to execute a successful update, so the UPDATE function was executed around 90000 times.</p>),
            pt: (<p>Para esta demonstração, em média cada iteração passou por 9 divergências de versão antes de conseguir atualizar o registro com sucesso, o que totaliza cerca de 90.000 tentativas de execução de UPDATE.</p>)
        }),
    ]
});