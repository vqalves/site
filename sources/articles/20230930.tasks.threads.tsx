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
            en: (<p><ExternalLink href="https://en.wikipedia.org/wiki/Thread_(computing)">Threads</ExternalLink> are small working units that execute parts of a <ExternalLink href="https://en.wikipedia.org/wiki/Process_(computing)">process</ExternalLink>. A process can make use of only one or multiple threads. Running under multiple threads can be beneficial on <ExternalLink href="https://en.wikipedia.org/wiki/Multi-core_processor">multi-core</ExternalLink> environments, because workload can be distributed to all the multiple cores of the processor, speeding up the processing time.</p>),
            pt: (<p></p>)
        }),
        
        new LocaleContentAny({
            en: (<p><ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=net-7.0">Task</ExternalLink> is a class that represents an asynchronous operation, or operations that can be executed independently of the current thread. Tasks can contain a return value and are a key component of the <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios">async programming</ExternalLink> feature in .NET.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Tasks have a <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskstatus?view=net-7.0">status</ExternalLink> based on which step of the execution it currently is. <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/await">Awaiting</ExternalLink> an incomplete task will halt the algorithm execution until the task is completed.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>By awaiting an incomplete task, the currently running thread is freed and execution is halted. When the operation is completed, another thread will be allocated to continue the execution from where it stopped.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>If a completed task is awaited, the only thing that happens is retrieveing the produced results synchronously, if any result is available. Awaiting a completed task will not rerun it, and the currently running thread will not be released.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Awaiting a task that threw an exception internally will bring the exception to the main execution.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><h3>Relationship with <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.threadpool?view=net-7.0">ThreadPool</ExternalLink></h3></p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>.NET applications have a ThreadPool feature, which contains pre-created threads for fast thread allocation. Those threads are generally used by the .NET process and its pool size is limited, so its recommended to not use them for operations that take too much time to execute, otherwise the pool might eventually become empty and the system will suffer with slowness or errors.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Under most circunstances, tasks will use the ThreadPool threads to finish the workload. Be mindful of what kind of operation is being executed by them to avoid long running operations.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Note that a single task can have multiple internal asynchronous operations. In such cases, a thread will be allocated when an async operation is completed and released when it is required to await the next operation. So, even if the task itself might take a while to complete, each allocation time can be short enough to safely use the ThreadPool.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>The way tasks interact with threads can change depending on how they are created, as specified below.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><h3><ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.-ctor?view=net-7.0">Calling the constructor</ExternalLink></h3></p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Creating tasks by calling it's constructor is not recommended. Instead, it is better to use asynchronous functions or the Task static methods.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p><h3><ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.fromresult?view=net-7.0">Task.FromResult</ExternalLink> and other presets</h3></p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Static methods like <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.fromresult?view=net-7.0">Task.FromResult()</ExternalLink> and properties like <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.completedtask?view=net-7.0">Task.CompletedTask</ExternalLink> return instances of Tasks without executing any asynchonous code.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>This can be useful for situations when the method signature cannot be changed to a synchronous method, but the implementation do not have any asynchronous function, or the value was already generated synchronously.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>When a task is generated this way, it comes with a <u>RanToCompletion</u> state. Note that awaiting completed tasks is run synchronously.</p>),
            pt: (<p></p>)
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
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>This method will allocate a thread from the ThreadPool to run an operation, and as such, is not recommended for long running scenarios.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`Task<int> task = Task.Run(() => 1 + 1);
var value = await task;`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p>Be very careful when using an asynchonous method or lambda as a parameter, because it might match with the synchronous overload and generate a task that is not related to the execution of the parameter.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>For such cases, it is safer to directly call the asynchronous method or lambda instead of running Task.Run.</p>),
            pt: (<p></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`Func<Task<int>> asyncFunction = async () => Task.FromResult(1+1);
var value = await asyncFunction();`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><h3><ExternalLink href="https://learn.microsoft.com/pt-br/dotnet/api/system.threading.tasks.taskfactory.startnew?view=net-7.0">Task.Factory.StartNew()</ExternalLink></h3></p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Enables the customization of the task through the use of <ExternalLink href="https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskcreationoptions?view=net-7.0">TaskCreationOptions</ExternalLink>.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>By using <u>TaskCreationOptions.LongRunning</u>, the task can be run on a fresh new thread. This configuration is recommended for long running operations, because it avoids overusing the threads of the ThreadPool.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Creating new threads are not recommended for short running operations, because the effort of creating a new thread might be more expensive than executing the operation itself. For such scenarios, using the ThreadPool might be a better option.</p>),
            pt: (<p></p>)
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
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>When an asynchronous function is called, the currently running thread will run the algorithm synchronously until it is forced to await an operation that cannot run synchronously, such as an I/O operation or a task already running.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>When the thread has to await the asynchronous task, the execution is halted and the thread is released. After the asynchronous task is completed, a thread from the ThreadPool is allocated to continue running from where the task stopped.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>Note that asynchronous functions never create brand new threads by itself, and always consume threads from the ThreadPool.</p>),
            pt: (<p></p>)
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
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>In the meantime, when the underlying task is completed, a thread from the ThreadPool is allocated to finish executing the task.</p>),
            pt: (<p></p>)
        }),

        new LocaleContentAny({
            en: (<p>If the process was awaiting the result, the allocated thread becomes the new main thread and continues executing the process. Otherwise it is released and returns to the thread pool.</p>),
            pt: (<p></p>)
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

    return 1 + 1;

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
            pt: (<p></p>)
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