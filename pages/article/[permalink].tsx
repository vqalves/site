import React from "react";
import Link from "next/link";
import Head from "next/head";

import Layout from "../../components/layout";
import LayoutMenu from "../../models/menu";
import ArticleSource from "../../sources/article.source";
import Time from "../../components/time";
import LocaleType from "../../models/locale/locale.type";
import { useDefaultPageElements } from "../../models/page";

import content from "../../contents/article.content";
import styles from "../../styles/article.page.module.css";
import { SiteTitle } from "../../components/site.title";

class ArticlePageParam {
    readonly permalink: string;

    constructor(permalink: string) {
        this.permalink = permalink;
    }
}

export function ArticlePage(props: ArticlePageParam) {
    const { ts } = useDefaultPageElements();

    const article = ArticleSource.findByPermalink(props.permalink)!;
    
    return (
        <>
            <Head>
                {SiteTitle.format(ts(article.title))}

                <meta property="og:title" content={ts(article.title)} />
                <meta property="og:type" content="article" />
                <meta property="og:description" content={ts(article.description)} />

                {
                    LocaleType.allLocales().map((locale, index) => {
                        var route = article.getRoute();
                        return (<link key={index} rel="alternate" hrefLang={locale.code} href={locale.formatLink(route)} />);
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

                    <section className={`${styles.article_section} bottom-top`}>
                        {
                            article.getContent()
                                .map((content, index) => {
                                    return (<React.Fragment key={index}>
                                        {ts(content)}
                                    </React.Fragment>);
                                })
                        }
                    </section>
                </article>
            </Layout>
        </>
    )
}

export async function getStaticPaths() {
    const paths = []

    const locales = LocaleType.allLocales();

    for(const article of ArticleSource.listAll()) {
        var slug = article.getPermalink();
        var data = new ArticlePageParam(slug);

        for(const locale of locales) {
            const path = { params: data, locale: locale.code };
            paths.push(path);
        }
    };

    return {
        paths: paths,
        fallback: false
    };
}

export async function getStaticProps(props: any) {    
    var params: ArticlePageParam = props.params;
    return { props: params };
}

export default ArticlePage;