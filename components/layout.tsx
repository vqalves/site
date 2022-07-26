import Link from "next/link";
import Router, { useRouter } from "next/router";
import React from "react";
import { GlobalContext } from "../contexts/global-context";
import { LocaleContent, LocaleType } from "../models/locale";
import styles from "./layout.module.css";

export enum LayoutMenu {
    aboutMe,
    articles,
    projects
}

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
    const router = useRouter();
    const translator = LocaleType.getLocaleTypeByCode(router.locale);

    var global = React.useContext(GlobalContext);
    
    function handleThemeSwitch() {
        global.data.theme = global?.data.theme == "light" ? "dark" : "light";
        global.update(global.data)
    }

    function handleLocaleSwitch(newLocale: LocaleType) {
        router.push(router.asPath, undefined, { locale: newLocale.code });
    }

    function getMenuClass(menuType: LayoutMenu): string | undefined {
        if(props.selectedMenu == menuType) {
            return styles.li_selected;
        }
    }

    function ts(text: LocaleContent) : string {
        return translator.getContent(text);
    }

    return (
        <div className={`${global.data.theme} ${styles.layout}`}>
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

                <div className={styles.locale}>
                    <span>🌐</span>
                    {
                        LocaleType
                            .allLocales()
                            .filter(e => e.code != translator.code)
                            .map(e => {
                                return <span key={e.code} onClick={() => { handleLocaleSwitch(e); }}>{e.name}</span>
                            })
                    }
                </div>

                <button onClick={handleThemeSwitch}>Toggle</button>
            </header>

            <main>{props.children}</main>
        </div>
    )
} 