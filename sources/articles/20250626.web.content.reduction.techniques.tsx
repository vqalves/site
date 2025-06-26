import ExternalLink from "../../components/external.link";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";
import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";

export const WebContentReductionTechniques20250626 = new Article({
    code: "250626",
    date: new ArticleDate(2025, 6, 26),
    
    title: new LocaleContentText({
        en: "[Web] Traffic reduction techniques",
        pt: "[Web] Técnicas de redução de tráfego"
    }),

    description: new LocaleContentText({
        en: "How to make web browsing faster using compression, minification and bundling, with ASP.NET examples",
        pt: "Como tornar a navegação mais rápido usando compressão, minificação e bundling, com exemplo em ASP.NET"
    }),

    slug: new LocaleContentText({
        en: "traffic-reduction-techniques",
        pt: "traffic-reduction-techniques"
    }),

    tags: [ArticleTag.concept, ArticleTag.web, ArticleTag.codeSnippet, ArticleTag.aspnet],

    getContent: () => [
        new LocaleContentAny({
            en: (<p>Web navigation primarily involves downloading and handling files, a process managed by web browsers. The number of files, the size of content, and the ways those files are downloaded can greatly impact load time and user experience.</p>),
            pt: (<p>A navegação na web envolve primariamente downloads e processamento de arquivos. A sequência e processo são geridos pelos navegadores. O número de arquivos, o tamanho do conteúdo e as formas como esses arquivos são baixados podem impactar significativamente o tempo de carregamento e a experiência do usuário.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Minification</h3></p>),
            pt: (<p><h3>Minificação</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>Minification is a technique used to pre-process text files in order to reduce character count. It usually removes blank spaces, line breaks, comments, renames local variables, and eliminates other content that does not improve the user experience. The file size reduction rate varies from file to file.</p>),
            pt: (<p>A minificação é uma técnica para pré-processar arquivos de texto e reduzir a quantidade de caracteres deles. Normalmente, ela remove espaços em branco, quebras de linha, comentários, renomeia variáveis locais e elimina outros conteúdos que não impactam na experiência do usuário. O total de redução do tamanho do arquivo varia de arquivo para arquivo.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Static text files, such as CSS, JavaScript, and static HTML, are great candidates for this process because they can be minified only during publishing or when serving the file for the first time, with minimal impact on the workload of the host server.</p>),
            pt: (<p>Arquivos de texto estáticos, como CSS, JavaScript e HTML estático, são ótimos candidatos para esse processo, pois podem ser minificados apenas no momento da publicação ou quando o arquivo for devolvido pela primeira vez pelo host, com impacto mínimo na carga de trabalho do servidor de hospedagem.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Dynamic HTML files can also be interesting candidates, but how the minification happens and when it executes will influence the trade-offs of the solution. Attempting to minify the response for every request may become more costly than simply returning a few extra bytes.</p>),
            pt: (<p>Arquivos HTML dinâmicos também podem ser bons candidatos, mas a forma como a minificação acontece e quando ela é executada influenciará os trade-offs da solução. Tentar minificar o response de cada request pode ser mais custoso do que retornar alguns bytes extras.</p>)
        }),

        new LocaleContentAny({
            en: (<p>There are many tools available, including libraries and online tools, that can apply minification, such as <ExternalLink href="https://www.minifier.org/">minifier.org</ExternalLink> or <ExternalLink href="https://github.com/mishoo/UglifyJS">UglifyJS</ExternalLink>.</p>),
            pt: (<p>Existem muitas ferramentas disponíveis, incluindo bibliotecas e ferramentas online, que podem minificar arquivos, como <ExternalLink href="https://www.minifier.org/">minifier.org</ExternalLink> ou <ExternalLink href="https://github.com/mishoo/UglifyJS">UglifyJS</ExternalLink>.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Minification makes text files much harder to read, so it should only be done on deployment or hosting environments. It is not recommended for use in a development environment, nor should it replace the original files in a repository.</p>),
            pt: (<p>A minificação dificulta a leitura dos arquivos, por isso deve ser feita apenas em ambientes de produção ou outra hospedagem. Não é recomendada para uso em ambientes de desenvolvimento, nem deve substituir os arquivos originais em um repositório.</p>)
        }),

        new LocaleContentAny({
            en: (<p>The CSS examples below demonstrate how a minification process changes the content, and in this case, reduce the file size by 43.8% (from 146b to 82b).</p>),
            pt: (<p>Os exemplos de CSS abaixo demonstram como o processo de minificação altera o conteúdo e, neste caso, reduz o tamanho do arquivo em 43,8% (de 146b para 82b).</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.css}
            code={`/* Unminified CSS */
                
.square {
    display: inline-block;
    width: 100px;
    height: 100px;
}

.blue {
    background-color: #0000ff;
}`}></CodeBlock>),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.css}
            code={`.square{display:inline-block;width:100px;height:100px}.blue{background-color:#00f}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>A similar process happens when minifying JavaScript. Most algorithms will also rename long variable names to reduce character count.</p>),
            pt: (<p>Um processo similar ocorre quando se minifica o JavaScript. A maioria dos algoritmos também renomeia nomes longos de variáveis para reduzir a quantidade de caracteres.</p>)
        }),

        new LocaleContentAny({
            en: (<p>The example below demonstrates the JavaScript minification result, including variable renaming. This minification reduced the JavaScript file size by 56.8% (from 102b to 44b).</p>),
            pt: (<p>O exemplo abaixo demonstra o resultado da minificação do JavaScript, incluindo a renomeação de variáveis. Essa minificação reduziu o tamanho do arquivo JavaScript em 56,8% (de 102b para 44b).</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.css}
            code={`// Comment
function temp(largeVariableName) {
    console.log(largeVariableName)
}

temp('test');`}></CodeBlock>),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.css}
            code={`function temp(n){console.log(n)}temp("test")`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><h3>Compression</h3></p>),
            pt: (<p><h3>Compressão</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>Compression is a technique that executes a binary compression algorithm before returning the response to the client. In simpler words, it is like zipping a file before sending it.</p>),
            pt: (<p>A compressão é uma técnica que executa um algoritmo de compressão binária antes de retornar a resposta ao cliente. Em palavras mais simples, é como zipar um arquivo antes de enviá-lo.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Browsers inform the server what kinds of compression algorithms they are able to understand in the HTTP request header <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding">Accept-Encoding</ExternalLink> and expect the server to inform them of the algorithm used in the HTTP response header <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding">Content-Encoding</ExternalLink>.</p>),
            pt: (<p>Os navegadores informam ao servidor quais tipos de compressão eles são capazes de entender através do <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding">atributo Accept-Encoding</ExternalLink> no cabeçalho do request HTTP, e esperam que o servidor informe o algoritmo utilizado no através do <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding">atributo Content-Encoding</ExternalLink> no cabeçalho do response HTTP.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Some of the most common algorithms, understood by most modern browsers, are <ExternalLink href="https://en.wikipedia.org/wiki/Gzip">gzip</ExternalLink> and <ExternalLink href="https://en.wikipedia.org/wiki/Brotli">Brotli (br)</ExternalLink>.</p>),
            pt: (<p>Alguns dos algoritmos mais comuns, entendidos pela maioria dos navegadores modernos, são <ExternalLink href="https://en.wikipedia.org/wiki/Gzip">gzip</ExternalLink> e <ExternalLink href="https://en.wikipedia.org/wiki/Brotli">Brotli (br)</ExternalLink>.</p>)
        }),


        new LocaleContentAny({
            en: (<p>Compressing text files is known to greatly reduce their size, and the same applies to web content: for example, a Bootstrap CSS file can shrink by <ExternalLink href="https://www.pingdom.com/blog/can-gzip-compression-really-improve-web-performance/">~80% when compressed with gzip</ExternalLink>, and other text files may have similar results.</p>),
            pt: (<p>Comprimir arquivos de texto é conhecido por reduzir muito seu tamanho, e o mesmo ocorre com o conteúdo web: por exemplo, o tamanho de um arquivo CSS do Bootstrap pode reduzir <ExternalLink href="https://www.pingdom.com/blog/can-gzip-compression-really-improve-web-performance/">cerca de 80% quando comprimido com gzip</ExternalLink>, e outros arquivos de texto podem obter resultados semelhantes.</p>)
        }),

        new LocaleContentAny({
            en: (<p>If the file size is very small (for example, close to 1KB), the compression algorithm will likely increase the file size instead of reducing it, so this technique is better suited for larger files.</p>),
            pt: (<p>Se o tamanho do arquivo for muito pequeno (por exemplo, próximo de 1KB), o algoritmo de compressão provavelmente aumentará o tamanho do arquivo em vez de reduzir. Portanto, essa técnica é mais indicada para arquivos maiores.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Be mindful that compressing content requires processing power. Compression algorithms offer configurations to prioritize either performance or compression rate, so it is important to consider the trade-offs between reducing file size and consuming processing power.</p>),
            pt: (<p>Note que comprimir o conteúdo requer processamento. Os algoritmos de compressão oferecem configurações para priorizar ou desempenho ou taxa de compressão, por isso é importante considerar os trade-offs entre a o quanto os arquivos devem ser reduzidos e o processamento necessário.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Most HTTP server services, such as Nginx, Apache, and IIS, offer built-in compression strategies for static and dynamic content, so the backend software remains unburdened.</p>),
            pt: (<p>A maioria dos serviços de servidores HTTP, como Nginx, Apache e IIS, oferecem nativamente estratégias de compressão para conteúdo estático e dinâmico, de modo que o software de backend não precise gastar recursos com esse processo.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Bundling</h3></p>),
            pt: (<p><h3>Bundling</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>From a development perspective, splitting files based on different purposes helps with the development and maintenance process. However, requesting lots of separate files may slow down the browsing experience.</p>),
            pt: (<p>Durante o desenvolvimento, dividir arquivos baseado em características ajuda no processo de criação e manutenção. Mas se a página precisar requisitar muitos arquivos separados, pode impactar e desacelerar a experiência de navegação.</p>)
        }),

        new LocaleContentAny({
            en: (<p>This becomes even more significant with the usage of front-end libraries and packages, distributed through managers such as <ExternalLink href="https://www.npmjs.com/">npm</ExternalLink>, which easily can add hundreds or thousands of files into a project.</p>),
            pt: (<p>Isso ganha mais significância quando há uso de bibliotecas e pacotes front-end, normalmente distribuídos por sistemas gerenciadores como <ExternalLink href="https://www.npmjs.com/">npm</ExternalLink>, que facilmente pode adicionar centenas ou milhares de arquivos no projeto.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Bundling is a technique that concatenate multiple files with the same format into bundles files (or even a single file), so the browser can request fewer files to completely download the entire page.</p>),
            pt: (<p>Bundling é uma técnica que concatena diferentes arquivos do mesmo formato em arquivos-pacote (até em um único arquivo), chamados &quot;bundles&quot;. Assim o navegador precisa requisitar menos arquivos para completar o download de uma página.</p>)
        }),

        new LocaleContentAny({
            en: (<p>The developer should evaluate the trade-offs about what is the best bundling strategy, how many bundles and how to best make use of caching with them.</p>),
            pt: (<p>O desenvolvedor deve avaliar os trade-offs sobre qual a melhor estratégia de bundling, quantos bundles terá e como melhor utilizar o cache em conjunto com eles.</p>)
        }),

        new LocaleContentAny({
            en: (<p>There are a tools with distinct bundling strategies, such as <ExternalLink href="https://webpack.js.org/">webpack</ExternalLink> for javascript modules, or adopting <ExternalLink href="https://tailwindcss.com/">TailwindCSS</ExternalLink> to make it automatically bundle the styles into a single file.</p>),
            pt: (<p>Há ferramentas com diferentes estratégias para bundling, como <ExternalLink href="https://webpack.js.org/">webpack</ExternalLink> para módulos javascript, e até mesmo <ExternalLink href="https://tailwindcss.com/">TailwindCSS</ExternalLink> para permitir que ele adicione todas as estilizações em um único arquivo.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Cache and cache busting</h3></p>),
            pt: (<p><h3>Cache e cache busting</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>In the web browsing context, caching is an old feature that keeps a downloaded file into the device, so the next time the user access needs to access the files content, the browser can load it from the device instead of requesting the server again.</p>),
            pt: (<p>Na web, cache é um recurso antigo que salva os arquivos baixados dentro da máquina, para que o navegador reutilize o mesmo arquivo na próxima vez que ele for necessário, evitando requisições adicionais.</p>)
        }),

        new LocaleContentAny({
            en: (<p>This optimize server resources and speed up loading time for recurrent users. However, history shows that it can cause problems for developers when they want to change the content of a file, and the client does not receive the update because the device is using a cached (and older) version of the file.</p>),
            pt: (<p>Isso otimiza a capacidade do servidor e acelera o carregamento das páginas quando acessadas recorrentemente. Porém, quando o desenvolvedor desejar atualizar o conteúdo do arquivo, o navegador pode ter problemas por só utilizar o arquivo em cache e não baixar o arquivo atualizado.</p>)
        }),

        new LocaleContentAny({
            en: (<p>HTTP response header <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control">Cache-Control</ExternalLink> can help managing cache in a time-basis, but a more fine-grained approach would be using cache busting techniques.</p>),
            pt: (<p>O header HTTP <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control">Cache-Control</ExternalLink> pode ajudar a estabelecer um tempo limite para o cache, mas uma forma mais customizada de lidar com essa situação são as técnicas de cache busting.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Web browser caching is sensible to the path values and query strings of the request. For example, if the device has a certain file cached and the page requires that file but add a query string into the request, then the browser is forced to download the file instead of using the cache.</p>),
            pt: (<p>O Cache dos navegadores é sensível aos parâmetro de path e query string da URL da requisição. Portanto, o link do arquivo ter valores diferentes de query string força o navegador a baixar o arquivo novo ao invés de utilizar cache.</p>)
        }),

        new LocaleContentAny({
            en: (<p>This leads to cache busting. When the developer wants to make sure certain files are not cached, they can change the value of the query string. Now the client will be forced to request the file again, ensuring that the client will be updated and begins using the new file as cache.</p>),
            pt: (<p>Quando o desenvolvedor quiser garantir que um arquivo esteja atualizado, ele pode alterar o valor da query string, forçando o navegador a requisitar o arquivo do servidor novamente, e esse novo arquivo também será cacheado.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>ASP.NET example</h3></p>),
            pt: (<p><h3>Exemplo ASP.NET</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>The example below demonstrates how to use static content minification, dynamic content compression, javascript/CSS bundling and cache busting.</p>),
            pt: (<p>O exemplo abaixo demonstra como usar minificação de conteúdo estático, compressão de conteúdo dinâmico, bundling de javascript/CSS e cache busting.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Note that HTTP server services, Web Application Firewalls, Gateways and other technologies can offer those built-in features. Consider the trade-offs between backend portability and backend performance.</p>),
            pt: (<p>Considere que os serviços de hospedagem HTTP, Web Application Firewalls, Gateways e outras tecnologias podem oferecer essas funcionalidades de fábrica. Considere os trade-offs entre portabilidade do backend e remoção de responsabilidades do backend.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Library used is <ExternalLink href="https://www.nuget.org/packages/LigerShark.WebOptimizer.Core">LigerShark.WebOptimizer.Core</ExternalLink>, which enables most of the features listed. Dynamic HTML minification was not implemented, because content compression already offers substantial gains with minimal overload.</p>),
            pt: (<p>A biblioteca utilizada para estas features é a <ExternalLink href="https://www.nuget.org/packages/LigerShark.WebOptimizer.Core">LigerShark.WebOptimizer.Core</ExternalLink>, que permite a maioria das funcionalidades listadas no artigo. Não foi implementado minificação de HTML dinâmico pela compressão já atingir os ganhos significativos com baixo custo de processamento.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Be mindful that the bundling process will bundle up <b>all</b> CSS and javascript files, even unused ones, will produce a single CSS and a single javascript file. It is important to keep the folder clean, and avoid this solution if the final file sizes become too big.</p>),
            pt: (<p>Se atente ao fato que o processo de bundling descrito irá empacotar todos os arquivos CSS e javascript, incluindo os não utilizados, e produzirá um único arquivo com todo CSS e um único arquivo com todo javascript. Mantenha a pasta de recursos limpa, e não use essa solução se o arquivo final se tornar muito grande.</p>)
        }),

        new LocaleContentAny({
            en: (<p>The C# record below contains the configuration to toggle each feature on and off, so the developers can keep it off and debug easier on the development environment.</p>),
            pt: (<p>O C# record abaixo conterá a chave para ativar ou desativar cada feature, facilitando para o desenvolvedor manter elas desativadas em seu ambiente de desenvolvimento e facilitar a depuração.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.bash}
            code={`// Activate or deactivate features on development or production
public record MinificationSettings(bool Compress, bool Minify, bool Bundle) { }`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>Configuration of the Program.cs file.</p>),
            pt: (<p>Configuração do arquivo Program.cs</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`using Microsoft.AspNetCore.ResponseCompression;
using System.IO.Compression;

// [...]

// Recommended to load from launchSettings or appSettings
var minificationConfig = new MinificationSettings(
    Compress: true,
    Minify: true,
    Bundle: true);

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton(minificationConfig);

if (minificationConfig.Compress)
{
    builder.Services.AddResponseCompression(options =>
    {
        options.EnableForHttps = true;
        options.Providers.Add<BrotliCompressionProvider>();
        options.Providers.Add<GzipCompressionProvider>();
    });

    builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
    {
        options.Level = CompressionLevel.Fastest;
    });

    builder.Services.Configure<GzipCompressionProviderOptions>(options =>
    {
        options.Level = CompressionLevel.Fastest;
    });
}

// Always active for cache busting compatibility
builder.Services.AddWebOptimizer(pipeline =>
{
    if (minificationConfig.Minify && !minificationConfig.Bundle)
    {
        pipeline.MinifyCssFiles();
        pipeline.MinifyJsFiles();
    }
    else if (minificationConfig.Bundle)
    {
        pipeline
            .AddJavaScriptBundle("/js/bundle.js", "js/**/*.js")
            .AddResponseHeader("content-type", "text/javascript");

        pipeline
            .AddCssBundle("/css/bundle.css", "css/**/*.css");
    }
});

// [...]

var app = builder.Build();

if(minificationConfig.Compress)
    app.UseResponseCompression();

// Always active for cache busting compatibility
app.UseWebOptimizer();

// [...]

app.Run();`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>Views can be configured to toggle between loading each file individually or a single bundle.</p>),
            pt: (<p>Views podem ser configuradas para alternar entre carregamento de arquivos individuais ou bundles.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.html}
            code={`@using YourNamespace
@model MinificationSettings

<html>
    <head>
        @if(Model.Bundle)        
        {
            <link rel="stylesheet" href="css/bundle.css" />
            <script type="text/javascript" src="js/bundle.js"></script>
        }
        else
        {
            <link rel="stylesheet" href="css/file1.css" />
            <link rel="stylesheet" href="css/file2.css" />
            <script type="text/javascript" src="js/file3.js"></script>
            <script type="text/javascript" src="js/file4.js"></script>
        }
    </head>
    <body>
        <!-- Content -->
    </body>
</html>`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>Cache busting activates automatically by adding the WebOptimizer import into the <b>_ViewImports.cshtml</b> file.</p>),
            pt: (<p>Cache busting é ativado automaticamente ao importar o WebOptimizer no arquivo <b>_ViewImports.cshtml</b>.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.text}
            code={`@addTagHelper *, WebOptimizer.Core`}></CodeBlock>),
    ]
});