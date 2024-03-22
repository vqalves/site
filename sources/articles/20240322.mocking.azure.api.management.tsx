import Link from "next/link";
import ExternalLink from "../../components/external.link";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";
import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import Configuration from "../configuration";

export const MockingApiManagement20240322 = new Article({
    code: "240322",
    date: new ArticleDate(2024, 3, 22),
    
    title: new LocaleContentText({
        en: "Mocking with Azure API Management",
        pt: "Mocking com Azure API Management"
    }),

    description: new LocaleContentText({
        en: "Guide to build a quick mock to return responses and validate payloads in Azure API Management",
        pt: "Guia de mock rápido para validar payloads e devolver responses no Azure API Management"
    }),

    slug: new LocaleContentText({
        en: "mocking-azure-api-management",
        pt: "mocking-azure-api-management"
    }),

    tags: [ArticleTag.architecture],

    getContent: () => [
        new LocaleContentAny({
            en: (<p><h3>Azure API Management</h3></p>),
            pt: (<p><h3>Azure API Management</h3></p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p><ExternalLink href="https://azure.microsoft.com/en-us/products/api-management">Azure API Management (APIM)</ExternalLink> é uma das ferramentas cloud disponibilizadas pela Azure.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Seu foco é em oferecer uma camada de API intermediária entre acessos externos e a infraestrutura interna, permitindo ativar e desativar recursos e políticas com pouco ou nenhum impacto no client ou no backend.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Em alguns casos, também possibilita que sejam feitas alterações na infraestrutura do backend sem impactar no frontend, por exemplo quando houver troca de URI no backend.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Alguns dos recursos oferecidos pelo APIM são monitoramento e metrificação, segurança e <ExternalLink href="https://en.wikipedia.org/wiki/Rate_limiting">rate limit</ExternalLink>, cacheamento, transformação de dados, autorização por chave de acesso, dentre outros. Neste artigo o foco principal será sobre mocking.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Mocking</h3></p>),
            pt: (<p><h3>Mocking</h3></p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Mocking se trata da prática de simular um comportamento sem realizar a operação real. O conceito é bastante utilizado no tópico de testes automatizados, mas a mesma ideia pode ser aplicada no API Management.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Por exemplo, é possível criar um endpoint no API Management cuja única função é devolver um JSON fixo. Isso permite que um time de frontend faça requisições e receba esse JSON como se fosse um resultado real, mesmo que o backend ainda não exista.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Quando o backend estiver pronto, esse mesmo endpoint pode ser alterado para que a requisição seja encaminhada para o backend ao invés de retornar um JSON fixo, convertendo um mock em uma funcionalidade real sem afetar o frontend.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Reinforcing APIM concepts</h3></p>),
            pt: (<p><h3>Reforçando conceitos do APIM</h3></p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>É recomendado que se tenha conhecimentos básicos sobre <ExternalLink href="https://learn.microsoft.com/en-us/azure/api-management/api-management-howto-policies">políticas</ExternalLink> do API Management. Os principais conceitos são:</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Cada endpoint do APIM possui um bloco <b>frontend</b> aonde estão as configurações gerais, como o path do endpoint dentro do APIM, quais os parâmetros que podem ser enviados, quais tipos de content são aceitos, etc.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Além disso, toda requisição pode passar por 4 sessões. Cada sessão contém políticas configuradas através de tags XML:</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>- <b>Inbound</b>: Políticas, processos e transformações realizados antes da requisição ser encaminhada para o backend.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>- <b>Backend</b>: Políticas e configurações para envio da requisição para um serviço de backend.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>- <b>Outbound</b>: Políticas, processos e transformações realizados no <b>response</b> do backend.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>- <b>On-Error</b>: Sessão opcional para tratamento de erros ocorridos durante o processo de requisição.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Mocking a response</h3></p>),
            pt: (<p><h3>Mockando um response</h3></p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Há diferentes estratégias pra criação de um mock, uma das mais simples é usar um <b>&lt;return-response&gt;</b> na sessão <b>inbound</b>.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Essa política faz com que o retorno aconteça antes mesmo de passar pelas sessões de backend e outbound.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.xml}
            code={`<policies>
    <inbound>
        <return-response>
            <set-status code="200" />
            <set-header name="Content-Type" exists-action="override">
                <value>application/json</value>
            </set-header>
            <set-body>{ "data": "ok" }</set-body>
        </return-response>
    </inbound>
    <backend><!-- your policies --></backend>
    <outbound><!-- your policies --></outbound>
    <on-error><!-- your policies --></on-error>
</policies>`}></CodeBlock>),

        new LocaleContentAny({
            en: "",
            pt: (<p>Salvar a política com um JSON puro no &lt;set-body&gt; pode emitir um aviso sobre potenciais problemas de sintaxe. Esse aviso não afeta o funcionamento da política.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>O conteúdo e tipo podem ser alterados conforme necessidade. A Microsoft disponibiliza um artigo detalhando mais sobre a política de <ExternalLink href="https://learn.microsoft.com/en-us/azure/api-management/set-body-policy">&lt;set-body&gt;</ExternalLink>.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Validating the payload content</h3></p>),
            pt: (<p><h3>Validando conteúdo do payload</h3></p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>O APIM disponibiliza validação de schemas nativo para formato JSON, XML e SOAP utilizando a política <b><ExternalLink href="https://learn.microsoft.com/en-us/azure/api-management/validate-content-policy">&lt;validate-content&gt;</ExternalLink></b>.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Para JSON, o schema é especificado pelo padrão <ExternalLink href="https://json-schema.org/">JSON Schema</ExternalLink>. Existem plataformas que extraem schemas através de um exemplo do JSON, como o <ExternalLink href="https://www.jsonschema.net/app/schemas/0">jsonschema.net</ExternalLink></p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Para a validação fazer efeito, o endpoint deve ter um <b>Representation</b> registrado, indicando o <b>content-type</b> e o <b>schema</b> esperados no request.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Os Representations podem ser configurados no bloco de <b>Frontend</b> -&gt; Request -&gt; Representations. O schema deve ser inserido no atributo <b>Definitions</b>.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Configurar o Representation é obrigatório, caso contrário o APIM retornará BadRequest:</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.json}
            code={`{
    "statusCode": 400,
    "message": "Unspecified content type application/json is not allowed."
}`}></CodeBlock>),

        new LocaleContentAny({
            en: "",
            pt: (<p>Com o Representation e Definition registrados, a política pode ser configurada da seguinte forma:</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.xml}
            code={`<policies>
    <inbound>
        <validate-content
            unspecified-content-type-action="prevent"
            max-size="128"
            size-exceeded-action="ignore">

            <content 
                type="application/json" 
                validate-as="json" 
                action="prevent" />

        </validate-content>
    </inbound>
    <backend><!-- your policies --></backend>
    <outbound><!-- your policies --></outbound>
    <on-error><!-- your policies --></on-error>
</policies>`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><h4>Using global schema</h4></p>),
            pt: (<p><h4>Via schema global</h4></p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Outra opção de registrar um schema é o cadastro de schemas do API Management. Quando utilizar esse mecanismo, a tag &lt;content&gt; deve receber o atributo <b>schema-id</b> com o identificador do schema registrado.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Note que o schema-id não é necessário quando o schema foi registrado pelo Definitions do Representation.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.xml}
            code={`<policies>
    <inbound>
        <validate-content
            unspecified-content-type-action="prevent"
            max-size="128"
            size-exceeded-action="ignore">

            <content 
                type="application/json" 
                validate-as="json" 
                action="prevent"
                schema-id="your-schema-id" />

        </validate-content>
    </inbound>
    <backend><!-- your policies --></backend>
    <outbound><!-- your policies --></outbound>
    <on-error><!-- your policies --></on-error>
</policies>`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><h3>Different responses and StatusCodes</h3></p>),
            pt: (<p><h3>Diferentes responses e StatusCode</h3></p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>O APIM permite fluxos condicionais através da política de <b><ExternalLink href="https://learn.microsoft.com/en-us/azure/api-management/choose-policy">&lt;choose&gt;</ExternalLink></b>. Ele também também disponibiliza acesso a dados do contexto de execução através da variável <b><ExternalLink href="https://learn.microsoft.com/en-us/azure/api-management/api-management-policy-expressions#ContextVariables">context</ExternalLink></b>.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Combinar essas duas funcionalidades permite configurar e disparar diferentes retornos. Por exemplo, podemos alterar o resultado baseado em flags na requisição, possibilitando responses previsíveis sem necessidade de diferentes endpoints.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>O código abaixo demonstra isso com base em uma flag "mock" enviada pela query da URI.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.xml}
            code={`<policies>
    <inbound>
        <choose>
            <when condition="@(context.Request.OriginalUrl.Query.GetValueOrDefault("mock") == "error")">
                <return-response>
                    <set-status code="500" />
                    <set-header name="Content-Type" exists-action="override">
                        <value>plain/text</value>
                    </set-header>
                    <set-body>Internal server error</set-body>
                </return-response>
            </when>
            <when condition="@(context.Request.OriginalUrl.Query.GetValueOrDefault("mock") == "no_access")">
                <return-response>
                    <set-status code="403" />
                </return-response>
            </when>
            <otherwise>
                <return-response>
                    <set-status code="200" />
                    <set-header name="Content-Type" exists-action="override">
                        <value>application/json</value>
                    </set-header>
                    <set-body>{ "result": "ok" }</set-body>
                </return-response>
            </otherwise>
        </choose>
    </inbound>
    <backend><!-- your policies --></backend>
    <outbound><!-- your policies --></outbound>
    <on-error><!-- your policies --></on-error>
</policies>`}></CodeBlock>),
        
        new LocaleContentAny({
            en: "",
            pt: (<>
                <p>Utilizando a URI <i>https://&#123;apim_domain&#125;/&#123;api_path&#125;/&#123;endpoint_path&#125;?mock=&#123;flag&#125;</i> e trocando o valor da <b>flag</b>, se obtem o resultado:</p>
                <p>- <b>Flag "error"</b>: StatusCode 500 e mensagem de erro em texto<br/></p>
                <p>- <b>Flag "no_access"</b>: StatusCode 403 (Forbidden)<br/></p>
                <p>- <b>Sem flag ou outro</b>: StatusCode 200 e resultado JSON<br/></p>
            </>)
        }),

        new LocaleContentAny({
            en: (<p><h3>In conclusion</h3></p>),
            pt: (<p><h3>Em conclusão</h3></p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>APIM é uma ferramenta de trabalho com uma diversas funcionalidades que podem ser combinadas com bastante versatilidade, abstraindo detalhes de infraestrutura interna e diluindo responsabilidades que originalmente seriam atribuídas ao backend.</p>)
        }),

        new LocaleContentAny({
            en: "",
            pt: (<p>Acredita ter uma forma mais fácil de fazer mocks no APIM? Me mande uma mensagem no <ExternalLink href={Configuration.linkedin}>LinkedIn</ExternalLink> para faramos sobre!</p>)
        }),
    ]
});