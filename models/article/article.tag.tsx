import LocaleContentAny from "../locale/locale.content.any";

export default class ArticleTag {
    static csharp = new ArticleTag({
        name: new LocaleContentAny({
            en: "C#",
            pt: "C#"
        })
    });

    static codeSnippet = new ArticleTag({
        name: new LocaleContentAny({
            en: "Code snippet",
            pt: "Trecho de código"
        })
    });

    static concept = new ArticleTag({
        name: new LocaleContentAny({
            en: "Concept",
            pt: "Conceito"
        })
    });

    static database = new ArticleTag({
        name: new LocaleContentAny({
            en: "Database",
            pt: "Banco de dados"
        })
    });

    static experiment = new ArticleTag({
        name: new LocaleContentAny({
            en: "Experiment",
            pt: "Experimento"
        })
    });

    static explanation = new ArticleTag({
        name: new LocaleContentAny({
            en: "Explanation",
            pt: "Explicação"
        })
    });

    static architecture = new ArticleTag({
        name: new LocaleContentAny({
            en: "Architecture",
            pt: "Arquitetura"
        })
    });

    static aspnet = new ArticleTag({
        name: new LocaleContentAny({
            en: "ASP.NET",
            pt: "ASP.NET"
        })
    });

    static web = new ArticleTag({
        name: new LocaleContentAny({
            en: "Web",
            pt: "Web"
        })
    });

    static bugfix = new ArticleTag({
        name: new LocaleContentAny({
            en: "Bug fix",
            pt: "Correção de bug"
        })
    });

    readonly name: LocaleContentAny;

    constructor({name} : { name: LocaleContentAny }) {
        this.name = name;
    }
}