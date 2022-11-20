import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import LayoutMenu from "../../models/menu";
import { useDefaultPageElements } from "../../models/page";
import ArticleSource from "../../sources/article.source";
import content from "../../contents/article.content";
import styles from "../../styles/article.page.module.css";
import Link from "next/link";
import Time from "../../components/time";
import LocaleType from "../../models/locale/locale.type";

export default function Article() {
    const { translator, ts } = useDefaultPageElements();

    const router = useRouter()
    const { permalink } = router.query;
    const article = ArticleSource.findByPermalink(permalink);

    if(!article) {
        return (<>
            <Head>
                <title>{ts(content.notFoundTitle)} | Vinicius Quinafelex Alves</title>
            </Head>

            <Layout selectedMenu={LayoutMenu.articles}>
                <div>
                    Article not found!
                </div>
            </Layout>
        </>);
    }

    return (
        <>
            <Head>
                <title>{ts(article.title)} | Vinicius Quinafelex Alves</title>

                {
                    LocaleType.allLocales().map((locale, index) => {
                        var route = article.getRoute(LocaleType.enUS);
                        return <link rel="alternate" hrefLang={locale.code} href={locale.formatLink(route)} />;
                    })
                }
                
            </Head>

            <Layout selectedMenu={LayoutMenu.articles}>
                <nav className={styles.navigate_to_articles}>
                    <Link href="/articles">{ts(content.backToArticles)}</Link>
                </nav>
                
                <article>
                    <h2>{ts(article.title)}</h2>
                    <Time date={article.date.date} content={article.date.formatAsContent()}></Time>

                    <section className={styles.article_section}>
                        {
                            article.content
                                .map((content, index) => {
                                    return <p>{ts(content)}</p>
                                })
                        }
                    </section>
                </article>
            </Layout>
        </>
    )
}