import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import ExternalLink from "../../components/external.link";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";

export const TasksAndThreads20230930 = new Article({
    code: "230930",
    date: new ArticleDate(2023, 9, 30),
    
    title: new LocaleContentText({
        en: "[C#] How tasks and threads work together",
        pt: "[C#] Como tasks e threads trabalham juntos"
    }),

    description: new LocaleContentText({
        en: "How tasks interact with threads and general studies",
        pt: "Como as tasks interagem com threads e estudos gerais"
    }),

    slug: new LocaleContentText({
        en: "tasks-and-threads",
        pt: "tasks-e-threads"
    }),

    tags: [ArticleTag.concept, ArticleTag.csharp, ArticleTag.explanation],

    getContent: () => [
        new LocaleContentAny({
            en: (<p><ExternalLink href="https://en.wikipedia.org/wiki/Thread_(computing)">Threads</ExternalLink> are small working units that execute parts of a <ExternalLink href="https://en.wikipedia.org/wiki/Process_(computing)">process</ExternalLink>. A process can make use of only one or multiple threads. Running under multiple threads can be beneficial on <ExternalLink href="https://en.wikipedia.org/wiki/Multi-core_processor">multi-core</ExternalLink> environments, because workload can be distributed to the multiple cores of the processor and executed in parallel, speeding up the processing time.</p>),
            pt: (<p><ExternalLink href="https://pt.wikipedia.org/wiki/Thread_(computa%C3%A7%C3%A3o)">Threads</ExternalLink> são pequenas unidades de trabalho que executam partes de um <ExternalLink href="https://pt.wikipedia.org/wiki/Processo_(inform%C3%A1tica)">processo</ExternalLink>. Um processo pode usar apenas uma ou múltiplas threads. Utilizar múltiplas threads pode ser vantajoso em computadores com <ExternalLink href="https://pt.wikipedia.org/wiki/Processador_multin%C3%BAcleo">múltiplos núcleos</ExternalLink>, pois o trabalho é distribuído e processado em paralelo pelos múltiplos núcleos do processador, tornando a execução mais rápida.</p>)
        }),
        
        new LocaleContentAny({
            en: (<p><ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=net-7.0">Task</ExternalLink> is a class that represents an asynchronous operation, or operations that can be executed independently of the current thread. Tasks can contain a return value and are a key component of the <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios">async programming</ExternalLink> feature in .NET.</p>),
            pt: (<p><ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.task?view=net-7.0">Task</ExternalLink> é uma classe que representa uma operação assíncrona - ou seja, uma operação que pode ser executada independente do fluxo de execução atual. Task pode retornar um valor, e é um recurso fundamental na <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/asynchronous-programming/async-scenarios">programação assíncrona</ExternalLink> do .NET.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Tasks have a <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskstatus?view=net-7.0">status</ExternalLink> based on which step of the execution it currently is. <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/await">Awaiting</ExternalLink> an incomplete task will halt the algorithm execution, the thread will be deallocated from the current execution and will be freed to execute other activities.</p>),
            pt: (<p>Tasks têm um <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.taskstatus?view=net-7.0">status</ExternalLink> baseado em qual etapa da execução ela está. Executar <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/csharp/language-reference/operators/await">await</ExternalLink> em uma task incompleta irá parar a execução do algoritmo, a thread será desalocada da execução atual e se tornará livre para executar outras atividades.</p>)
        }),

        new LocaleContentAny({
            en: (<p>When the operation is completed, another thread will be allocated to continue the execution from where it stopped.</p>),
            pt: (<p>Assim que a task for concluída, outra thread será alocada para continuar a execução de onde parou.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Awaiting a completed task will not rerun it, and the currently running thread will not be released. If the task has a result value, awaiting it will return the produced value synchronously.</p>),
            pt: (<p>Executar await em uma task concluída não irá rodar a task novamente, e a thread não será liberada. Se a task tiver algum valor de resultado, ativar o await retornará o resultado da task de forma síncrona.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Awaiting a task that threw an exception internally will throw the exception into the main execution.</p>),
            pt: (<p>Em caso de exception dentro de uma task, executar await irá lançar a exception pra dentro do fluxo principal. </p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Relationship with <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.threadpool?view=net-7.0">ThreadPool</ExternalLink></h3></p>),
            pt: (<p><h3>Relacionamento com <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.threadpool?view=net-7.0">ThreadPool</ExternalLink></h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>.NET applications have a ThreadPool feature, which contains pre-created threads for fast thread allocation.</p>),
            pt: (<p>Aplicações .NET, incluindo projetos web, possuem um ThreadPool com threads pré-criadas disponíveis para serem utilizados quando o sistema precisar de alocação rápida de threads.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Those threads are generally used by the .NET process and its pool size is limited, so its recommended to not use them for operations that take too much time to execute, otherwise the pool might eventually become empty and the system will suffer with slowness or errors.</p>),
            pt: (<p>Tais threads são usadas para diversos recursos internos do .NET, e como a quantidade de threads internas (pool) é limitada, não é recomendado usar em operações que levam muito tempo pra acabar - caso contrário o ThreadPool poderá eventualmente ficar vazio e o sistema sofrerá com lentidão ou erros.</p>)
        }),

        new LocaleContentAny({
            en: (<p>While there is no hard rule on how much time constitutes a slow or a fast operation, but it is commonly accepted that any operation under 500ms is considered short enough to be resolved by a ThreadPool thread.</p>),
            pt: (<p>Não há uma regra clara sobre qual o tempo de uma operação rápida ou lenta, mas é comumente aceito que uma operação que demora menos que 500ms é considerado rápida o suficiente para ser executado por uma thread do ThreadPool.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Under most circunstances, tasks will use the ThreadPool threads to finish the workload. Be mindful of what kind of operation is being executed by them to avoid long running operations.</p>),
            pt: (<p>Na maioria dos casos, tasks utilizam as threads do ThreadPool para continuar com as atividades. Tenha cuidado quais tipos de operações são executadas por elas para evitar operações de longa duração.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Note that a single task can have multiple internal asynchronous operations. In such cases, a thread will be allocated when an async operation is completed and released when it is required to await the next asyncronous operation.</p>),
            pt: (<p>Note que uma task pode executar várias operações assíncronas internamente. Nesses casos, existe alocação de thread quando uma operação assíncrona é concluída e liberação dela assim que precisar aguardar uma operação assíncrona.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Even if the task itself might take a while to complete, each allocation time can be short enough to safely use the ThreadPool.</p>),
            pt: (<p>Mesmo que uma task possa demorar para ser concluída, cada alocação de thread pode ser curta o suficiente para usar as threads do ThreadPool com segurança.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public async Task RunOperationAsync()
{
    // Handled by Thread 1
    var firstResult = await FirstFunctionAsync();

    // Handled by Thread 2
    var secondResult = await SecondFunctionAsync();

    // Handled by Thread 3
    var thirdResult = await ThirdFunctionAsync();
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>The way tasks interact with threads can change depending on how they are created, as specified below.</p>),
            pt: (<p>A forma que as tasks utilizam threads muda dependendo de como são criadas, conforme especificado abaixo.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3><ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.-ctor?view=net-7.0">Calling the constructor</ExternalLink></h3></p>),
            pt: (<p><h3><ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.task.-ctor?view=net-7.0">Instanciação via construtor</ExternalLink></h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>Creating tasks by calling it's constructor is not recommended. Instead, it is better to use asynchronous functions or the Task static methods, as described below.</p>),
            pt: (<p>Criar tasks pelo construtor não é recomendado. Dê preferência ao uso de funções assíncronas ou utilizando os métodos estáticos disponíveis na classe Task, como demonstrado abaixo.</p>)
        }),

        new LocaleContentAny({
            en: (<p><h3><ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.fromresult?view=net-7.0">Task.FromResult</ExternalLink> and other presets</h3></p>),
            pt: (<p><h3><ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.task.fromresult?view=net-7.0">Task.FromResult</ExternalLink></h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>Static methods like <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.fromresult?view=net-7.0">Task.FromResult()</ExternalLink> and properties like <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.completedtask?view=net-7.0">Task.CompletedTask</ExternalLink> return instances of Tasks without executing any asynchonous code.</p>),
            pt: (<p>Métodos estáticos como <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.task.fromresult?view=net-7.0">Task.FromResult()</ExternalLink> e propriedades como <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.task.completedtask?view=net-7.0">Task.CompletedTask</ExternalLink> retornam instâncias de Tasks sem relacionar com nenhum código assíncrono.</p>)
        }),

        new LocaleContentAny({
            en: (<p>This can be useful for situations when the method signature cannot be changed to a synchronous method, but the implementation do not have any asynchronous function, or the value was already generated synchronously.</p>),
            pt: (<p>Pode ser útil em situações aonde é necessário implementar um método que retorna Task, mas que não possui nenhum tipo de execução assíncrona, ou que o dado já foi fornecido de forma síncrona.</p>)
        }),

        new LocaleContentAny({
            en: (<p>When a task is generated this way, it comes with a <u>RanToCompletion</u> state. Note that awaiting completed tasks is run synchronously.</p>),
            pt: (<p>Quando a task é criada desta forma, ela já nasce no estado <u>RanToCompletion</u>. Executar await em tasks concluídas fará com que o resultado seja retornado de forma síncrona.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public async Task<int> GetValueAsync()
{
    return await Task.FromResult(1);
}

public async Task ExecuteAsync()
{
    // Run synchronously
    var value = await GetValueAsync();
}
`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><h3><ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.run?view=net-7.0">Task.Run()</ExternalLink></h3></p>),
            pt: (<p><h3><ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.task.run?view=net-7.0">Task.Run()</ExternalLink></h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>This method will allocate a thread from the ThreadPool to run an operation, and as such, is not recommended for long running scenarios.</p>),
            pt: (<p>Este método aloca uma thread da ThreadPool para executar a operação e não é recomendado para operações de longa duração.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`Task<int> task = Task.Run(() => 1 + 1);
var value = await task;`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>Be very careful when using an asynchonous method or lambda as a parameter, because it might match with the synchronous overload and generate a task that is not related to the execution of the parameter.</p>),
            pt: (<p>Tome cuidado quando passar um método assíncrono ou um lambda assíncrono no parâmetro, pois ele pode ativar o overload síncrono e gerar uma nova task que não está relacionada com a execução do parâmetro enviado.</p>)
        }),

        new LocaleContentAny({
            en: (<p>For such cases, it is safer to directly call the asynchronous method or lambda instead of running Task.Run().</p>),
            pt: (<p>Para esses casos, é mais seguro chamar diretamente o método assíncrono ou o lambda assíncrono ao invés de chamar via Task.Run().</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`Func<Task<int>> asyncFunction = async () => Task.FromResult(1+1);
var value = await asyncFunction();`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><h3><ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskfactory.startnew?view=net-7.0">Task.Factory.StartNew()</ExternalLink></h3></p>),
            pt: (<p><h3><ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.taskfactory.startnew?view=net-7.0">Task.Factory.StartNew()</ExternalLink></h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>Enables the customization of the task through the use of <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskcreationoptions?view=net-7.0">TaskCreationOptions</ExternalLink>.</p>),
            pt: (<p>Permite a customização de uma task através do <ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.taskcreationoptions?view=net-7.0">TaskCreationOptions</ExternalLink>.</p>)
        }),

        new LocaleContentAny({
            en: (<p>By using <u>TaskCreationOptions.LongRunning</u>, instead of using a thread from the ThreadPool, a brand new thread will be created to execute the task. This configuration is recommended for long running operations, because it avoids overusing the threads of the ThreadPool.</p>),
            pt: (<p>Quando configurar a task com <u>TaskCreationOptions.LongRunning</u>, ao invés de utilizar uma thread do ThreadPool, será criada uma nova thread independente para rodar a task. Essa configuração é recomendada para operações de longa duração, pois evita a alocação excessiva de threads do ThreadPool.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Creating new threads are not recommended for short running operations, because the effort of creating a new thread might be more expensive than executing the operation itself. For such scenarios, using the ThreadPool might be a better option.</p>),
            pt: (<p>Criar uma nova thread não é recomedado para operações rápidas, pois o esforço de criar a thread pode custar mais recursos do que executar a própria operação. Nesses casos, as threads do ThreadPool podem ser uma opção melhor.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`var task = Task.Factory.StartNew
(
    () => LongRunningMethod(),
    TaskCreationOptions.LongRunning
);

var value = await task;`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><h3>Asynchronous functions</h3></p>),
            pt: (<p><h3>Funções assíncronas</h3></p>)
        }),

        new LocaleContentAny({
            en: (<p>When an asynchronous function is called, the currently running thread will run the algorithm synchronously until it is forced to await an operation that cannot run synchronously, such as an I/O operation or a task already running.</p>),
            pt: (<p>Quando uma função assíncrona é chamada, a thread atualmente em uso continuará executando a função de forma síncrona até que seja forçado a aguardar uma operação assíncrona que ainda não está concluída, por exemplo uma operação de I/O ou uma task em execução.</p>)
        }),

        new LocaleContentAny({
            en: (<p>When the thread has to await the asynchronous task, the execution is halted and the thread is released. After the asynchronous task is completed, a thread from the ThreadPool is allocated to continue running from where the task stopped.</p>),
            pt: (<p>Quando a thread precisa aguardar essa operação assíncrona, a execução é parada e a thread é liberada. Assim que a operação assíncrona é concluída, uma thread do ThreadPool é alocada para continuar a execução de onde ela havia parado.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Note that asynchronous functions never create brand new threads by itself, and always consume threads from the ThreadPool.</p>),
            pt: (<p>Note que funções assíncronas nunca criam threads novas, e sempre utilizam threads do ThreadPool.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public async Task ExampleAsync()
{
    // Run synchronously by the main thread
    var value = 1 + 1;

    // Release the thread until the task is completed
    await File.WriteLineAsync("path", value.ToString());

    // Executed by a thread from the ThreadPool
    Console.WriteLine(value.ToString());
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>It is also possible to call an asynchronous function without imediatelly awaiting it. In this case, instead of being released, the running thread will skip the non-synchronous operation, and move to the next line after the asynchronous method call.</p>),
            pt: (<p>Também é possível invocar funções assíncronas sem imediatamente aguardar a resposta. Nesse caso, ao invés de liberar a thread imediatamente, a thread atual executará a função invocada até encontrar uma operação assíncrona, e ao encontrar essa operação, ela sairá da função assíncrona e continuará executando o código depois da chamada da função.</p>)
        }),

        new LocaleContentAny({
            en: (<p>In the meantime, when the underlying task is completed, a thread from the ThreadPool is allocated to finish executing the task.</p>),
            pt: (<p>Enquanto isso, quando uma das operações assíncronas forem concluídas em background, uma thread do ThreadPool será alocada para continuar a execução da função.</p>)
        }),

        new LocaleContentAny({
            en: (<p>If the process was awaiting the result, the allocated thread becomes the new main thread and continues executing the process. Otherwise it is released and returns to the thread pool.</p>),
            pt: (<p>Se o processo atual estava em situação de aguardar o resultado, a thread que foi alocada após a conclusão da operação se tornará a nova thread principal para continuar a execução do processo. Caso contrário, a thread alocada será desalocada e retornará para o ThreadPool.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public async Task<int> ExampleAsync()
{
    /*
    Since the task was not awaited yet, 
    the main thread exits this method
    to continue running the 
    next lines of code
    */

    await Task.Sleep(1_000);
    
    /*
    After the asynchronous operation 
    completes, the task will be handled
    by a thread from the ThreadPool
    */

    return value;

    /*
    At this point, is the program is 
    halted awaiting this result,
    the thread allocated before becomes
    the main thread. Otherwise, the 
    thread returns to the pool.
    */
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>When calling multiple asynchronous functions without awaiting, all the operations after the awaited line are executed by threads of the ThreadPool, and multiple threads may end up being used at the same time.</p>),
            pt: (<p>Quando chamar múltiplas funções assíncronas sem await, os códigos escritos depois das operações assíncronas serão executados por threads do ThreadPool, e múltiplas threads poderão ser alocadas simultaneamente.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public async Task ExecuteAsync()
{
    var task1 = ExampleAsync();
    var task2 = ExampleAsync();
    var task3 = ExampleAsync();

    await Task.WhenAll(task1, task2, task3);
}

public async Task<int> ExampleAsync()
{
    await Task.Sleep(1_000);
    
    // Each task will receive an available task from the ThreadPool
    Console.WriteLine("Completed");
}`}></CodeBlock>),
    ]
});