// import rss from "@astrojs/rss";
// import {
//     getCollection
// } from "astro:content";
// import authorConfig from "@config/siteConfig/info.json";

// export async function GET(context) {
//     const posts = await getCollection("blog");

//     const sortedPosts = posts.sort((a, b) =>
//         new Date(b.data.pubDate) - new Date(a.data.pubDate)
//     );

//     return rss({
//         // stylesheet: "/rss/stylesheet.xsl",
//         title: authorConfig.SiteName,
//         description: authorConfig.SiteDescription,
//         site: context.site,
//         items: [
//             ...sortedPosts.map((post) => ({
//                 title: post.data.title,
//                 heroImage: post.data.heroImage,
//                 description: post.data.description,
//                 pubDate: post.data.pubDate,
//                 link: `/blog/${post.slug}/`,
//                 author: post.data.authorName,
//             })),

//         ],
//     });
// }
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
        items: sortedPosts.map((post) => {
            const baseUrl = context.site;
            const imageUrl = post.data.heroImage ?
                new URL(post.data.heroImage, baseUrl).href :
                null;

            return {
                title: post.data.title,
                description: post.data.description,
                pubDate: post.data.pubDate,
                link: `/blog/${post.slug}/`,
                author: post.data.authorName,
                ...(imageUrl && {
                    enclosure: {
                        url: imageUrl,
                        length: 0, // Required but can be 0 if unknown
                        type: "image/webp", // Adjust based on your image type or detect dynamically
                    },
                }),
            };
        }),
    });
}