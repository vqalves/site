import LocaleContent from "./locale.content";

export default class LocaleType {
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

    readonly code: string;
    readonly name: string;
    readonly getContent: <T>(content: LocaleContent<T>) => T;

    constructor({code, name, getContent }: {code: string, name: string, getContent: <T>(content: LocaleContent<T>) => T}) {
        this.code = code;
        this.name = name;
        this.getContent = getContent;
    }
}

