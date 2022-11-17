import LocaleContentAny from "./locale/locale.content.any";

export default class LayoutMenu {
    static aboutMe: LayoutMenu = new LayoutMenu({
        name: new LocaleContentAny({
            en: "About me",
            pt: "Sobre mim"
        })
    });

    static articles: LayoutMenu = new LayoutMenu({
        name: new LocaleContentAny({
            en: "Articles",
            pt: "Artigos"
        })
    });

    static projects: LayoutMenu = new LayoutMenu({
        name: new LocaleContentAny({
            en: "Projects",
            pt: "Projetos"
        })
    });

    readonly name: LocaleContentAny;

    constructor({ name }: { name: LocaleContentAny }) {
        this.name = name;
    }
}