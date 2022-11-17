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

    readonly name: LocaleContentAny;

    constructor({name} : { name: LocaleContentAny }) {
        this.name = name;
    }
}