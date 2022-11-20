import Article from "../models/article/article";
import LocaleType from "../models/locale/locale.type";
import { example20221117 } from "./articles/20221117.example";

const ArticleSource = {
    listAll(): Article[] { 
        return [example20221117];
    },

    filter({ name, translator } : { name: string, translator: LocaleType }): Article[] {
        var resultList = this.listAll();

        if(name) {
            name = name.toLowerCase();

            resultList = resultList.filter((article) => {
                var title = translator.getContent(article.title).toLowerCase();
                return title.includes(name);
            });
        } 

        return resultList;
    },

    findByPermalink(permalink: string | string[] | undefined): Article | undefined {
        if(!permalink) return;

        var code = (permalink as string).split('-')[0];

        return this.listAll().find((article, index) => {
            return article.code === code;
        });
    }
}

export default ArticleSource;