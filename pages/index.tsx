import Head from "next/head";
import Layout, { LayoutMenu } from "../components/layout";

export default function Home() {
  return (
    <>
        <Head>
            <title>VQA - About me</title>
            <meta name="description" content="Get to know a bit more about me" />
        </Head>
        
        <Layout selectedMenu={LayoutMenu.aboutMe}>
            <div>
                This is about me!
            </div>
        </Layout>
    </>
  );
}