import Head from "next/head";
import Layout from "../components/layout";
import content from "../contents/projects.content";
import LayoutMenu from "../models/menu";
import { useDefaultPageElements } from "../models/page";

export default function Projects() {
    const { ts } = useDefaultPageElements();

    return (
        <>
            <Head>
                <title>{ts(content.title)} | Vinicius Quinafelex Alves</title>
                <meta name="description" content={ts(content.description)} />
            </Head>

            <Layout selectedMenu={LayoutMenu.projects}>
                <div>
                    {ts(content.projects)}
                </div>
            </Layout>
        </>
    )
}