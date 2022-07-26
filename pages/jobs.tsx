import Head from "next/head";
import Layout, { LayoutMenu } from "../components/layout";

export default function Jobs() {
    return (
        <>
            <Head>
                <title>VQA - Jobs</title>
                <meta name="description" content="Jobs I've done previously" />
            </Head>

            <Layout selectedMenu={LayoutMenu.jobs}>
                <div>
                    Things I worked with
                </div>
            </Layout>
        </>
    )
}