import Head from "next/head";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import ArticleCard from "../components/article.card";
import Layout from "../components/layout";
import content from "../contents/articles.content";
import LayoutMenu from "../models/menu";
import { useDefaultPageElements } from "../models/page";
import ArticleSource from "../sources/article.source";
import styles from "../styles/article.page.module.css";

export default function Articles() {
    const { translator, ts } = useDefaultPageElements();

    const [nameFilter, setNameFilter] = useState('');

    function handleNameFilterChange(e: ChangeEvent<HTMLInputElement>) {
        setNameFilter(e.target.value);
    }

    return (
        <>
            <Head>
                <title>{ts(content.title)} | Vinicius Quinafelex Alves</title>
                <meta name="description" content={ts(content.description)} />
            </Head>

            <Layout selectedMenu={LayoutMenu.articles}>
                <div className={styles.article_filter}>
                    <input type="text" onChange={handleNameFilterChange} placeholder={ts(content.search)} />
                </div>

                {
                    ArticleSource
                        .filter({ name: nameFilter, translator: translator })
                        .map((article, index) => {
                            return <ArticleCard key={index} article={article}></ArticleCard>
                        })
                }
            </Layout>
        </>
    )
}