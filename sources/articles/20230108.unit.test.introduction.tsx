import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import ExternalLink from "../../components/external.link";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";

export const UnitTestIntroduction230108 = new Article({
    code: "230108",
    date: new ArticleDate(2023, 1, 8),
    
    title: new LocaleContentText({
        en: "[C#] Introduction to unit testing",
        pt: "[C#] Introdução ao teste unitário"
    }),

    description: new LocaleContentText({
        en: "How to implement unit testing on C#",
        pt: "Como implementar testes unitários em C#"
    }),

    slug: new LocaleContentText({
        en: "csharp-unit-testing-introduction",
        pt: "csharp-introducao-teste-unitario"
    }),

    tags: [ArticleTag.concept, ArticleTag.csharp],

    getContent: () => [
        new LocaleContentAny({
            en: (<p>Unit testing is a method of writing <ExternalLink href="https://en.wikipedia.org/wiki/Test_automation">automated tests</ExternalLink> to ensure a segment of code is producing the expected results. It can be used regardless of development process, and is at the core of <ExternalLink href="https://en.wikipedia.org/wiki/Test-driven_development">test-driven development</ExternalLink>.</p>),
            pt: (<p>Teste unitário é um estilo de <ExternalLink href="https://pt.wikipedia.org/wiki/Automa%C3%A7%C3%A3o_de_teste">teste automatizado</ExternalLink> para assegurar que um trecho de código está produzindo os resultados esperados. Testes unitários podem ser usados em qualquer processo de desenvolvimento, e está na base do <ExternalLink href="https://pt.wikipedia.org/wiki/Test-driven_development">test-driven development</ExternalLink>.</p>)
        }),

        new LocaleContentAny({
            en: (<p>A unit test should not rely on external resources, such as databases, APIs or hard drive files - by definition, a test that validates multiple parts working together is called <ExternalLink href="https://en.wikipedia.org/wiki/Integration_testing">integration test</ExternalLink>.</p>),
            pt: (<p>Um teste unitário não deve consumir recursos externos, como banco de dados, APIs ou disco rígido - por definição, um teste que valida múltiplas partes trabalhando em conjunto é chamado de <ExternalLink href="https://pt.wikipedia.org/wiki/Teste_de_integra%C3%A7%C3%A3o">teste de integração</ExternalLink>.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Structure</b></p>),
            pt: (<p><b>Estrutura</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>
                    <div>An unit test can be expressed in three parts, also known as triple A:</div>
                    <div>- <u>Arrange</u>: Initialize objects, resources and variables required to execute the test</div>
                    <div>- <u>Act</u>: Execute the function tested</div>
                    <div>- <u>Assert</u>: Verify if the execution produced the expected results</div>
                </p>),
            pt: (<p>
                <div>Um teste unitário pode ser expressado em três partes, também chamado de triplo A:</div>
                <div>- <u>Arranjar (<i>arrange</i>)</u>: Inicialização de objetos, recursos e variáveis necessárias para executar o teste</div>
                <div>- <u>Agir (<i>act</i>)</u>: Execução da função testada</div>
                <div>- <u>Assertar (<i>assert</i>)</u>: Verificar se a função testada gerou os resultados esperados</div>
            </p>)
        }),

        new LocaleContentAny({
            en: (<p>While there are many situations and approaches involving the writing of unit tests, below are some basic approaches implemented using the <ExternalLink href="https://www.nuget.org/packages/NUnit/">NUnit library</ExternalLink>.</p>),
            pt: (<p>Existem múltiplos cenários e estratégias diferentes na escrita de testes unitários. Abaixo estão algumas implementações básicas usando a <ExternalLink href="https://www.nuget.org/packages/NUnit/">biblioteca NUnit</ExternalLink>.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Example 1 - Testing the output</b></p>),
            pt: (<p><b>Exemplo 1 - Testando o output</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Executing a method should return an output consistent with the inputs. For example, an <a href="https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods">extension method</a> <i>StandardDeviation</i> should calculate the <ExternalLink href="https://en.wikipedia.org/wiki/Standard_deviation">standard deviation</ExternalLink> of a set of values.</p>),
            pt: (<p>O método executado deve retornar um output consistente com os parâmetros. Por exemplo, um <a href="https://learn.microsoft.com/pt-br/dotnet/csharp/programming-guide/classes-and-structs/extension-methods">extension method</a> <i>StandardDeviation</i> deve calcular o <ExternalLink href="https://pt.wikipedia.org/wiki/Desvio_padr%C3%A3o">desvio padrão</ExternalLink> de um conjunto de valores.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`[Test]
public void StandardDeviation_CorrectValue()
{
    // Arrange
    var values = new int[] { 1, 1, 1, 2 };
    
    // Act
    var result = values.StandardDeviation();

    // Assert
    Assert.AreEqual(0.5, result);
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>The test written used simple decimal numbers, but for other scenarios, applying a <ExternalLink href="https://docs.nunit.org/articles/nunit/writing-tests/attributes/defaultfloatingpointtolerance.html">float point tolerance</ExternalLink> might be necessary.</p>),
            pt: (<p>O teste escrito usa números decimais simples, mas em outros cenários pode ser necessário aplicar uma <ExternalLink href="https://docs.nunit.org/articles/nunit/writing-tests/attributes/defaultfloatingpointtolerance.html">tolerância para o ponto flutuante</ExternalLink>.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Example 2 - Testing the state</b></p>),
            pt: (<p><b>Exemplo 2 - Testando o estado</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Executing a method can change a state. For example, a class DistinctList has the ability to add values, discarding any duplicated value, and every successful insert changes the element count.</p>),
            pt: (<p>O método executado pode alterar algum estado. Por exemplo, a classe DistinctList permite adicionar valores, ignorando valores duplicados, e todas as inclusões válidas alteram a contagem de elementos.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`[TestCase(new int[] { }, 0)]
[TestCase(new int[] { 0 }, 1)]
[TestCase(new int[] { 0, 0 }, 1)]
[TestCase(new int[] { 0, 1 }, 2)]
public void DistinctList_AddDuplicated_ChangesCount(int[] values, int expectedCount)
{
    // Arrange
    var list = new DistinctList<int>();
    
    // Act
    foreach(var value in values)
        list.Add(value);

    // Assert
    var count = list.Count();
    Assert.AreEqual(expectedCount, count);
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>This test checks the state on different scenarios: when there are no inserts, single inserts, duplicated inserts and non-duplicated inserts.</p>),
            pt: (<p>Este teste verifica o valor de Count em diferentes cenários: quando não ocorre inserção, quando ocorre apenas uma inserção, quando ocorre inserção de valor duplicado e quando ocorre inserção de múltiplos valores.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Example 3 - Testing method call</b></p>),
            pt: (<p><b>Exemplo 3 - Testando chamada de método</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Certain functionalities should only be triggered under specific conditions. For example, an AuthenticationService should only send an e-mail if the user has an e-mail address.</p>),
            pt: (<p>Certas funcionalidades só devem ser disparadas em determinadas condições. Por exemplo, um AuthenticationService só deve enviar um e-mail quando o usuário possuir um endereço de e-mail.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`[TestCase(null, 0)]
[TestCase("test@test.com", 1)]
public void DistinctList_AddDuplicated_ChangesCount(string? email, int emailsSent)
{
    // Arrange
    var mockService = new EmailServiceCount();
    var user = new User(email);

    IEmailService emailService = mockService;
    var authService = new AuthenticationService(emailService);

    // Act
    authService.Approve(user);

    // Assert
    Assert.AreEqual(emailsSent, mockService.EmailsSent);
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>For this scenario, we <ExternalLink href="https://en.wikipedia.org/wiki/Mock_object">mock</ExternalLink> the EmailService, implementing the <i>Send</i> method to count how many times it was called, without actually trying to send an e-mail. Mocking can be done manually, like demonstrated below, or using a mocking library such as <ExternalLink href="https://www.nuget.org/packages/moq/">moq</ExternalLink>.</p>),
            pt: (<p>Neste cenário, foi usado um <ExternalLink href="https://pt.wikipedia.org/wiki/Objeto_mock">mock</ExternalLink> do EmailService. Neste mock, o <i>Send</i> apenas contabiliza quantas vezes a função foi chamada, sem tentar enviar um e-mail. Mocking pode ser feito manualmente, como no trecho abaixo, ou usando uma biblioteca de mocking como o <ExternalLink href="https://www.nuget.org/packages/moq/">moq</ExternalLink>.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public class EmailServiceCount : IEmailService
{
    public int EmailsSent { get; private set; } = 0;

    public void Send(MailMessage email)
    {
        EmailsSent++;
    }
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><b>Creation and maintenance</b></p>),
            pt: (<p><b>Criação e manutenção</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Automated test libraries are usually free, but it takes time and effort from developers to write and maintain the tests implemented on a software.</p>),
            pt: (<p>Bibliotecas de teste automatizados costumam ser gratuítas, mas é necessário tempo e esforço dos desenvolvedores para escrever e realizar manutenção nestes testes.</p>)
        }),

        new LocaleContentAny({
            en: (<p>However, implementing it usually pays off by detecting bugs earlier, ensuring proper implementation of new features, exposing errors when changing existing features, and making a software overall more predictable and reliable.</p>),
            pt: (<p>Porém, implementar testes normalmente costumam valer a pena, pois é possível detectar bugs mais rápido, garantir que novas funcionalidades sejam implementadas corretamente, expor erros quando ocorrem modificações em funcionalidades existentes, e no geral deixam o software mais previsível e confiável.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Automated testing is not a feature that has to replace human-testing or cover 100% of the code base. Implementing tests on the core features might be enough to reap it's benefits and optimize the <ExternalLink href="https://en.wikipedia.org/wiki/Software_quality_assurance">quality assurance</ExternalLink> of the software.</p>),
            pt: (<p>Teste automatizado não é um recurso que necessariamente precisa substituir testes manuais ou cobrir 100% do código fonte. É possível se beneficiar dele mesmo que seja implementado apenas nas funcionalidades principais, o que já ajuda a otimizar a <ExternalLink href="https://en.wikipedia.org/wiki/Software_quality_assurance">garantia de qualidade</ExternalLink> do software.</p>)
        }),

        new LocaleContentAny({
            en: (<p>In contrast with human-testing, automated testing can be rerun quickly at any time, making part of the testing process faster, cheaper, and enabling constant validation inside a <ExternalLink href="https://en.wikipedia.org/wiki/Continuous_delivery">continuous delivery</ExternalLink> process.</p>),
            pt: (<p>Em comparação com testes manuais, testes automatizados podem ser reexecutados rapidamente a qualquer momento, deixando o processo geral de testes mais enxuto, barato e rápido, e permitindo uma validação constante dentro de um processo de <ExternalLink href="https://pt.wikipedia.org/wiki/Entrega_cont%C3%ADnua">continuous delivery</ExternalLink>.</p>)
        }),
        
        new LocaleContentAny({
            en: (<p><b>Code testability</b></p>),
            pt: (<p><b>Testabilidade de código</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Unit test is one of the cheapest forms of automated test, but while most functions can be automatically tested in some way, some coding styles are not fit for <b>unit</b> testing and can make it hard, costly or plainly impossible, such as:</p>),
            pt: (<p>Teste unitário é uma das formas mais baratas de teste automatizado, mas mesmo que a maioria das funções possam ser testadas via automação, nem todos os estilos de código são bons para a escrita de testes <b>unitários</b>, pois alguns estilos tornam a escrita dos testes difícil, custosa ou impossível. Por exemplo:</p>)
        }),

        new LocaleContentAny({
            en: (<p>
                <div>- Functions that uses global, externally unaccessible or unpredictable variables</div>
                <div>- Functions that directly communicates with external resources, like a database or an API</div>
                <div>- Functions that implement too many business logics or contains a lot of alternate execution paths</div>
            </p>),
            pt: (<p>
                <div>- Funções que usam variáveis imprevisíveis, que não podem ser acessadas externamente ou variáveis globais</div>
                <div>- Funções que diretamente se comunicam com recursos externos, como um banco de dados ou uma API</div>
                <div>- Funções que possuem muitas regras de negócio ou que possuem muitos caminhos alternativos</div>
            </p>)
        }),

        new LocaleContentAny({
            en: (<p>Fortunately, most code can be <ExternalLink href="https://en.wikipedia.org/wiki/Code_refactoring">refactored</ExternalLink> to increase it's <ExternalLink href="https://en.wikipedia.org/wiki/Software_testability">testability</ExternalLink> and enable the use of unit tests. Code with high testatibility generates smaller and more granular functions, making it easier to understand, reuse, extend and modify.</p>),
            pt: (<p>Felizmente, a maioria dos códigos podem ser <ExternalLink href="https://pt.wikipedia.org/wiki/Refatora%C3%A7%C3%A3o">refatorados</ExternalLink> para melhorar a <ExternalLink href="https://en.wikipedia.org/wiki/Software_testability">testabilidade</ExternalLink> do código e permitir a criação de testes unitários. Códigos com alta testabilidade implicam em funções menores e mais granulares, que são mais fáceis de entender, reutilizar, estender e modificar.</p>)
        }),
    ]
});