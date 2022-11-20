import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";
import LocaleContentText from "../../models/locale/locale.content.text";

export const example20221117 = new Article({
    code: "221117",
    date: new ArticleDate(2022, 11, 17),
    
    title: new LocaleContentAny({
        en: "Article example",
        pt: "Exemplo de artigo"
    }),
    slug: new LocaleContentText({
        en: "article-example",
        pt: "exemplo-de-artigo"
    }),

    tags: [ArticleTag.csharp],

    content: [
        new LocaleContentAny({
            en: "Article example",
            pt: "Artigo de exemplo"
        })
    ]
});