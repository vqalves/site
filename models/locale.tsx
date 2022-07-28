export abstract class LocaleContent<T> {
    readonly "pt-BR": T;
    readonly "en-US": T;

    constructor({en, pt} : { en: T, pt: T }) {
        this["pt-BR"] = pt;
        this["en-US"] = en;
    }

    getContent(locale: string | undefined) : T {
        locale ??= "en-US";

        switch(locale) {
            case "pt-BR": return this["pt-BR"];
            case "en-US": return this["en-US"];
        }

        return this.getDefaultValue();
    }

    abstract getDefaultValue(): T;
}

export class LocaleContentAny extends LocaleContent<any> {
    constructor({en, pt} : { en: any, pt: any }) {
        super({en: en, pt: pt});    
    }

    getDefaultValue() {
        return "";
    }
}

export class LocaleContentText extends LocaleContent<string> {
    constructor({en, pt} : { en: string, pt: string }) {
        super({en: en, pt: pt});    
    }

    getDefaultValue() {
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

    readonly code: string;
    readonly name: string;
    readonly getContent: <T>(content: LocaleContent<T>) => T;

    constructor({code, name, getContent }: {code: string, name: string, getContent: <T>(content: LocaleContent<T>) => T}) {
        this.code = code;
        this.name = name;
        this.getContent = getContent;
    }
}

