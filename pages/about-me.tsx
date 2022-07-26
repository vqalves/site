import Layout, { LayoutMenu } from "../components/layout";

export default function AboutMe() {
    return (
        <Layout selectedMenu={LayoutMenu.aboutMe}>
            <div>
                This is about me!
            </div>
        </Layout>
    )
}