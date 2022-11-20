import LocaleContentAny from "../models/locale/locale.content.any";
import { useDefaultPageElements } from "../models/page";

export interface TimeProps {
    date: Date;
    content: LocaleContentAny;
}

export default function Time({ date, content }: TimeProps) {
    const { ts } = useDefaultPageElements();

    function getIsoDate(date: Date): string {
        var formatted = date.toISOString();
        var parts = formatted.split("T");
        return parts[0];
    }

    return (
        <time dateTime={getIsoDate(date)}>{ts(content)}</time>
    )
}