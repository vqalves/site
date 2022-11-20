import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import content from "../contents/about.content";
import LayoutMenu from "../models/menu";
import styles from "../styles/about.module.css";
import { useDefaultPageElements } from "../models/page";

export default function About() {
  const { ts } = useDefaultPageElements();

  return (
    <>
        <Head>
            <title>{ts(content.title)} | Vinicius Quinafelex Alves</title>
            <meta name="description" content={ts(content.description)} />
        </Head>
        
        <Layout selectedMenu={LayoutMenu.aboutMe}>
            <div className={styles.profile_section}>
              <div className={styles.profile_image}>
                <Image src="/images/profile.jpeg" width={500} height={500} alt={ts(content.photo)} />
              </div>

              <div className={styles.profile_text}>
                {ts(content.about)}
              </div>
            </div>
        </Layout>
    </>
  );
}

