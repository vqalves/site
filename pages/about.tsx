import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import content from "../contents/about.content";
import LayoutMenu from "../models/menu";
import styles from "../styles/about.module.css";
import { useDefaultPageElements } from "../models/page";
import { SiteTitle } from "../components/site.title";
import Configuration from "../sources/configuration";

export default function AboutPage() {
  const { ts } = useDefaultPageElements();

  return (
    <>
        <Head>
            {SiteTitle.format(ts(content.title))}
            <meta name="description" content={ts(content.description)} />
            
            <link rel="canonical" href={`${Configuration.domain}/about`} />
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

