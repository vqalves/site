import Head from "next/head";
import Layout from "../components/layout";
import content from "../contents/articles.content";
import LayoutMenu from "../models/menu";
import { useDefaultPageElements } from "../models/page";

export default function Articles() {
    const { ts } = useDefaultPageElements();

    return (
        <>
            <Head>
                <title>{ts(content.title)} | Vinicius Quinafelex Alves</title>
                <meta name="description" content={ts(content.description)} />
            </Head>

            <Layout selectedMenu={LayoutMenu.articles}>
                <div>
                    {ts(content.presentationText)}
                </div>
            </Layout>
        </>
    )
}