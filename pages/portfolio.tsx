import Layout, { LayoutMenu } from "../components/layout";

export default function Portfolio() {
    return (
        <Layout selectedMenu={LayoutMenu.portfolio}>
            <div>
                Things I worked with
            </div>
        </Layout>
    )
}