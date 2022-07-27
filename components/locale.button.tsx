import { LocaleType } from "../models/locale";
import styles from "../styles/locale.button.module.css";

export interface LocaleButtonProps {
    currentLocale: LocaleType;
    onLocaleChange: (newLocale: LocaleType) => void;
    className?: string | undefined;
}

export default function LocaleButton(props: LocaleButtonProps) {
    return (
        <div className={`${props.className} ${styles.locale_button} icon-button`}>
            <span>🌐</span>
            {
                LocaleType
                    .allLocales()
                    .filter(e => e.code != props.currentLocale.code)
                    .map(e => {
                        return <span key={e.code} onClick={() => { props.onLocaleChange(e); }}>{e.name}</span>
                    })
            }
        </div>
    )
}