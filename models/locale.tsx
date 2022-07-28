export class LocaleContent {
    "pt-BR": any;
    "en-US": any;

    constructor({en, pt} : { en: any, pt: any }) {
        this["pt-BR"] = pt;
        this["en-US"] = en;
    }

    getContent(locale: string | undefined) : any {
        locale ??= "en-US";

        switch(locale) {
            case "pt-BR": return this["pt-BR"];
            case "en-US": return this["en-US"];
        }

        return "";
    }
}

export class LocaleType {
    static ptBR: LocaleType = new LocaleType({
        code: "pt-BR",
        name: "Ler em português",
        getContent: (content) => content["pt-BR"]
    });

    static enUS: LocaleType = new LocaleType({
        code: "en-US",
        name: "English version",
        getContent: (content) => content["en-US"]
    });

    static allLocales() : LocaleType[] {
        return [ LocaleType.ptBR, LocaleType.enUS ];
    }

    static getLocaleTypeByCode(code: string | undefined) : LocaleType {
        code ??= this.enUS.code;

        var locale = this.allLocales().find(e => e.code == code)!;
        if(!locale) throw new Error(`Locale ${code} not found`);

        return locale;
    }

    code: string;
    name: string;
    getContent: (content: LocaleContent) => string;

    constructor({code, name, getContent}: {code: string, name: string, getContent: (content: LocaleContent) => string}) {
        this.code = code;
        this.name = name;
        this.getContent = getContent;
    }
}

