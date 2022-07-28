import Link from "next/link";
import React from "react";
import { GlobalContext } from "../contexts/global.context";
import { LocaleType } from "../models/locale";
import LayoutMenu from "../models/menu";
import { useDefaultPageElements } from "../models/page";
import SiteTheme from "../models/site.theme";
import styles from "../styles/layout.module.css";
import LocaleButton from "./locale.button";
import ThemeButton from "./theme.button";
import content from "../contents/layout.content";
import Head from "next/head";

export interface LayoutProps {
    children: React.ReactNode
    selectedMenu: LayoutMenu
}

export default function Layout(props: LayoutProps) {
    const { router, translator, ts } = useDefaultPageElements();
    const [ openDrawer, setOpenDrawer ] = React.useState(false);

    var global = React.useContext(GlobalContext);
    
    function handleThemeChanged(newTheme: SiteTheme) {
        global.data.theme = newTheme;
        global.update(global.data)
    }

    function handleLocaleChanged(newLocale: LocaleType) {
        router.push(router.asPath, undefined, { locale: newLocale.code });
    }

    function getMenuClass(menuType: LayoutMenu): string | undefined {
        if(props.selectedMenu == menuType) {
            return styles.li_selected;
        }
    }

    function handleOpenDrawerClick() {
        setOpenDrawer(true);
    }

    function handleCloseDrawerClick() {
        setOpenDrawer(false);
    }

    function handleDrawerContentClick(e: React.MouseEvent) {
        e.stopPropagation();
    }

    return (
        <>
            <div className={`${global.data.theme.code} ${styles.layout}`}>
                <div className={`${openDrawer ? "" : "display-none"} ${styles.drawer} translucent-background mobile-only`} onClick={handleCloseDrawerClick}>
                    <div className={`${global.data.theme.code} ${styles.drawer_content}`} onClick={handleDrawerContentClick}>
                        <div className={`${styles.drawer_title}`}>Menu</div>

                        <nav>
                            <div className={`${styles.drawer_item} top-border`}><Link href="/" locale={router.locale}>{ts(LayoutMenu.aboutMe.name)}</Link></div>
                            <div className={`${styles.drawer_item} top-border`}><Link href="/articles" locale={router.locale}>{ts(LayoutMenu.articles.name)}</Link></div>
                            <div className={`${styles.drawer_item} top-border`}><Link href="/projects" locale={router.locale}>{ts(LayoutMenu.projects.name)}</Link></div>
                        </nav>

                        <div className={`${styles.drawer_item} ${styles.drawer_item_subcontent} top-border`}>
                            <span>{ts(content.language)}</span>
                            <LocaleButton currentLocale={translator} onLocaleChange={handleLocaleChanged}></LocaleButton>
                        </div>
                        
                        <div className={`${styles.drawer_item} ${styles.drawer_item_subcontent} top-border`}>
                            <span>{ts(content.theme)}</span>
                            <ThemeButton currentTheme={global.data.theme} onThemeChange={handleThemeChanged} />
                        </div>
                    </div>
                </div>

                <header className="bottom-border">
                    <div className={`${styles.mobile_header} mobile-only`}>
                        <div className={`${styles.drawer_button}`} onClick={handleOpenDrawerClick}>≡</div>

                        <nav>
                            {ts(props.selectedMenu.name)}
                        </nav>
                    </div>
                    
                    <div className={`${styles.desktop_header} desktop-only`}>
                        <h1>
                            Vinicius Quinafelex Alves
                        </h1>

                        <nav>
                            <ul>
                                <li className={getMenuClass(LayoutMenu.aboutMe)}><Link href="/" locale={router.locale}>{ts(LayoutMenu.aboutMe.name)}</Link></li>
                                <li className={getMenuClass(LayoutMenu.articles)}><Link href="/articles" locale={router.locale}>{ts(LayoutMenu.articles.name)}</Link></li>
                                <li className={getMenuClass(LayoutMenu.projects)}><Link href="/projects" locale={router.locale}>{ts(LayoutMenu.projects.name)}</Link></li>
                            </ul>
                        </nav>

                        <LocaleButton currentLocale={translator} onLocaleChange={handleLocaleChanged}></LocaleButton>

                        <ThemeButton currentTheme={global.data.theme} onThemeChange={handleThemeChanged} />
                    </div>
                    
                </header>

                <main>
                    <div className={`${global.data.theme.code} ${styles.main_margin}`}>
                        {props.children}
                    </div>    
                </main>
            </div>
        </>
    )
} 