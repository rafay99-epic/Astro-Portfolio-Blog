import { getCollection, type CollectionEntry } from "astro:content";
import { featureFlags } from "@config/featureFlag/featureFlag.json";
import { PostSchema } from "../../types/articles";

export async function GET({}: { request: Request }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://www.rafay99.com",
    "Cache-Control": "public, max-age=3600",
    ETag: crypto.randomUUID(),
  };

  try {
    if (!featureFlags.showBlog) {
      return new Response(
        JSON.stringify({ error: "Blog feature is disabled" }),
        {
          status: 403,
          headers: headers,
        },
      );
    }

    const posts = await getCollection("blog");

    const filteredPosts = posts.filter(
      (post: CollectionEntry<"blog">) => !post.data.draft,
    );

    // Validate posts with Zod before returning
    const validatedPosts = filteredPosts.map(
      (post: CollectionEntry<"blog">) => {
        try {
          return PostSchema.parse({
            id: post.id,
            slug: post.slug,
            body: post.body,
            collection: post.collection,
            data: post.data,
          });
        } catch (error) {
          console.error("Validation error for post:", post.slug, error);
          throw error;
        }
      },
    );

    return new Response(JSON.stringify(validatedPosts), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch blog posts" }),
      {
        status: 500,
        headers: headers,
      },
    );
  }
}
