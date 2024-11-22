import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import authorConfig from "@config/siteConfig/info.json";

export async function GET(context) {
  const posts = await getCollection("blog");

  const staticPages = [
    {
      title: "Newsletter",
      description: "Stay updated by subscribing to our newsletter.",
      pubDate: new Date(),
      link: "/newsletter/",
      author: authorConfig.name,
    },
  ];

  return rss({
    title: authorConfig.SiteName,
    description: authorConfig.SiteDescription,
    site: context.site,
    items: [
      ...posts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.slug}/`,
        author: post.data.authorName,
      })),

      ...staticPages,
    ],
  });
}
