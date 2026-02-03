import { getCollection, type CollectionEntry } from "astro:content";
import { featureFlags } from "@config/featureFlag/featureFlag.json";
import { NewsletterSchema } from "../../types/newsletter_types";

export async function GET() {
  const header = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://www.rafay99.com",
    "Cache-Control": "public, max-age=3600",
    ETag: crypto.randomUUID(),
  };
  try {
    if (!featureFlags.showNewsletter) {
      return new Response(
        JSON.stringify({ error: "Newsletter Read is disabled" }),
        {
          status: 403,
          headers: header,
        },
      );
    }

    const posts = await getCollection("newsletter");

    const filteredPosts = posts.filter(
      (post: CollectionEntry<"newsletter">) => !post.data.draft,
    );

    // Validate newsletters with Zod before returning
    const validatedNewsletters = filteredPosts.map(
      (newsletter: CollectionEntry<"newsletter">) => {
        try {
          return NewsletterSchema.parse({
            slug: newsletter.slug,
            data: newsletter.data,
          });
        } catch (error) {
          console.error(
            "Validation error for newsletter:",
            newsletter.slug,
            error,
          );
          throw error;
        }
      },
    );

    return new Response(JSON.stringify(validatedNewsletters), {
      status: 200,
      headers: header,
    });
  } catch (error) {
    console.error("Error fetching newsletter posts:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch newsletter posts" }),
      {
        status: 500,
        headers: header,
      },
    );
  }
}
