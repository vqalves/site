import { LocaleContent } from "./locale";

export default class SiteTheme {
    static light: SiteTheme = new SiteTheme({
        code: "light",
        name: new LocaleContent({
            en: "Light mode",
            pt: "Fundo claro"
        })
    });

    static dark: SiteTheme = new SiteTheme({
        code: "dark",
        name: new LocaleContent({
            en: "Dark mode",
            pt: "Fundo escuro"
        })
    });

    code: string;
    name: LocaleContent;

    constructor({ code, name }: { code: string, name: LocaleContent })
    {
        this.code = code;
        this.name = name;
    }
}