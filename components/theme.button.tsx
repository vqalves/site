import { useDefaultPageElements } from "../models/page";
import SiteTheme from "../models/site.theme";
import styles from "../styles/theme.button.module.css";

export interface ThemeButtonProps {
    currentTheme: SiteTheme;
    onThemeChange: (newTheme: SiteTheme) => void;
    className?: string | undefined;
}

export default function ThemeButton(props: ThemeButtonProps) {
    const { ts } = useDefaultPageElements();

    if(props.currentTheme == SiteTheme.light) {
        return (
            <div 
                className={`${props.className} ${styles.theme_button} ${styles.to_dark}`} 
                onClick={() => { props.onThemeChange(SiteTheme.dark) }}>
                    🌙 {ts(SiteTheme.dark.name)}
            </div>
        )
    } else {
        return (
            <div 
                className={`${props.className} ${styles.theme_button} ${styles.to_light}`} 
                onClick={() => { props.onThemeChange(SiteTheme.light) }}>
                    🌅 {ts(SiteTheme.light.name)}
            </div>
        )
    }
}