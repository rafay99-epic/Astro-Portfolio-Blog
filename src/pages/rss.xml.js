import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");

  const rssItems = posts.map((post) => {
    const { title, description, pubDate, author } = post.data;
    return {
      title,
      description,
      pubDate,
      link: `/blog/${post.slug}/`,
      author: author?.name,
      authorImage: author?.image,
    };
  });

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: rssItems,
  });
}
