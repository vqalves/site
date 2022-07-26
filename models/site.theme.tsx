export default class SiteTheme {
    static light: SiteTheme = new SiteTheme({code: "light"});
    static dark: SiteTheme = new SiteTheme({code: "dark"});

    code: string;

    constructor({ code }: { code: string })
    {
        this.code = code;
    }
}