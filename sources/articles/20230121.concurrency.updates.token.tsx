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
            en: (<p>It's common for object-oriented languages to handle database records by creating classes representing the record structure, and loading the data into objects. Eric Evans on his <ExternalLink href="https://en.wikipedia.org/wiki/Domain-driven_design">domain-driven design</ExternalLink> book classifies such classes as Entity classes.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>This way, business rules can be executed against those objects to verify and change their values, so later those changed objects can be persisted to the database with consistency.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Concurrency scenarios</b></p>),
            pt: (<p><b>Execução livre</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>On environments with parallel executions, such as web APIs, a single entity can be requested by multiple threads at the same time, where each thread changes the object data according to the business rules being handled.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>However, trying to persist all the different object instances to a single database record can generate conflicts and data might be overridden, breaking the consistency.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Inconsistency example</b></p>),
            pt: (<p><b>Exemplo de inconsistência</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>The code below demonstrates a scenario where multiple threads try to increment a value on the same entity 10000 times in parallel.</p>),
            pt: (<p></p>)
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
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>On a production environment, this could represent an <u>inconsistency of more than 80% of the operations</u>.</p>),
            pt: (<p></p>)
        }),

        

        new LocaleContentAny({
            en: (<p><b>Making it consistent</b></p>),
            pt: (<p><b>Mantendo a consistência</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Those scenarios require the implementation of a <ExternalLink href="https://en.wikipedia.org/wiki/Concurrency_control">concurrency control</ExternalLink>, so one thread doesn't override the results of the others. There are many concurrency control methods and implementations, each better suited for different scenarios.</p>),
            pt: (<p></p>)
        }),


        new LocaleContentAny({
            en: (<p><b>Commitment ordering</b></p>),
            pt: (<p><b>Commitment ordering</b></p>)
        }),


        new LocaleContentAny({
            en: (<p><ExternalLink href="https://en.wikipedia.org/wiki/Commitment_ordering">Commitment ordering</ExternalLink> is an <ExternalLink href="https://en.wikipedia.org/wiki/Optimistic_concurrency_control">optimistic concurrency control</ExternalLink> method without locks.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Under this method, the object data can only be persisted if the database still contains the same data that created the original object. One way to check this is by versioning the record, where any record update also changes the record version.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Version mismatches can be handled based on the use case. For example, if the function is triggered by users, it's possible to throw an error to them informing that the source data has changed and refresh the data displayed, so they can analyze if the function should still be executed over the new set of data.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>This is a fairly easy concurrency control solution for distributed or containerized systems, where the use of external locks can become tricky.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Implementation</b></p>),
            pt: (<p><b>Implementação</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Some databases and libraries already offer support for commitment ordering. For example, the <ExternalLink href="https://www.microsoft.com/en-us/sql-server/">SQL Server</ExternalLink> database offer a column type <ExternalLink href="https://learn.microsoft.com/en-us/sql/t-sql/data-types/rowversion-transact-sql?view=sql-server-ver16">rowversion</ExternalLink>, and the ORM library <ExternalLink href="https://learn.microsoft.com/en-us/aspnet/entity-framework">Entity Framework</ExternalLink> has <ExternalLink href="https://learn.microsoft.com/en-us/ef/core/saving/concurrency?tabs=fluent-api#optimistic-concurrency">concurrency tokens</ExternalLink>. However, the logic is not hard to implement on most SQL databases.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>The example below demonstrates a simplified implementation, handling mismatches by simply restarting the process from scratch and reloading all the entities with the most up-to-date data.</p>),
            pt: (<p></p>)
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
            en: (<p>The <u>IncrementalValue</u> correctly ends up with 10000. However, this handling strategy is best suited for situations where only a small amount of threads try update the same entity in parallel, otherwise the continuous retries can become computationaly expensive. For this demonstration alone, each thread had to be executed on average 9 times before a successful update happened.</p>),
            pt: (<p></p>)
        }),
    ]
});