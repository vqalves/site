import LocaleContentAny from "../locale/locale.content.any";
import LocaleContentText from "../locale/locale.content.text";
import LocaleType from "../locale/locale.type";
import ArticleDate from "./article.date";
import ArticleTag from "./article.tag";

export default class Article {
    readonly code: string;
    readonly title: LocaleContentText;
    readonly description: LocaleContentText;
    readonly slug: LocaleContentText;
    readonly tags: ArticleTag[];
    readonly content: LocaleContentAny[];
    readonly date: ArticleDate;

    constructor({ code, title, description, slug, tags, content, date }: { code: string, title: LocaleContentText, description: LocaleContentText, slug: LocaleContentText, tags: ArticleTag[], content: LocaleContentAny[], date: ArticleDate }) {
        this.code = code;
        this.title = title;
        this.description = description;
        this.slug = slug;
        this.tags = tags;
        this.content = content;
        this.date = date;
    }

    getPermalink(): string {
        var translatePermalink = LocaleType.enUS.getContent(this.slug);
        return `${this.code}-${translatePermalink}`;
    }

    getRoute(): string {
        return `/article/${this.getPermalink()}`;
    }
}