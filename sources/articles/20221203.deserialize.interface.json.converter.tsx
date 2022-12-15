import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";

export const DeserializeInterfaceWithJsonConverter20221203 = new Article({
    code: "221203.1",
    date: new ArticleDate(2022, 12, 3),
    
    title: new LocaleContentText({
        en: "[C#] Deserialize JSON to an interface with JsonConverter",
        pt: "[C#] Desserializar JSON em uma interface com JsonConverter"
    }),

    description: new LocaleContentText({
        en: "How to deserialize a JSON into an object with interface-typed properties using JsonConverter",
        pt: "Como desserializar um JSON em um objeto com propriedades tipada como interface usando JsonConverter"
    }),

    slug: new LocaleContentText({
        en: "csharp-deserialize-json-to-interface",
        pt: "csharp-desserializar-json-em-interface"
    }),

    tags: [ArticleTag.csharp],

    getContent: () => [
        new LocaleContentAny({
            en: (<p>On C#, interfaces cannot be instantiated directly. To deserialize interfaces, you need to choose a class that implements that interface, so the deserializer can fill the corresponding properties.</p>),
            pt: (<p>No C#, interfaces não podem ser instanciada diretamente. Para desserializar interfaces, é preciso escolher uma classe que implemente a interface, para que o desserializador consiga alimentar as propriedades correspondentes.</p>)
        }),

        new LocaleContentAny({
            en: (<p>Below there's an example where the code checks an attribute <b>Type</b> inside the JSON to determine what class should be instanciated.</p>),
            pt: (<p>No exemplo abaixo, o código verifica o atributo <b>Type</b> dentro do JSON para escolher qual classe deve ser instanciada.</p>)
        }),

        new LocaleContentAny({
            en: (<p><b>JSON Example</b></p>),
            pt: (<p><b>Exemplo de JSON</b></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.json}
            code={`{
    "FirstValue": {
        "Type": "TypeA",
        "StringContent": "Example"
    },
    "SecondValue": {
        "Type": "TypeB",
        "IntegerContent": 123
    }
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><b>Deserialized structure</b></p>),
            pt: (<p><b>Estrutura de desserialização</b></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public interface ICustomInterface 
{ 
    string Type { get; }
}

public class DeserializationResult
{
    public ICustomInterface? FirstValue { get; set; }
    public ICustomInterface? SecondValue { get; set; }
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><b>Multiple interface implementations</b></p>),
            pt: (<p><b>Múltiplas implementações de interface</b></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`public class ImplementationTypeA : ICustomInterface 
{ 
    public string Type { get; set; }
    public string StringContent { get; set; }
}

public class ImplementationTypeB : ICustomInterface 
{ 
    public string Type { get; set; }
    public int IntegerContent { get; set; }
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><b>Implementing the CustomJsonConverter</b></p>),
            pt: (<p><b>Implementando o CustomJsonConverter</b></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`using System.Text.Json;

public class CustomJsonConverter : JsonConverter<ICustomInterface?>
{
    public override ICustomInterface? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var node = JsonNode.Parse(ref reader);
        var type = node!["Type"]?.GetValue<string?>();

        if(type == "TypeA")
            return node.Deserialize<ImplementationTypeA>();

        if(type == "TypeB")
            return node.Deserialize<ImplementationTypeB>();

        return null;
    }

    public override void Write(Utf8JsonWriter writer, ICustomInterface? value, JsonSerializerOptions options)
    {
        JsonSerializer.Serialize(writer, (object?)value, options);
    }
}`}></CodeBlock>),

        new LocaleContentAny({
            en: (<p><b>Consuming the JsonConverter</b></p>),
            pt: (<p><b>Usando o JsonConverter</b></p>)
        }),

        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.csharp}
            code={`using System.Text.Json;
            
public void ExecuteDeserialization(string json) 
{
    var jsonOptions = new JsonSerializerOptions();
    jsonOptions.Converters.Add(new CustomJsonConverter());

    var resultInstance = JsonSerializer.Deserialize<DeserializationResult>(json, jsonOptions);

    var serializedJson = JsonSerializer.Serialize(resultInstance, jsonOptions);
}`}></CodeBlock>),
    ]
});