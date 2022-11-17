export default abstract class LocaleContent<T> {
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