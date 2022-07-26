import Link from "next/link";
import React from "react";
import { GlobalContext } from "../contexts/global.context";
import { LocaleContent, LocaleType } from "../models/locale";
import LayoutMenu from "../models/menu";
import { useDefaultPageElements } from "../models/page";
import SiteTheme from "../models/site.theme";
import styles from "../styles/layout.module.css";
import LocaleButton from "./locale.button";
import ThemeButton from "./theme.button";

const content = {
    menuAbout: new LocaleContent({
        en: "About me",
        pt: "Sobre mim"
    }),

    menuArticles: new LocaleContent({
        en: "Articles",
        pt: "Artigos"
    }),

    menuProjects: new LocaleContent({
        en: "Projects",
        pt: "Projetos"
    })
}

interface LayoutProps {
    children: React.ReactNode
    selectedMenu: LayoutMenu | null
}

export default function Layout(props: LayoutProps) {
    const { router, translator, ts } = useDefaultPageElements();

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

    return (
        <>
            {/* 
            <Head>
                <link rel="canonical" href={`/${router.locale}${router.asPath}`}/>
            </Head>
            */}

            <div className={`${global.data.theme.code} ${styles.layout}`}>
                <header className="bottom-border">
                    <h1>
                        Vinicius Quinafelex Alves
                    </h1>

                    <nav>
                        <ul>
                            <li className={getMenuClass(LayoutMenu.aboutMe)}><Link href="/" locale={router.locale}>{ts(content.menuAbout)}</Link></li>
                            <li className={getMenuClass(LayoutMenu.articles)}><Link href="/articles" locale={router.locale}>{ts(content.menuArticles)}</Link></li>
                            <li className={getMenuClass(LayoutMenu.projects)}><Link href="/projects" locale={router.locale}>{ts(content.menuProjects)}</Link></li>
                        </ul>
                    </nav>

                    <LocaleButton currentLocale={translator} onLocaleChange={handleLocaleChanged}></LocaleButton>

                    <ThemeButton currentTheme={global.data.theme} onThemeChange={handleThemeChanged} />
                </header>

                <main>{props.children}</main>
            </div>
        </>
    )
} 