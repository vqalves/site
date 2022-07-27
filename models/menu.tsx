import { LocaleContent } from "./locale"

export default class LayoutMenu {
    static aboutMe: LayoutMenu = new LayoutMenu({
        name: new LocaleContent({
            en: "About me",
            pt: "Sobre mim"
        })
    });

    static articles: LayoutMenu = new LayoutMenu({
        name: new LocaleContent({
            en: "Articles",
            pt: "Artigos"
        })
    });

    static projects: LayoutMenu = new LayoutMenu({
        name: new LocaleContent({
            en: "Projects",
            pt: "Projetos"
        })
    });

    name: LocaleContent;

    constructor({ name }: { name: LocaleContent }) {
        this.name = name;
    }
}