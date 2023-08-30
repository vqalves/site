import Link from "next/link";
import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import ExternalLink from "../../components/external.link";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";
import { IOAsyncProgramming20221231 } from "./20221231.io.async.programming";

export const YieldIEnumerable20230826 = new Article({
    code: "230826",
    date: new ArticleDate(2023, 8, 26),
    
    title: new LocaleContentText({
        en: "[C#] The power of IEnumerable and Yield",
        pt: "[C#] O poder do IEnumerable e Yield"
    }),

    description: new LocaleContentText({
        en: "Yielding results on demand is a powerful tool to reduce memory consumption",
        pt: "Retornar resultados sob demanda com yield é uma grande forma de reduzir consumo de memória"
    }),

    slug: new LocaleContentText({
        en: "ienumerable-and-yield",
        pt: "ienumerable-e-yield"
    }),

    tags: [ArticleTag.concept, ArticleTag.csharp, ArticleTag.codeSnippet, ArticleTag.explanation],

    getContent: () => [
        new LocaleContentAny({
            en: (<p><ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.collections.ienumerable?view=net-7.0">IEnumerable</ExternalLink> is an interface that represents a set of data that can be evaluated item by item, forward-only, similarly to a stream.</p>),
            pt: (<p><ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.collections.ienumerable?view=net-7.0">IEnumerable</ExternalLink> é uma interface que representa um conjunto de dados que podem ser lidos item por item, podendo apenas percorrer para frente de forma similar a um stream.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Native collections, such as <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/">array</ExternalLink> and <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=net-7.0">List&lt;T&gt;</ExternalLink>, already implement the IEnumerable interface for its easiness of use.</p>),
            pt: (<p>Coleções nativas do .NET, como <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/programming-guide/arrays/">array</ExternalLink> e <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.collections.generic.list-1?view=net-7.0">List&lt;T&gt;</ExternalLink>, por padrão já implementam IEnumerable pela facilidade de uso.</p>)
        }),

        new LocaleContentAny({
            en: (<p>IEnumerable instances are frequently consumed on a <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/iteration-statements#the-foreach-statement">foreach</ExternalLink> statement.</p>),
            pt: (<p>Instâncias de IEnumerable costumam ser consumidas por <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/language-reference/statements/iteration-statements#the-foreach-statement">foreach</ExternalLink>.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`IEnumerable<string> items = new string[] { "stub" };

foreach(string item in items)
    Console.WriteLine(item.ToLower());
`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=net-7.0">System.Linq</ExternalLink> offer some <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods">extension methods</ExternalLink> to facilitate manipulating an IEnumerable, such as <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.count?view=net-7.0">Count()</ExternalLink> to calculate the amount of items, <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.select?view=net-7.0">Select()</ExternalLink> to generate a new object for each item and <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.sum?view=net-7.0">Sum()</ExternalLink> to execute a summation of all the items in the set.</p>),
            pt: (<p><ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.linq.enumerable?view=net-7.0">System.Linq</ExternalLink> disponibiliza alguns <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/programming-guide/classes-and-structs/extension-methods">extension methods</ExternalLink> para facilitar o uso do IEnumerable, como por exemplo o <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.linq.enumerable.count?view=net-7.0">Count()</ExternalLink> para calcular quantos itens existe no conjunto, <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.linq.enumerable.select?view=net-7.0">Select()</ExternalLink> para gerar um novo objeto para cada item do conjunto e <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.linq.enumerable.sum?view=net-7.0">Sum()</ExternalLink> para fazer a somatória de todos os itens de um conjunto.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`using System.Linq;

var items = new int[] { 1, 2, 3 };
var summation = items.Sum();
`}></CodeBlock>),
    
        new LocaleContentAny({
            en: (<p>Under the hood, an IEnumerable is enumerated through the <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.collections.ienumerator?view=net-7.0">IEnumerator</ExternalLink> it generates, which can be consumed manually.</p>),
            pt: (<p>Por baixo dos panos, um IEnumerable é percorrido através de um <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.collections.ienumerator?view=net-7.0">IEnumerator</ExternalLink> gerado por ele, que pode ser consumido manualmente.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`IEnumerable<string> items = new string[] { "stub" };

using(IEnumerator<string> enumerator = items.GetEnumerator())
    while(enumerator.MoveNext())
        Console.WriteLine(enumerator.Current.ToLower());`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>IEnumerable can also be the return type of <ExternalLink href="https://en.wikipedia.org/wiki/Generator_(computer_programming)">generator functions</ExternalLink>, where the data is generated on the fly instead of loading all in memory.</p>),
            pt: (<p>IEnumerable também pode ser retornado como resultado de uma <ExternalLink href="https://pt.wikipedia.org/wiki/Gerador_(ci%C3%AAncia_da_computa%C3%A7%C3%A3o)">função geradora</ExternalLink>, aonde os dados são gerados durante a execução, e não precisam ser carregados todos em memória logo no começo.</p>)
        }),

        new LocaleContentAny({
            en: (<p>On C#, a generator function can be written by using the <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/yield">yield</ExternalLink> keyword.</p>),
            pt: (<p>No C#, uma função geradora pode ser escrita usando <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/language-reference/statements/yield">yield</ExternalLink>.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Such functions are particularly useful to process a data source without loading the entire data set into memory first, allowing the creation of algorithms that consume constant memory - <ExternalLink href="https://en.wikipedia.org/wiki/Big_O_notation">O(1)</ExternalLink> - while evaluating the function.</p>),
            pt: (<p>Funções geradoras são úteis para processar dados sem precisar de um carregamento inicial de todos os items. Isso possibilita a criação de algoritmos com consumo constante de memória - <ExternalLink href="https://pt.wikipedia.org/wiki/Grande-O">O(1)</ExternalLink> - enquanto a função é executada.</p>)
        }),

        new LocaleContentAny({
            en: (<p>The example below demonstrates one way to create a generator function that can read .csv files of any size, by returning values of line by line.</p>),
            pt: (<p>O exemplo abaixo demonstra uma forma de criar uma função geradora capaz de ler um arquivo .csv de qualquer tamanho por retornar o conteúdo linha por linha.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public static IEnumerable<string> EnumerateLinesOfFile()
{
    using (var reader = new StreamReader("file.csv"))
        while (!reader.EndOfStream)
            yield return reader.ReadLine();
}

static void Main(string[] args)
{
    var lineCount = EnumerateLinesOfFile().Count();
    var message = $"The file has {lineCount} lines";
    Console.WriteLine(message);
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>Another useful scenario is processing a SQL query with a big resulting data set, which can be iterated without loading everything into memory.</p>),
            pt: (<p>Outro cenário prático é o processamento do resultado de uma consulta SQL que retorna muitos dados, que podem ser percorridos sem necessidade de carregar todos os dados de uma vez.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Note that the connection is kept open while the loop is running, and is only closed when the IEnumerator is <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.idisposable.dispose?view=net-7.0">disposed</ExternalLink> implicitly (at the end of the foreach loop) or explicitly (manually or by the <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/using">using</ExternalLink> statement).</p>),
            pt: (<p>Importante notar que a conexão permanece aberta enquanto o loop está executando, e só será fechado quando o IEnumerable sofrer <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.idisposable.dispose?view=net-7.0">Dispose()</ExternalLink>, seja implicito (no fim de um foreach) ou explícito (via <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/language-reference/statements/using">using</ExternalLink> ou manualmente).</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public IEnumerable<string> EnumerateFromDatabase()
{
    using(var connection = new SqlConnection("<connection_string>"))
    using(var command = connection.CreateCommand())
    {
        command.CommandText = "<select>";

        connection.Open();
        using (var reader = command.ExecuteReader())
            while(reader.Read())
                yield return reader[0].ToString();
    }
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>Generator functions only begin to run when the IEnumerable starts to be evaluated, for example by using the foreach or an IEnumerator. Some Linq functions, such as <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.count?view=net-7.0">Count()</ExternalLink>, <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.firstordefault?view=net-7.0">FirstOrDefault()</ExternalLink> and <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.tolist?view=net-7.0">ToList()</ExternalLink> also enumerate the function.</p>),
            pt: (<p>Funções geradoras só começam sua execução quando o IEnumerable começa a ser percorrido, por exemplo quando um foreach é executado ou através do IEnumerator. Algumas funções Linq, como <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.linq.enumerable.count?view=net-7.0">Count()</ExternalLink>, <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.linq.enumerable.firstordefault?view=net-7.0">FirstOrDefault()</ExternalLink> e <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.linq.enumerable.tolist?view=net-7.0">ToList()</ExternalLink> também executam a função.</p>)
        }),

        new LocaleContentAny({
            en: (<p>It is important to note that some Linq functions behave as generator functions and are not immediately evaluated when called, such as <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.select?view=net-7.0">Select()</ExternalLink> and <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.where?view=net-7.0">Where()</ExternalLink>, regardless if it was called on top of an on-the-fly IEnumerable or an in-memory collection.</p>),
            pt: (<p>Importante notar que algumas funções Linq são funções geradoras e não são imediatamente executadas quando invocadas, por exemplo <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.linq.enumerable.select?view=net-7.0">Select()</ExternalLink> e <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.linq.enumerable.where?view=net-7.0">Where()</ExternalLink>. Não há diferença se essas funções forem executados em cima de um IEnumerable de função geracional ou uma coleção carregada em memória.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Another less common option is to create infinitely evaluatable functions, which can be interrupted by using the <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/jump-statements#the-break-statement">break</ExternalLink> statement, or limiting Linq functions such as <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.first?view=net-7.0">First()</ExternalLink> or <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.take?view=net-7.0">Take()</ExternalLink>.</p>),
            pt: (<p>Outra opção menos comum é a criação de uma função que pode ser infinitamente executada, e que pode ser interrompida por <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/language-reference/statements/jump-statements#the-break-statement">break</ExternalLink> ou algum método limitador do Linq, como <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.linq.enumerable.first?view=net-7.0">First()</ExternalLink> ou <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.linq.enumerable.take?view=net-7.0">Take()</ExternalLink>.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`/// <summary>Function that generate Fibonacci numbers</summary>
static IEnumerable<int> Fibonacci()
{
    int value1 = 1;
    int value2 = 1;

    yield return value1;
    yield return value2;

    while (true)
    {
        int aux = value2;
        value2 += value1;
        value1 = aux;

        yield return value2;
    }
}

static void Main(string[] args)
{
    // Take the 10th number of fibonacci = 55
    var fibonacciTenth = Fibonacci().Skip(9).First();

    // Sum the 5 first numbers = 12
    var sumFirstFive = Fibonacci().Take(5).Sum();

    // Throws exception, because the function evaluation is infinite
    var allFibonacciNumbers = Fibonacci().ToList();
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>C# 8.0 also offers an <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.iasyncenumerable-1?view=net-7.0">IAsyncEnumerable</ExternalLink> interface for generator functions with asynchronous capabilities. <Link href={IOAsyncProgramming20221231.getRoute()}>This link leads to an article about asynchrony.</Link></p>),
            pt: (<p>C# 8.0 também introduziu a interface <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.collections.generic.iasyncenumerable-1?view=net-7.0">IAsyncEnumerable</ExternalLink> para funções geradoras com assincronia. <Link href={IOAsyncProgramming20221231.getRoute()}>Este link leva a um artigo escrito sobre assincronia.</Link></p>)
        }),

        new LocaleContentAny({
            en: (<p>Linq methods can be used on IAsyncEnumerable by adding the officially supported package <ExternalLink href="https://www.nuget.org/packages/System.Linq.Async">System.Linq.Async</ExternalLink>.</p>),
            pt: (<p>Para executar métodos Linq em IAsyncEnumerable é necessário adicionar o pacote <ExternalLink href="https://www.nuget.org/packages/System.Linq.Async">System.Linq.Async</ExternalLink> no projeto. Esse pacote é oficialmente suportado pela Microsoft.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`// Generator function with async
public async IAsyncEnumerable<string> EnumerateLinesAsync()
{
    using(var reader = new StreamReader("path.csv"))
        while(!reader.EndOfStream)
            yield return await reader.ReadLineAsync();
}`}></CodeBlock>),

LocaleContentAny.all(<CodeBlock
    language={CodeBlockLanguage.csharp}
    code={`// Consuming an IAsyncEnumerable
await foreach(var line in EnumerateLinesAsync())
{
    Console.WriteLine(line);
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>Note that the IAsyncEnumerable interface is only available on .NET Standard 2.1, .NET Core 3.0 and newer versions, and is not available on .NET Framework at the moment (currently 4.8).</p>),
            pt: (<p>Importante notar que a interface IAsyncEnumerable só está disponível a partir do .NET Standard 2.1 ou .NET Core 3.0, e não está disponível no .NET Framework (atualmente na versão 4.8).</p>)
        }),

        new LocaleContentAny({
            en: (<p>Using the IAsyncEnumerable is the recommended way to write asynchronous generator functions. It is not trivial to keep the asynchronicity while wrapping around a basic IEnumerable, since IEnumerator executes <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.collections.ienumerator.movenext?view=net-7.0">MoveNext()</ExternalLink> as a blocking method.</p>),
            pt: (<p>Usar IAsyncEnumerable é a forma recomendada de escrever funções geradoras assíncronas. Não é trivial tentar implementar um IEnumerable com capacidades de assincronia, pois durante a execução o IEnumerator chama o método <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.collections.ienumerator.movenext?view=net-7.0">MoveNext()</ExternalLink>, que é um método bloqueante e impede os benefícios da assincronia.</p>)
        }),        
    ]
});