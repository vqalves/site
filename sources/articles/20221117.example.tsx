import Article from "../../models/article/article";
import ArticleDate from "../../models/article/article.date";
import ArticleTag from "../../models/article/article.tag";
import LocaleContentAny from "../../models/locale/locale.content.any";

export const example20221117 = new Article({
    date: new ArticleDate(2022, 11, 17),
    title: new LocaleContentAny({
        en: "Article example",
        pt: "Exemplo de artigo"
    }),

    tags: [ArticleTag.csharp],

    content: [
        new LocaleContentAny({
            en: "Article example",
            pt: "Artigo de exemplo"
        })
    ]
});