import LocaleContentAny from "./locale/locale.content.any";

export default class SiteTheme {
    static light: SiteTheme = new SiteTheme({
        code: "light",
        name: new LocaleContentAny({
            en: "Light mode",
            pt: "Fundo claro"
        })
    });

    static dark: SiteTheme = new SiteTheme({
        code: "dark",
        name: new LocaleContentAny({
            en: "Dark mode",
            pt: "Fundo escuro"
        })
    });

    readonly code: string;
    readonly name: LocaleContentAny;

    constructor({ code, name }: { code: string, name: LocaleContentAny })
    {
        this.code = code;
        this.name = name;
    }
}