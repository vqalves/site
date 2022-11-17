import LocaleContentAny from "../locale/locale.content.any";

export default class ArticleDate {
    readonly date: Date;

    constructor(year: number, month: number, day: number) {
        this.date = new Date(year, month - 1, day)
    }

    formatAsContent():LocaleContentAny {
        return new LocaleContentAny({
            en: this.formatEn(),
            pt: this.formatPt()
        });
    }

    private formatPt(): string {
        var day = this.formatNumberAsTwoCharacters(this.date.getDate());
        var month = this.formatNumberAsTwoCharacters(this.date.getMonth() + 1);
        var year = this.date.getFullYear();
        
        return `${day}/${month}/${year}`;
    }

    private formatEn(): string {
        var day = this.formatNumberAsTwoCharacters(this.date.getDate());
        var month = this.formatNumberAsTwoCharacters(this.date.getMonth() + 1);
        var year = this.date.getFullYear();
        
        return `${month}/${day}/${year}`;
    }

    private formatNumberAsTwoCharacters(day: number) {
        if(day > 9) 
            return day.toString();
        else
            return '0' + day.toString();
    }
}