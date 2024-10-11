// import rss from "@astrojs/rss";
// import { getCollection } from "astro:content";
// import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

// export async function GET(context) {
//   const posts = await getCollection("blog");

//   return rss({
//     title: SITE_TITLE,
//     description: SITE_DESCRIPTION,
//     site: context.site,
//     items: posts.map((post) => ({
//       title: post.data.title,
//       description: post.data.description,
//       pubDate: post.data.pubDate,
//       link: `/blog/${post.slug}/`,
//       author: post.data.authorName,
//     })),
//   });
// }

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");

  const staticPages = [
    {
      title: "Newsletter",
      description: "Stay updated by subscribing to our newsletter.",
      pubDate: new Date(),
      link: "/newsletter/",
      author: "Website Team",
    },
  ];

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
