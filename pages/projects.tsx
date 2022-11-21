import Head from "next/head";
import Layout from "../components/layout";
import ProjectCard from "../components/project.card";
import { SiteTitle } from "../components/site.title";
import content from "../contents/projects.content";
import LayoutMenu from "../models/menu";
import { useDefaultPageElements } from "../models/page";
import ProjectSource from "../sources/project.source";

export default function ProjectsPage() {
    const { ts } = useDefaultPageElements();

    return (
        <>
            <Head>
                {SiteTitle.format(ts(content.title))}
                <meta name="description" content={ts(content.description)} />
            </Head>

            <Layout selectedMenu={LayoutMenu.projects}>
                {
                    ProjectSource
                        .listAll()
                        .map((project, index) => {
                            return <ProjectCard key={index} project={project}></ProjectCard>
                        })
                }
            </Layout>
        </>
    )
}