import Head from "next/head";
import Layout from "../components/layout";
import content from "../contents/main.content";
import LayoutMenu from "../models/menu";
import { useDefaultPageElements } from "../models/page";

export default function Home() {
  const { ts } = useDefaultPageElements();

  return (
    <>
        <Head>
            <title>{ts(content.title)} | Vinicius Quinafelex Alves</title>
            <meta name="description" content={ts(content.description)} />
        </Head>
        
        <Layout selectedMenu={LayoutMenu.aboutMe}>
            <div>
                {ts(content.about)}
            </div>
        </Layout>
    </>
  );
}