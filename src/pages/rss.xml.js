import rss from "@astrojs/rss";
import {
    getCollection
} from "astro:content";
import authorConfig from "@config/siteConfig/info.json";

export async function GET(context) {
    const posts = await getCollection("blog");

    const sortedPosts = posts.sort((a, b) =>
        new Date(b.data.pubDate) - new Date(a.data.pubDate)
    );

    return rss({
        stylesheet: "/rss/stylesheet.xsl",
        title: authorConfig.SiteName,
        description: authorConfig.SiteDescription,
        site: context.site,
        items: [
            ...sortedPosts.map((post) => ({
                title: post.data.title,
                description: post.data.description,
                pubDate: post.data.pubDate,
                link: `/blog/${post.slug}/`,
                author: post.data.authorName,
            })),

        ],
    });
}