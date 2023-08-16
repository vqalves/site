import ArticleSource from "../sources/article.source";

const Sitemap = () => {};

const domain = "https://www.vinafelex.com.br";

const createSitemap = (urls) => 
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `<url><loc>${domain}${url}</loc><changefreq>daily</changefreq></url>`).join("")}
</urlset>`;
	
export async function getServerSideProps({ res }) {      
	// const siteMapJson = await fetch(`https://www.exampleapi.com/getsitemap`);
	// const urlList = await siteMapJson.json();

    var urls = [ "", "/articles", "/projects" ];
    urls = urls.concat(ArticleSource.listAll().map(x => x.getRoute()));
    urls = urls.concat(urls.map(x => `/en-US${x}`));

	const sitemap = createSitemap(urls);
    
	res.setHeader("Content-Type", "text/xml");
	res.write(sitemap);
	res.end();
	return { props: { results : {}}}
};
export default Sitemap;