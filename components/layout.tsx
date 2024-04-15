import Link from "next/link";
import React from "react";
import LayoutMenu from "../models/menu";
import SiteTheme from "../models/site.theme";
import { useDefaultPageElements } from "../models/page";
import { GlobalContext } from "../contexts/global.context";

import LocaleButton from "./locale.button";
import ThemeButton from "./theme.button";
import LocaleType from "../models/locale/locale.type";
import content from "../contents/layout.content";

import styles from "../styles/layout.module.css";
import ExternalLink from "./external.link";
import Configuration from "../sources/configuration";

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
                            <div className={`${styles.drawer_item} top-border`}><Link href="/">{ts(LayoutMenu.aboutMe.name)}</Link></div>
                            <div className={`${styles.drawer_item} top-border`}><Link href="/articles">{ts(LayoutMenu.articles.name)}</Link></div>
                            <div className={`${styles.drawer_item} top-border`}><Link href="/projects">{ts(LayoutMenu.projects.name)}</Link></div>
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
                            <div className={getMenuClass(LayoutMenu.aboutMe)}><Link href="/">{ts(LayoutMenu.aboutMe.name)}</Link></div>
                            <div className={getMenuClass(LayoutMenu.articles)}><Link href="/articles">{ts(LayoutMenu.articles.name)}</Link></div>
                            <div className={getMenuClass(LayoutMenu.projects)}><Link href="/projects">{ts(LayoutMenu.projects.name)}</Link></div>
                        </nav>
                    </div>

                    <div className={`${styles.desktop_header} desktop-only`}>
                        <h1>
                            Vinicius Quinafelex Alves
                        </h1>

                        <nav>
                            <ul>
                                <li className={getMenuClass(LayoutMenu.aboutMe)}><Link href="/">{ts(LayoutMenu.aboutMe.name)}</Link></li>
                                <li className={getMenuClass(LayoutMenu.articles)}><Link href="/articles">{ts(LayoutMenu.articles.name)}</Link></li>
                                <li className={getMenuClass(LayoutMenu.projects)}><Link href="/projects">{ts(LayoutMenu.projects.name)}</Link></li>
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

                <footer className="top-border">
                    <div className="external-profiles">
                        <div className="external-profile">
                            {/*<img className="logo" src="https://brand.linkedin.com/content/dam/me/brand/en-us/brand-home/logos/In-Blue-Logo.png.original.png" alt="" aria-hidden="true"></img>*/}
                            <ExternalLink href={Configuration.linkedin}>Linkedin</ExternalLink>
                        </div>
                        
                        <div className="external-profile">
                            {/*<img className="logo" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="" aria-hidden="true"></img>*/}
                            <ExternalLink href="https://github.com/vqalves">Github</ExternalLink>
                        </div>

                        <div className="external-profile">
                            {/*<img className="logo" src="https://www.dropbox.com/s/fg1x3ekgvsn1h7q/Logo.zip?dl=0&file_subpath=%2FLogo%2F01_Black%2FSymbol%2FPNG%2FRGB%2FMedium-Symbol-Black-RGB%401x.png" alt="" aria-hidden="true"></img>*/}
                            <ExternalLink href="https://vqalves.medium.com/">Medium</ExternalLink>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
} 