import { Client } from "@notionhq/client";
import { FeatureFlagsApi } from "../../config/featureFlag";

const notionAPI = import.meta.env.PUBLIC_NOTION_KEY;
const DATABASE_ID = import.meta.env.PUBLIC_NOTION_DATABASE_ID;

let notion: Client | null = null;
if (FeatureFlagsApi.enableNotionAPI && notionAPI) {
  notion = new Client({
    auth: notionAPI,
  });
}

export async function addContactToNotion(
  name: string,
  email: string,
  message: string
) {
  if (!notion) {
    console.log("Notion API is disabled or the Notion API key is missing.");
    return;
  }

  try {
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        "Email Address": {
          email: email,
        },
        Message: {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
      },
    });
    return response;
  } catch (error) {
    console.error("Error saving to Notion:", error);
    throw error;
  }
}
