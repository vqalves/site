import CodeBlock, { CodeBlockLanguage } from "../../components/code.block";
import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";

export const ChangeDotnetJsonConversion20221121 = new Article({
    code: "221121",
    date: new ArticleDate(2022, 11, 21),
    
    title: new LocaleContentText({
        en: "[ASPNET Core] Change formats of ASPNET JSON serialization and deserialization",
        pt: "[ASPNET Core] Alterar os formatos de serialização e desserialização do JSON no ASPNET"
    }),

    description: new LocaleContentText({
        en: "How to change specific formats ASPNET Core uses to serialize and desserialize JSONs for requests and responses",
        pt: "Como alterar a forma padrão que o ASPNET Core serializa e desserializa os JSONs de request e response"
    }),

    slug: new LocaleContentText({
        en: "aspnet-change-json-format",
        pt: "aspnet-alterar-formato-json"
    }),

    tags: [ArticleTag.aspnet],

    getContent: () => [
        new LocaleContentAny({
            en: (<p>Internally, ASPNET Core uses <a target="_blank" href="https://learn.microsoft.com/pt-br/dotnet/api/system.text.json.jsonserializer">System.Text.Json.JsonSerializer</a> to serialize responses and deserialize requests. If an input uses a different format than the default ASPNET configuration, it is possible to change it by registering a <a target="_blank" href="https://learn.microsoft.com/en-us/dotnet/api/system.text.json.serialization.jsonconverter-1">JsonConverter</a>.</p>),
            pt: (<p>Internamente, o ASPNET Core utiliza a biblioteca <a target="_blank" href="https://learn.microsoft.com/pt-br/dotnet/api/system.text.json.jsonserializer">System.Text.Json.JsonSerializer</a> para serializar responses e desserializar requests. Quando o request está em um formato diferente do padrão do ASPNET, é possível alterar o formato registrando um <a target="_blank" href="https://learn.microsoft.com/pt-br/dotnet/api/system.text.json.serialization.jsonconverter-1">JsonConverter</a>.</p>)
        }),

        LocaleContentAny.all(<p><b>CustomJsonConverter.cs</b></p>),
        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.json}
            code={`public class CustomJsonConverter : JsonConverter<int?>
{
    public override int? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        switch (reader.TokenType)
        {
            case JsonTokenType.String:
            {
                if(int.TryParse(reader.GetString(), out var value))
                    return value;

                break;
            }

            case JsonTokenType.Number:
            {
                return reader.GetInt32();
            }
        }

        return null;
    }

    public override void Write(Utf8JsonWriter writer, int? value, JsonSerializerOptions options)
    {
        JsonSerializer.Serialize<int?>(writer, value, options);
    }
}`}></CodeBlock>),

        LocaleContentAny.all(<p><b>Program.cs</b></p>),
        LocaleContentAny.all(<CodeBlock
            language={CodeBlockLanguage.json}
            code={`builder.Services.AddControllersWithViews().AddJsonOptions((option) => 
{
    option.JsonSerializerOptions.Converters.Add(new CustomJsonConverter());
});`}></CodeBlock>),
    ]
});