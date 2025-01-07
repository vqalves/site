import ExternalLink from "../../components/external.link";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";
import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import Configuration from "../configuration";

export const PublishingAspnetWithDocker20250107 = new Article({
    code: "250107",
    date: new ArticleDate(2025, 1, 7),
    
    title: new LocaleContentText({
        en: "[ASP.NET] Publishing with Docker",
        pt: "[ASP.NET] Publicando com Docker"
    }),

    description: new LocaleContentText({
        en: "How and why to publish ASP.NET applications using Docker",
        pt: "Como e por que publicar aplicações ASP.NET com Docker"
    }),

    slug: new LocaleContentText({
        en: "publishing-aspnet-with-docker",
        pt: "publishing-aspnet-with-docker"
    }),

    tags: [ArticleTag.aspnet, ArticleTag.codeSnippet],

    getContent: () => [
        new LocaleContentAny({
            en: (<p>Publishing a web application with <ExternalLink href="https://en.wikipedia.org/wiki/Containerization_(computing)">containerization</ExternalLink> is currently one of the simplest ways to allow an easily scalable infrastructure.</p>),
            pt: (<p>Publicar uma aplicação web com <ExternalLink href="https://en.wikipedia.org/wiki/Containerization_(computing)">conteinerização</ExternalLink> é atualmente uma das maneiras mais simples de obter uma infraestrutura facilmente escalável.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>What is a container</h3></p>),
            pt: (<p><h3>O que é um container</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>A container is a package that contains all the environment configurations and dependencies necessary to run a software, including OS packages, binaries, language libraries, source code, etc.</p>),
            pt: (<p>Um container é um pacote que contém todas as configurações de ambiente e dependências necessárias para executar um software, incluindo pacotes do sistema operacional, binários, bibliotecas de linguagem, código-fonte, etc.</p>)
        }),

        new LocaleContentAny({
            en: (<p>As a concept and a technology, containerization is not new, and it has transformed through the years, gaining much more popularity with the release of <ExternalLink href="https://docs.docker.com/get-started/docker-overview/">Docker</ExternalLink> in 2013.</p>),
            pt: (<p>Como conceito e tecnologia, a conteinerização não é nova e tem se transformado ao longo dos anos, ganhando muito mais popularidade com o lançamento do <ExternalLink href="https://docs.docker.com/get-started/docker-overview/">Docker</ExternalLink> em 2013.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Docker</h3></p>),
            pt: (<p><h3>Docker</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>Docker is both the name of a technology and the name of a company. Most of this article talks about the technology, not the company.</p>),
            pt: (<p>O Docker é tanto o nome de uma tecnologia quanto o nome de uma empresa. A maior parte deste artigo fala sobre a tecnologia, não sobre a empresa.</p>)
        }),

        new LocaleContentAny({
            en: (<p><ExternalLink href="https://www.docker.com/">Docker Inc</ExternalLink> (company) is currently the main maintainer of the Docker technology and offers a set of products and services around containerization, some of which are proprietary and non-free.</p>),
            pt: (<p>A <ExternalLink href="https://www.docker.com/">Docker Inc</ExternalLink> é atualmente o principal mantenedor da tecnologia Docker e oferece um conjunto de produtos e serviços em torno da conteinerização, alguns dos quais são proprietários e não gratuitos.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Docker (technology) is an open source containerization technology. The code is available on a <ExternalLink href="https://github.com/docker">GitHub repository</ExternalLink>.</p>),
            pt: (<p>O Docker (tecnologia) é uma tecnologia de conteinerização de código aberto. O código está disponível em um <ExternalLink href="https://github.com/docker">repositório no GitHub</ExternalLink>.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Docker containers do not contain an entire operating system inside of them. They share the same Linux kernel running on the OS of the hosting machine and run additional dependencies in isolation.</p>),
            pt: (<p>Containers do Docker não contêm um sistema operacional completo dentro deles. Eles compartilham o mesmo kernel Linux rodando no sistema operacional do host e executam dependências adicionais em isolamento.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Therefore, Docker containers are not meant to be run directly on a Windows OS. To run Docker on Windows, some form of Linux-Windows communication is required, such as WSL or virtualization.</p>),
            pt: (<p>Logo, os containers do Docker não são feitos para ser executados diretamente em Windows. Para rodar o Docker no Windows, algum tipo de comunicação entre Linux e Windows é necessário, como o WSL ou virtualização.</p>)
        }),

        new LocaleContentAny({
            en: (<p><ExternalLink href="https://docs.docker.com/desktop/setup/install/windows-install/">Docker Desktop for Windows</ExternalLink> abstracts away that Linux-Windows communication process, allowing Windows to run containers as easily as a Linux OS.</p>),
            pt: (<p>O <ExternalLink href="https://docs.docker.com/desktop/setup/install/windows-install/">Docker Desktop para Windows</ExternalLink> abstrai esse processo de comunicação entre Linux e Windows, permitindo que o Windows execute containers com a mesma facilidade que um sistema operacional Linux.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Note that Docker Desktop for Windows has a licensing fee for commercial usage. Always check the licensing of each product to understand its limitations.</p>),
            pt: (<p>Note que o Docker Desktop para Windows tem um custo de licença para uso comercial. Sempre verifique a licença de cada produto para entender suas limitações.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Components of containerization with Docker</h3></p>),
            pt: (<p><h3>Componentes da conteinerização com Docker</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Docker Image</b>: A template that has all the data and configuration required to run a container on a computer. It can be hosted or shared on specialized repositories, known as container registries.</p>),
            pt: (<p><b>Docker Image</b>: Um template que contém todos os dados e configurações necessárias para rodar um container em um computador. Ela pode ser hospedada ou compartilhada em repositórios especializados, chamados container registries.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Docker Container</b>: A container instance, created based on a Docker Image.</p>),
            pt: (<p><b>Docker Container</b>: Uma instância de container, criada com base em um Docker Image.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>Docker Daemon</b>: A service running on top of the OS and is responsible for keeping the containers running. It is also responsible for pushing and pulling images from registries, creating and managing container instances based on container images, and bridging the computer's network ports with the container's ports.</p>),
            pt: (<p><b>Docker Daemon</b>: Um serviço instalado no sistema operacional e é responsável por manter os containers em execução. Ele também é responsável por executar pull e push de imagens em registries, criar e gerenciar instâncias de containers com base em imagens, e conectar as portas de rede do computador com as portas dos containers.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Why is it useful?</h3></p>),
            pt: (<p><h3>Por que é útil</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>Containerization allows software to be distributed alongside the environment configuration. With containers, there is no need to install dependencies or reconfigure the operating system for each piece of software running on that machine.</p>),
            pt: (<p>A conteinerização permite que o software seja distribuído juntamente com a configuração do ambiente. Com containers, não há necessidade de instalar dependências ou reconfigurar o sistema operacional para cada aplicativo que irá rodar na máquina.</p>)
        }),

        new LocaleContentAny({
            en: (<p>This allows for easier scaling because a single server with Docker can deploy multiple containers using the same image. Cloud platforms also offer PaaS options, such as Azure Container Apps, to run containers without worrying about servers, and offering user-friendly auto-scaling options.</p>),
            pt: (<p>Isso facilita a escalabilidade, pois um único servidor com Docker pode instanciar múltiplos containers usando a mesma imagem. As plataformas de nuvem também oferecem opções PaaS, como o Azure Container Apps, para executar containers sem se preocupar com servidores, além de oferecer configurações fáceis de auto-scaling.</p>)
        }),

        new LocaleContentAny({
            en: (<p>It also allows developers to run instances of software without requiring the installation of the software and its dependencies directly onto the developer's workstation, avoiding conflicts between dependencies of different software. Since dependencies are contained inside the container, deleting the container will also remove all its files and dependencies, simplifying the uninstallation process.</p>),
            pt: (<p>Isso também permite que os desenvolvedores executem instâncias de software sem a necessidade de instalar o software e suas dependências diretamente em seu computador, evitando conflitos entre dependências de diferentes softwares. Como as dependências estão contidas dentro do container, apagar o container também remove todos arquivos e dependências dele, simplificando o processo de desinstalação.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Simplified setup</h3></p>),
            pt: (<p><h3>Setup simplificado</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>Inside the root folder of the project, add a file containing the Docker instructions. A file containing Docker instructions is called a <ExternalLink href="https://docs.docker.com/reference/dockerfile/">Dockerfile</ExternalLink>. The default name for this file is Dockerfile (without a file extension), but you can specify a different file name in the <ExternalLink href="https://docs.docker.com/build/">build command</ExternalLink>.</p>),
            pt: (<p>Na pasta raiz do projeto, adicione um arquivo contendo as instruções Docker. Um arquivo que contém instruções Docker é chamado de <ExternalLink href="https://docs.docker.com/reference/dockerfile/">Dockerfile</ExternalLink>. O nome padrão pra este tipo de arquivo também deve ser Dockerfile (sem extensão), mas qualquer nome pode ser usado se você especificá-lo no <ExternalLink href="https://docs.docker.com/build/">comando de build</ExternalLink>.</p>)
        }),

        new LocaleContentAny({
            en: (<p>To create container images on your own computer, it is necessary to install Docker. If the image is created automatically as part of a CI/CD process, it is not necessary to have Docker installed on the computer.</p>),
            pt: (<p>Para criar imagens de container no seu próprio computador, é necessário instalar o Docker. Se a imagem for criada automaticamente como parte de um processo de CI/CD, não é necessário ter o Docker instalado no computador.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.dockerfile}
            code={`# Example of a Dockerfile for an ASP.NET using .NET 8.0:

# Base image of an operating system that can build the code
# For .NET, the SDK version mirrors the .NET version
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy solution and relevant project files, and restore dependencies before publishing
# Docker does not support globbing to copy and filter files recursively
# Each file must be copied individually
COPY MyProject.sln ./MyProject.sln
COPY src/MyProject.Domain/MyProject.Domain.csproj ./src/MyProject.Domain/MyProject.Domain.csproj
COPY src/MyProject.Infrastructure/MyProject.Infrastructure.csproj ./src/MyProject.Infrastructure/MyProject.Infrastructure.csproj
COPY src/MyProject.Web/MyProject.Web.csproj ./src/MyProject.Web/MyProject.Web.csproj
RUN dotnet restore

# After restore, copy all source files and build
COPY src/. ./src/
WORKDIR /source/src/MyProject.Web
RUN dotnet publish -c Release -o /app --no-restore

# Copy the files into a base image capable of running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "MyProject.Web.dll"]`}></CodeBlock>),


        new LocaleContentAny({
            en: (<p>The root folder can also include a <ExternalLink href="https://docs.docker.com/build/concepts/context/#dockerignore-files">.dockerignore</ExternalLink> file, which will exclude certain files, filenames or paths from the build process. Note that Docker does not support parameterized .dockerignore files.</p>),
            pt: (<p>A pasta raiz também pode incluir um arquivo <ExternalLink href="https://docs.docker.com/build/concepts/context/#dockerignore-files">.dockerignore</ExternalLink>, que irá excluir certos arquivos, nomes de arquivos ou caminhos do processo de build. Note que o Docker não suporta arquivos .dockerignore parametrizados.</p>)
        }),

        new LocaleContentAny({
            en: (<p>When building an image of a .NET project locally, it is recommended to ignore the bin and obj folders to avoid copying files that might include local path dependencies.</p>),
            pt: (<p>Quando criar um Docker image de um projeto .NET localmente, é recomendado ignorar as pastas bin e obj para evitar copiar arquivos que podem ter referência a algum caminho local da máquina.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.dockerfile}
            code={`# Ignore folders
**/bin
**/obj
bin/
obj/`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><h3>Building the container image</h3></p>),
            pt: (<p><h3></h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>To build the image on a computer, run the following command:</p>),
            pt: (<p>Para gerar um Docker image no computador, execute o comando:</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.bash}
            code={`docker build --progress=plain --file=Dockerfile -t <image_name> .`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><u>--progress=plain</u> displays command output and errors to help debug the docker build process.</p>),
            pt: (<p><u>--progress=plain</u> exibe o output e erros para ajudar a depurar o processo de build do Docker.</p>)
        }),

        new LocaleContentAny({
            en: (<p><u>--file</u> is optional when the Dockerfile has the file name 'Dockerfile.' If different images are being created from the same root folder, multiple Dockerfiles with different names may be required.</p>),
            pt: (<p><u>--file</u> é opcional quando o Dockerfile tem o nome de arquivo 'Dockerfile'. Se precisar criar diferentes Docker images a partir da mesma pasta raiz, pode ser necessário ter múltiplos Dockerfiles com nomes diferentes.</p>)
        }),

        new LocaleContentAny({
            en: (<p><u>-t</u> is used to specify the name or tag of the created Docker image.</p>),
            pt: (<p><u>-t</u> é usado para especificar o nome ou tag da imagem criada.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Why restore before publishing</h3></p>),
            pt: (<p><h3>Por que restaurar antes de publicar</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>Docker uses a <ExternalLink href="https://docs.docker.com/build/cache/">caching system</ExternalLink> based on checksums, which is generated based on the command text and the files contained in the image at the moment the command runs.</p>),
            pt: (<p>O Docker usa um <ExternalLink href="https://docs.docker.com/build/cache/">sistema de cache</ExternalLink> baseado em checksums, que é gerado com base no comando e nos arquivos contidos na imagem no momento em que o comando é executado.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Starting with the second build, if the previous build has a command with the same checksum as the command about to be executed, Docker reuses the previously generated output instead of running the command from scratch. When the checksum differs, all subsequent commands will be re-executed.</p>),
            pt: (<p>A partir do segundo build, se o build anterior já executou um comando com o mesmo checksum do comando a ser executado, o Docker reutiliza o output do comando do build anterior sem executar o comando novamente. Quando o checksum difere, todos os comandos a partir do checksum divergente serão re-executados.</p>)
        }),

        new LocaleContentAny({
            en: (<p>By separating the process of restoring dependencies based only on the project files, the restore process will only run again if the project files change, for example, when adding or updating a dependency.</p>),
            pt: (<p>Ao separar o processo de restauração de dependências baseado apenas nos arquivos do projeto, o processo de restauração só executará novamente se os arquivos do projeto mudarem, por exemplo, ao adicionar ou atualizar uma dependência.</p>)
        }),

        new LocaleContentAny({
            en: (<p>This way, Docker can often reuse the cached package restore result, greatly speeding up the process.</p>),
            pt: (<p>Dessa forma, o Docker pode frequentemente reutilizar o resultado do restore em cache, acelerando consideravelmente o processo.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Common errors</h3></p>),
            pt: (<p><h3>Erros comuns</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>The following error is caused because the local bin and obj folders were copied into the Docker image and contain references to the local machine. To fix this, create a .dockerignore file to ignore those local folders and let the publishing process within Docker create its own folders.</p>),
            pt: (<p>O seguinte erro é causado porque as pastas bin e obj locais foram copiadas para a imagem Docker e contêm referências à máquina local. Para corrigir, crie um arquivo .dockerignore que ignore essas pastas locais e permita que o processo de publicação dentro do Docker crie suas próprias pastas.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Note that this error is more likely to happen on a local computer. If this is happening in the cloud, it is possible that a developer committed the bin and obj folders to the repository.</p>),
            pt: (<p>Note que esse erro é mais provável de acontecer em um computador local. Se estiver acontecendo na nuvem, é possível que um desenvolvedor tenha commitado as pastas bin e obj no repositório.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.dockerfile}
            code={`#19 1.367 /usr/share/dotnet/sdk/8.0.404/Sdks/Microsoft.NET.Sdk/targets/Microsoft.PackageDependencyResolution.targets(266,5): error MSB4018: The "ResolvePackageAssets" task failed unexpectedly. [/source/src/MyProject.Web/MyProject.Web.csproj]
#19 1.367 /usr/share/dotnet/sdk/8.0.404/Sdks/Microsoft.NET.Sdk/targets/Microsoft.PackageDependencyResolution.targets(266,5): error MSB4018: NuGet.Packaging.Core.PackagingException: Unable to find fallback package folder 'C:\Program Files (x86)\Microsoft Visual Studio\Shared\NuGetPackages'. [/source/src/MyProject.Web/MyProject.Web.csproj]
#19 1.367 /usr/share/dotnet/sdk/8.0.404/Sdks/Microsoft.NET.Sdk/targets/Microsoft.PackageDependencyResolution.targets(266,5): error MSB4018:    
at NuGet.Packaging.FallbackPackagePathResolver..ctor(String userPackageFolder, IEnumerable\`1 fallbackPackageFolders) [/source/src/MyProject.Web/MyProject.Web.csproj]
#19 1.367 /usr/share/dotnet/sdk/8.0.404/Sdks/Microsoft.NET.Sdk/targets/Microsoft.PackageDependencyResolution.targets(266,5): error MSB4018:    
at Microsoft.NET.Build.Tasks.NuGetPackageResolver.CreateResolver(IEnumerable\`1 packageFolders) [/source/src/MyProject.Web/MyProject.Web.csproj]
#19 1.367 /usr/share/dotnet/sdk/8.0.404/Sdks/Microsoft.NET.Sdk/targets/Microsoft.PackageDependencyResolution.targets(266,5): error MSB4018:    
at Microsoft.NET.Build.Tasks.ResolvePackageAssets.CacheWriter..ctor(ResolvePackageAssets task) [/source/src/MyProject.Web/MyProject.Web.csproj]
#19 1.367 /usr/share/dotnet/sdk/8.0.404/Sdks/Microsoft.NET.Sdk/targets/Microsoft.PackageDependencyResolution.targets(266,5): error MSB4018:    
at Microsoft.NET.Build.Tasks.ResolvePackageAssets.CacheReader.CreateReaderFromDisk(ResolvePackageAssets task, Byte[] settingsHash) [/source/src/MyProject.Web/MyProject.Web.csproj]
#19 1.367 /usr/share/dotnet/sdk/8.0.404/Sdks/Microsoft.NET.Sdk/targets/Microsoft.PackageDependencyResolution.targets(266,5): error MSB4018:    
at Microsoft.NET.Build.Tasks.ResolvePackageAssets.CacheReader..ctor(ResolvePackageAssets task) [/source/src/MyProject.Web/MyProject.Web.csproj]
#19 1.367 /usr/share/dotnet/sdk/8.0.404/Sdks/Microsoft.NET.Sdk/targets/Microsoft.PackageDependencyResolution.targets(266,5): error MSB4018:    
at Microsoft.NET.Build.Tasks.ResolvePackageAssets.ReadItemGroups() [/source/src/MyProject.Web/MyProject.Web.csproj]
#19 1.367 /usr/share/dotnet/sdk/8.0.404/Sdks/Microsoft.NET.Sdk/targets/Microsoft.PackageDependencyResolution.targets(266,5): error MSB4018:    
at Microsoft.NET.Build.Tasks.ResolvePackageAssets.ExecuteCore() [/source/src/MyProject.Web/MyProject.Web.csproj]
#19 1.367 /usr/share/dotnet/sdk/8.0.404/Sdks/Microsoft.NET.Sdk/targets/Microsoft.PackageDependencyResolution.targets(266,5): error MSB4018:    
at Microsoft.NET.Build.Tasks.TaskBase.Execute() [/source/src/MyProject.Web/MyProject.Web.csproj]
#19 1.367 /usr/share/dotnet/sdk/8.0.404/Sdks/Microsoft.NET.Sdk/targets/Microsoft.PackageDependencyResolution.targets(266,5): error MSB4018:    
at Microsoft.Build.BackEnd.TaskExecutionHost.Execute() [/source/src/MyProject.Web/MyProject.Web.csproj]
#19 1.367 /usr/share/dotnet/sdk/8.0.404/Sdks/Microsoft.NET.Sdk/targets/Microsoft.PackageDependencyResolution.targets(266,5): error MSB4018:    
at Microsoft.Build.BackEnd.TaskBuilder.ExecuteInstantiatedTask(TaskExecutionHost taskExecutionHost, TaskLoggingContext taskLoggingContext, TaskHost taskHost, ItemBucket bucket, TaskExecutionMode howToExecuteTask) [/source/src/MyProject.Web/MyProject.Web.csproj]`}></CodeBlock>),
    ]
});