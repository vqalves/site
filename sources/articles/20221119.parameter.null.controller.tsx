import Link from "next/link";
import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";
import { ChangeDotnetJsonConversion20221121 } from "./20221121.change.dotnet.json.conversion";

export const ParameterNullController20221119 = new Article({
    code: "221119",
    date: new ArticleDate(2022, 11, 19),
    
    title: new LocaleContentAny({
        en: "[ASPNET] Action parameter is null",
        pt: "[ASPNET] Parâmetro da action está nulo"
    }),
    slug: new LocaleContentText({
        en: "aspnet-action-parameter-is-null",
        pt: "aspnet-parametro-action-nulo"
    }),

    tags: [ArticleTag.aspnet, ArticleTag.bugfix],

    content: [
        new LocaleContentAny({
            en: (<p>In some cases, the action parameter that should be hydrated with the data sent by the user is null. The main reasons are:</p>),
            pt: (<p>Em algumas situações, o parâmetro da action que recebe os dados enviados pelo usuário pode estar vindo nulo. As principais explicações são:</p>)
        }),

        new LocaleContentAny({
            en: (<h3>1. Object is being hydrated from the wrong place</h3>),
            pt: (<h3>1. Hidratação está sendo feita pelo lugar errado</h3>)
        }),


        new LocaleContentAny({
            en: (<section>
                <p>It's more common for the server to trigger a <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415">HTTP 415 error</a>, but on some old dotnet versions such error is not triggered and the parameter is simply null.</p>

                <p>Use <span className="bold">[FromForm]</span> for {"<form>"}, Multipart Form and Form URL Encoded POSTs</p>
                <p>Use <span className="bold">[FromBody]</span> for raw JSON POSTs</p>
                <p>Use <span className="bold">[FromRoute]</span> to get data from the URL route</p>
                <p>Use <span className="bold">[FromQuery]</span> to get data passed on the URL query (after the question mark "?" on the URL)</p>
            </section>),
            pt: (<section>
                <p>O comum seria que o servidor devolvesse o erro <a target="_blank" href="https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/415">HTTP 415</a>, mas algumas versões antigas do dotnet não disparam esse erro e simplesmente alimentam o parâmetro com nulo.</p>

                <p>Use <span className="bold">[FromForm]</span> para tags {"<form>"}, Multipart Form e Form URL Encoded POSTs.</p>
                <p>Use <span className="bold">[FromBody]</span> para POSTs JSON.</p>
                <p>Use <span className="bold">[FromRoute]</span> para buscar dados na rota da URL.</p>
                <p>Use <span className="bold">[FromQuery]</span> para buscar dados enviados na query da URL (parametrizados depois do ponto de interrogação "?" na URL)</p>
            </section>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`[HttpPost]
public IActionResult Example([FromForm]DataModel data)
{
    /* Implementation */
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<h3>2. Data of one of the properties is null or has a format that's not understood by the deserializer</h3>),
            pt: (<h3>2. O dado de algum das propriedades está nulo ou tem um formato que não consegue ser deserializado</h3>)
        }),

        new LocaleContentAny({
            en: (<section>
                <p>Non-nullable properties cannot be hydrated if the data is null or not properly formatted. For example, Guid variables by default has to have dashes "-" and DateTime is much more predictable using the <a target="_blank" href="https://en.wikipedia.org/wiki/ISO_8601">ISO format</a>.</p>
            </section>),
            pt: (<section>
                <p>Propriedades não-anuláveis não podem ser hidratados se o dado enviado for nulo ou não estiver em um formato correto. Por exemplo, variáveis tipo Guid por padrão só podem ser hidratados se estiverem com traços (-), e variáveis tipo DateTime terão menos problemas se os dados estiverem no <a target="_blank" href="https://pt.wikipedia.org/wiki/ISO_8601">formato ISO</a>.</p>
            </section>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.json}
            code={`{
    "ValidNumbers": [123, 123.45, "123", "123.45"],
    "ValidGuids": ["7e31022d-b955-4b74-bcaf-82660196480b"],
    "ValidDates": ["2022-01-01", "2022-01-01T12:00:00", "2022-01-01T12:00:00-03:00"]
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<section>
                <p>Even nullable properties cannot be hydrated if the property is a primitive, and the JSON body contains an array or an object.</p>
            </section>),
            pt: (<section>
                <p>Mesmo propriedades anuláveis não podem ser hidratados se a propriedade for primitiva, e o dado enviado foi um array ou um objeto.</p>
            </section>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.json}
            code={`{
    "ObjectProperty:" {},
    "ArrayProperty": []
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<section>
                <p>In case you have no control over the input format, <Link href={ChangeDotnetJsonConversion20221121.getRoute()}>this article</Link> explains how you can add change the serialization and deserialization formats on the ASPNET environment.</p>
            </section>),
            pt: (<section>
                <p>Caso não tenha controle sobre o formato de entrada, <Link href={ChangeDotnetJsonConversion20221121.getRoute()}>este artigo</Link> explica como é possível altera os formatos de serialização e deserialização do ambiente do ASPNET.</p>
            </section>)
        }),
    ]
});