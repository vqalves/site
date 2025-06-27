import ExternalLink from "../../components/external.link";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";
import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";

export const RegexNamedGroup20250626 = new Article({
    code: "250626",
    date: new ArticleDate(2025, 6, 26),
    
    title: new LocaleContentText({
        en: "[C#] Regex named group",
        pt: "[C#] Grupo nomeado em regex"
    }),

    description: new LocaleContentText({
        en: "",
        pt: "Utilizando grupo nomeado para aumentar a legibilidade do código"
    }),

    slug: new LocaleContentText({
        en: "regex-named-group",
        pt: "regex-named-group"
    }),

    tags: [ArticleTag.csharp, ArticleTag.codeSnippet],

    getContent: () => [
/*






*/

        new LocaleContentAny({
            en: (<p><ExternalLink href="https://www.regular-expressions.info/tutorial.html">Regex</ExternalLink> is a pattern that describes a certain amount of text, and can be used to locate substrings matching a pattern within a text. For example, it can be used to locate numbers, email addresses, links, or any other pattern of characters.</p>),
            pt: (<p><ExternalLink href="https://www.regular-expressions.info/tutorial.html">Regex</ExternalLink> é um padrão usado para descrever parte de um texto, e pode ser utilizado para localizar substrings que correspondam a um padrão dentro de um texto. Por exemplo, pode ser usado para encontrar números, e-mails, links ou qualquer outro padrão de caracteres.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Regex enables the use of <ExternalLink href="https://www.regular-expressions.info/brackets.html">groups</ExternalLink> to capture specific parts of data within a pattern.</p>),
            pt: (<p>Regex permite o uso de <ExternalLink href="https://www.regular-expressions.info/brackets.html">grupos</ExternalLink> para capturar partes específicas do texto dentro de um padrão.</p>)
        }),

        new LocaleContentAny({
            en: (<p>The C# example below demonstrates how to extract all emails from an input text. Note that the regex pattern for email is simplified for legibility, and should not be used in production.</p>),
            pt: (<p>O exemplo em C# abaixo demonstra como extrair todos os endereços de e-mail de uma string. O padrão regex usado para e-mails foi simplificado para facilitar a leitura, e não deve ser usado em produção.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Without named group</h3></p>),
            pt: (<p><h3>Sem grupo nomeado</h3></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.css}
            code={`public static IEnumerable<Mail> ExtractMail(string input)
{
    var pattern = @"([a-z]+)@([a-z]+(\.[a-z]+)*)";
    var regex = new Regex(pattern, RegexOptions.Compiled);

    foreach (Match match in regex.Matches(input))
    {
        yield return new Mail(
            username: match.Groups[1].Value,
            domain: match.Groups[2].Value);
    }
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><h3>With named group</h3></p>),
            pt: (<p><h3>Com grupo nomeado</h3></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.css}
            code={`public static IEnumerable<Mail> ExtractMail(string input)
{
    var pattern = @"(?<username>[a-z]+)@(?<domain>[a-z]+(\.[a-z]+)*)";
    var regex = new Regex(pattern, RegexOptions.Compiled);

    foreach (Match match in regex.Matches(input))
    {
        yield return new Mail(
            username: match.Groups["username"].Value,
            domain: match.Groups["domain"].Value);
    }
}`}></CodeBlock>),
    ]
});