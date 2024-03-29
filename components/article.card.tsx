import Link from "next/link";
import Article from "../models/article/article";
import ArticleTag from "../models/article/article.tag";
import { useDefaultPageElements } from "../models/page";

import styles from '../styles/article.card.module.css';

export interface ArticleCardProps {
    article: Article;
}

function ArticleTagComponent({ tag }: { tag: ArticleTag }) {
    const { ts } = useDefaultPageElements();

    return (
        <div className={styles.article_tag}>{ts(tag.name)}</div>
    )
}

export default function ArticleCard({ article }: ArticleCardProps) {
    const { ts } = useDefaultPageElements();

    return (
        <div className={`top-border ${styles.article_card}`}>
            <div className={styles.article_title}>
                <Link href={article.getRoute()}>
                    {ts(article.title)}
                </Link>
            </div>

            <div className={styles.article_date}>{ts(article.date.formatAsContent())}</div>
            <div className={styles.article_tags}>
                {
                    article.tags.map((tag, index) => {
                        return <ArticleTagComponent key={index} tag={tag} />;
                    })
                }
            </div>
        </div>
    )
}