import SiteTheme from "../models/site.theme";
import styles from "../styles/theme.button.module.css";

export interface ThemeButtonProps {
    currentTheme: SiteTheme;
    onThemeChange: (newTheme: SiteTheme) => void;
}

export default function ThemeButton(props: ThemeButtonProps) {
    if(props.currentTheme == SiteTheme.light) {
        return (
            <div className={`${styles.theme_button} ${styles.to_dark}`} onClick={() => { props.onThemeChange(SiteTheme.dark) }}>🌙 Dark mode</div>
        )
    } else {
        return (
            <div className={`${styles.theme_button} ${styles.to_light}`} onClick={() => { props.onThemeChange(SiteTheme.light) }}>🌅 Light mode</div>
        )
    }
}