export interface SiteTitleProps {
    description: string;
}

export class SiteTitle {
    static format(description: string): any {
        var text = `${description} | Vinicius Quinafelex Alves`;

        return (
            <title>{text}</title>
        );
    }
}