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
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>A unit test should not rely on external resources, such as databases, APIs or hard drive files - by definition, a test that validates multiple parts working together is called <ExternalLink>integration test</ExternalLink>.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Structure</b></p>),
            pt: (<p><b>Estrutura</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>
                    <div>An unit test can be expressed in three parts:</div>
                    <div>- <u>Setup</u>: Initialize objects, resources and variables required to execute the test</div>
                    <div>- <u>Execution</u>: Execute the function tested</div>
                    <div>- <u>Assertion</u>: Verify if the execution produced the expected results</div>
                </p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>While there are many situations and approaches to writing unit tests, below are some basic approaches implemented using the <ExternalLink href="https://www.nuget.org/packages/NUnit/">NUnit library</ExternalLink>.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Example 1 - Testing the output</b></p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Executing a method should return an output consistent with the inputs. For example, an extension method <i>StandardDeviation</i> should calculate the <ExternalLink href="https://en.wikipedia.org/wiki/Standard_deviation">standard deviation</ExternalLink> of a set of values.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`[Test]
public void StandardDeviation_CorrectValue()
{
    // Setup
    var values = new int[] { 1, 1, 1, 2 };
    
    // Execute
    var result = values.StandardDeviation();

    // Assert
    Assert.AreEqual(0.5, result);
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>The test written used simple decimal numbers, but for other scenarios, applying a <ExternalLink href="https://docs.nunit.org/articles/nunit/writing-tests/attributes/defaultfloatingpointtolerance.html">float point tolerance</ExternalLink> might be necessary.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Example 2 - Testing the state</b></p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Executing a method can change a state. For example, a class DistinctList has the ability to add values, discarding any duplicated value, and every successful insert changes the element count.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`[TestCase(new int[] { }, 0)]
[TestCase(new int[] { 0 }, 1)]
[TestCase(new int[] { 0, 0 }, 1)]
[TestCase(new int[] { 0, 1 }, 2)]
public void DistinctList_AddDuplicated_ChangesCount(int[] values, int expectedCount)
{
    // Setup
    var list = new DistinctList<int>();
    
    // Execute
    foreach(var value in values)
        list.Add(value);

    // Assert
    var count = list.Count();
    Assert.AreEqual(expectedCount, count);
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>This test checks the state on different scenarios: when there are no inserts, single inserts, duplicated inserts and non-duplicated inserts.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Example 3 - Testing method call</b></p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Certain functionalities should only be triggered under specific conditions. For example, an AuthenticationService should only send an e-mail if the user has an e-mail address.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`[TestCase(null, 0)]
[TestCase("test@test.com", 1)]
public void DistinctList_AddDuplicated_ChangesCount(string? email, int emailsSent)
{
    // Setup
    var mockService = new EmailServiceCount();
    var user = new User(email);

    IEmailService emailService = mockService;
    var authService = new AuthenticationService(emailService);

    // Execute
    authService.Approve(user);

    // Assert
    Assert.AreEqual(emailsSent, mockService.EmailsSent);
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>For this scenario, we <ExternalLink href="https://en.wikipedia.org/wiki/Mock_object">mock</ExternalLink> the EmailService, implementing the <i>Send</i> method to count how many times it was called, without actually trying to send an e-mail. Mocking can be done manually, like demonstrated below, or using a mocking library such as <ExternalLink href="https://www.nuget.org/packages/moq/">moq</ExternalLink>.</p>),
            pt: (<p></p>)
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
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>However, implementing it usually pays off by detecting bugs earlier, ensuring proper implementation of new features, exposing errors when changing existing features, and making a software overall more predictable and reliable.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Automated testing is not a feature that has to replace human-testing or cover 100% of the code base. Implementing tests on the core features might be enough to reap it's benefits and optimize the <ExternalLink href="https://en.wikipedia.org/wiki/Software_quality_assurance">quality assurance</ExternalLink> of the software.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>In contrast with human-testing, they can be rerun quickly at any time, making part of the testing process faster, cheaper, and enabling constant validation inside a <ExternalLink href="https://en.wikipedia.org/wiki/Continuous_delivery">continuous delivery</ExternalLink> process.</p>),
            pt: (<p></p>)
        }),
        
        new LocaleContentAny({
            en: (<p><b>Code testability</b></p>),
            pt: (<p><b>Testabilidade de código</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Unit test is one of the cheapest forms of automated test, but while most functions can be automatically tested in some way, some coding styles are not fit for <b>unit</b> testing and can make it hard, costly or plainly impossible, such as:</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>
                <div>- Functions that uses global, externally unaccessible or unpredictable variables</div>
                <div>- Functions that directly communicates with external resources, like a database or an API</div>
                <div>- Functions that implement too many business logics or contains a lot of alternate execution paths</div>
            </p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Fortunately, most code can be <ExternalLink href="https://en.wikipedia.org/wiki/Code_refactoring">refactored</ExternalLink> to increase it's <ExternalLink href="https://en.wikipedia.org/wiki/Software_testability">testability</ExternalLink> and enable the use of unit tests. Code with high testatibility generates smaller and more granular functions, making it easier to understand, reuse, extend and modify.</p>),
            pt: (<p></p>)
        }),
    ]
});