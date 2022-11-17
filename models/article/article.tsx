import LocaleContentAny from "../locale/locale.content.any";
import LocaleContentText from "../locale/locale.content.text";
import ArticleDate from "./article.date";
import ArticleTag from "./article.tag";

export default class Article {
    readonly title: LocaleContentText;
    readonly tags: ArticleTag[];
    readonly content: LocaleContentAny[];
    readonly date: ArticleDate;

    constructor({ title, tags, content, date }: { title: LocaleContentText, tags: ArticleTag[], content: LocaleContentAny[], date: ArticleDate }) {
        this.title = title;
        this.tags = tags;
        this.content = content;
        this.date = date;
    }
}