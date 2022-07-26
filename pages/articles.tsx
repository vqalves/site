import Layout, { LayoutMenu } from "../components/layout";

export default function Articles() {
    return (
        <Layout selectedMenu={LayoutMenu.articles}>
            <div>
                A few articles...
            </div>
        </Layout>
    )
}