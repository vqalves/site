import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";

export const AsyncParallelRabbitMQConsumption20221204 = new Article({
    code: "221204",
    date: new ArticleDate(2022, 12, 4),
    
    title: new LocaleContentAny({
        en: "[C#] Consuming a RabbitMQ queue asynchronously and with paralellism",
        pt: "[C#] Consumindo uma fila RabbitMQ com assincronia e paralelismo"
    }),
    slug: new LocaleContentText({
        en: "csharp-asynchonous-and-parallel-rabbitmq-consumption",
        pt: "csharp-consumindo-rabbitmq-com-assincronia-e-paralelismo"
    }),

    tags: [ArticleTag.csharp],

    content: [
        new LocaleContentAny({
            en: (<p>Asynchronicity and paralellism are great tools in situations where a process spends more time waiting for I/O calls than doing stuff. Using async and parallel, the process is able to handle new requests as soon as the I/O call starts, decreasing how much time the process is idle and increasing the throughtput potential. When this process is a service, it's possible to handle the same amount of messages with less services instances.</p>),
            pt: (<p>Assincronicidade e paralelismo são ótimas ferramentas em situações em que um processo gasta mais tempo esperando retorno de I/O do que fazendo processando. Usando async e paralelismo, o processo pode começar a processar novas requisições assim que a chamada de I/O é iniciada, diminuindo o tempo que ele fica ocioso e aumentando a quantidade de requisições processadas por segundo. Se o processo for um serviço, é possível processar a mesma quantidade de mensagem com uma quantidade menor de instâncias desse serviço.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>RabbitMQ - Synchronous and parallel</b></p>),
            pt: (<p><b>RabbitMQ - Síncrono e paralelo</b></p>)
        }),

        
        new LocaleContentAny({
            en: (<p>RabbitMQ allows a consumer to receive multiple messages to be processed in parallel using the <a href="https://rabbitmq.github.io/rabbitmq-dotnet-client/api/RabbitMQ.Client.ConnectionFactory.html#RabbitMQ_Client_ConnectionFactory_ConsumerDispatchConcurrency">ConsumerDispatchConcurrency</a> property. Due to the nature of parallel processing, make sure the message handler is <u>thread-safe</u>.</p>),
            pt: (<p>RabbitMQ permite que um consumer possa receber várias mensagems para ser processados em paralelo, usando a propriedade <a href="https://rabbitmq.github.io/rabbitmq-dotnet-client/api/RabbitMQ.Client.ConnectionFactory.html#RabbitMQ_Client_ConnectionFactory_ConsumerDispatchConcurrency">ConsumerDispatchConcurrency</a>. Como todo processamento paralelo, é importante assegurar que o processamento de cada mensagem seja <u>thread-safe</u>.</p>)
        }),

        new LocaleContentAny({
            en: (<p>The code below configures the connection to allow dispatching 5 messages at the same time.</p>),
            pt: (<p>O código abaixo configura a conexão para que ela possa enviar 5 mensagens ao mesmo tempo.</p>)
        }),

        

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            useEncode={false}
            code={`var factory = new ConnectionFactory() 
{ 
    HostName = "localhost", 
    <span class="code-highlight">ConsumerDispatchConcurrency = 5</span>
};

this.RabbitConnection = factory.CreateConnection();
this.RabbitChannel = RabbitConnection.CreateModel();

var consumer = new EventingBasicConsumer(RabbitChannel);
consumer.Received += (model, ea) =>
{
    // Process message with thread-safety
};

RabbitChannel.BasicConsume(queue: "queueName", autoAck: false, consumer: consumer);`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><b>RabbitMQ - Asynchronous and parallel</b></p>),
            pt: (<p><b>RabbitMQ - Assíncrono e paralelo</b></p>)
        }),

        new LocaleContentAny({
            en: (<p>Asynchronous calls work the same way, the difference is that the ConnectionFactory has to configure the <a href="https://rabbitmq.github.io/rabbitmq-dotnet-client/api/RabbitMQ.Client.ConnectionFactory.html#RabbitMQ_Client_ConnectionFactory_DispatchConsumersAsync">DispatchConsumersAsync</a> property, and the message consumption should use one of the different implementations of <a href="https://rabbitmq.github.io/rabbitmq-dotnet-client/api/RabbitMQ.Client.IAsyncBasicConsumer.html">IAsyncBasicConsumer</a> that the library provides.</p>),
            pt: (<p>Chamadas assíncronas funcionam da mesma forma, a diferença é que a ConnectionFactory deve mudar a propriedade <a href="https://rabbitmq.github.io/rabbitmq-dotnet-client/api/RabbitMQ.Client.ConnectionFactory.html#RabbitMQ_Client_ConnectionFactory_DispatchConsumersAsync">DispatchConsumersAsync</a>, e o consumo das mensagens deve ser feita usando uma das classes fornecidas pela biblioteca que implementa <a href="https://rabbitmq.github.io/rabbitmq-dotnet-client/api/RabbitMQ.Client.IAsyncBasicConsumer.html">IAsyncBasicConsumer</a>.</p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            useEncode={false}
            code={`var factory = new ConnectionFactory() 
{ 
    HostName = "localhost",
    <span class="code-highlight">DispatchConsumersAsync = true</span>,
    ConsumerDispatchConcurrency = 5
};

this.RabbitConnection = factory.CreateConnection();
this.RabbitChannel = RabbitConnection.CreateModel();

var consumer = new <span class="code-highlight">AsyncEventingBasicConsumer</span>(RabbitChannel);
consumer.Received += <span class="code-highlight">async</span> (model, ea) =>
{
    // Process message with thread-safety
};

RabbitChannel.BasicConsume(queue: "queueName", autoAck: false, consumer: consumer);`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><b>Example of BackgroundService using async and parallelism</b></p>),
            pt: (<p><b>Exemplo de BackgroundService usando async e paralelismo</b></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            useEncode={false}
            code={`using RabbitMQ.Client;
using RabbitMQ.Client.Events;

public class ExampleWorker : BackgroundService
{
    private IConnection? RabbitConnection;
    private IModel? RabbitChannel;

    public override Task StartAsync(CancellationToken cancellationToken)
    {
        var factory = new ConnectionFactory() 
        { 
            HostName = "localhost",
            DispatchConsumersAsync = true,
            ConsumerDispatchConcurrency = 5
        };

        this.RabbitConnection = factory.CreateConnection();
        this.RabbitChannel = RabbitConnection.CreateModel();

        var consumer = new AsyncEventingBasicConsumer(RabbitChannel);
        consumer.Received += async (model, ea) =>
        {
            // Process message with thread-safety
        };

        RabbitChannel.BasicConsume(queue: "queueName", autoAck: false, consumer: consumer);

        return Task.CompletedTask;
    }

    protected override Task ExecuteAsync(CancellationToken stoppingToken) => Task.CompletedTask;

    public override Task StopAsync(CancellationToken cancellationToken)
    {
        RabbitChannel?.Dispose();
        RabbitConnection?.Dispose();

        return Task.CompletedTask;
    }
}
`}></CodeBlock>),
    ]
});