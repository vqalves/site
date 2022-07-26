import Link from "next/link";
import React from "react";
import { GlobalContext } from "../contexts/global-context";
import styles from "./layout.module.css";

export enum LayoutMenu {
    aboutMe,
    articles,
    portfolio
}

interface LayoutProps {
    children: React.ReactNode
    selectedMenu: LayoutMenu | null
}

export default function Layout(props: LayoutProps) {
    var global = React.useContext(GlobalContext);
    
    function handleThemeSwitch() {
        global.data.theme = global?.data.theme == "light" ? "dark" : "light";
        console.log(global.data.theme);

        global.update(global.data)
    }

    function getMenuClass(menuType: LayoutMenu): string | undefined {
        if(props.selectedMenu == menuType) {
            return styles.li_selected;
        }
    }

    return (
        <div className={`${global.data.theme} ${styles.layout}`}>
            <header>
                <h1>
                    Vinicius Quinafelex Alves
                </h1>

                <nav>
                    <ul>
                        <li className={getMenuClass(LayoutMenu.aboutMe)}><Link href="/about-me">About me</Link></li>
                        <li className={getMenuClass(LayoutMenu.articles)}><Link href="/articles">Articles</Link></li>
                        <li className={getMenuClass(LayoutMenu.portfolio)}><Link href="/portfolio">Portfolio</Link></li>
                    </ul>
                </nav>

                <button onClick={handleThemeSwitch}>Toggle</button>
            </header>

            <main>{props.children}</main>
        </div>
    )
} 