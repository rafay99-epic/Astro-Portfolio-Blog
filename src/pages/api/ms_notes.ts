import { getCollection, type CollectionEntry } from "astro:content";
import { featureFlags } from "@config/featureFlag/featureFlag.json";
import { NoteSchema } from "../../types/notes";

export async function GET(_request: Request) {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=86400",
    "Access-Control-Allow-Origin": "https://www.rafay99.com",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  try {
    if (!featureFlags.showNotes) {
      return new Response(
        JSON.stringify({ error: "Notes feature is disabled" }),
        {
          status: 403,
          headers: headers,
        },
      );
    }

    const posts = await getCollection("ms_notes");

    const filteredPosts = posts.filter(
      (post: CollectionEntry<"ms_notes">) => !post.data.lecture_draft,
    );

    // Validate notes with Zod before returning
    const validatedNotes = filteredPosts.map(
      (note: CollectionEntry<"ms_notes">) => {
        try {
          return NoteSchema.parse({
            id: note.id,
            slug: note.slug,
            body: note.body,
            collection: note.collection,
            data: note.data,
          });
        } catch (error) {
          console.error("Validation error for note:", note.slug, error);
          throw error;
        }
      },
    );

    return new Response(JSON.stringify(validatedNotes), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Error fetching MS notes:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch MS Notes" }), {
      status: 500,
      headers: headers,
    });
  }
}
