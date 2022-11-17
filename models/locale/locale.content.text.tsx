import LocaleContent from "./locale.content";

export default class LocaleContentText extends LocaleContent<string> {
    constructor({en, pt} : { en: string, pt: string }) {
        super({en: en, pt: pt});    
    }

    getDefaultValue() {
        return "";
    }
}