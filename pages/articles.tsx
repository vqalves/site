import Head from "next/head";
import Layout, { LayoutMenu } from "../components/layout";

export default function Articles() {
    return (
        <>
            <Head>
                <title>VQA - Articles</title>
                <meta name="description" content="Content and studies for myself and others" />
            </Head>

            <Layout selectedMenu={LayoutMenu.articles}>
                <div>
                    A few articles...
                </div>
            </Layout>
        </>
        
    )
}