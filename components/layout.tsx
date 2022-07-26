import Link from "next/link";
import React from "react";
import { GlobalContext } from "../contexts/global-context";
import styles from "./layout.module.css";

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
    var global = React.useContext(GlobalContext);
    
    function handleThemeSwitch() {
        global.data.theme = global?.data.theme == "light" ? "dark" : "light";
        console.log(global.data.theme);

        global.update(global.data)
    }

    return (
        <div className={global.data.theme}>
            <header className={styles.top_header}>
                <h1>
                    Vinicius Quinafelex Alves
                </h1>

                <nav>
                    <ul>
                        <li className={styles.li_selected}><Link href="/about-me">About me</Link></li>
                        <li><Link href="/articles">Articles</Link></li>
                        <li><Link href="/portfolio">Portfolio</Link></li>
                    </ul>
                </nav>

                <button onClick={handleThemeSwitch}>Toggle</button>
            </header>

            <main>{props.children}</main>
        </div>
    )
} 