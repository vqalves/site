import LocaleContent from "./locale.content";

export default class LocaleContentAny extends LocaleContent<any> {
    constructor({en, pt} : { en: any, pt: any }) {
        super({en: en, pt: pt});    
    }

    getDefaultValue() {
        return "";
    }

    static all(content: any): LocaleContentAny {
        return new LocaleContentAny({
            en: content,
            pt: content
        });
    }
}