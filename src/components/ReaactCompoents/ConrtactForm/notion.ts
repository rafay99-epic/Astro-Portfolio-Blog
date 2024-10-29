import { Client } from "@notionhq/client";
let notionAPI = import.meta.env.PUBLIC_NOTION_KEY;
const notion = new Client({
  auth: notionAPI,
});

const DATABASE_ID = import.meta.env.PUBLIC_NOTION_DATABASE_ID;

export async function addContactToNotion(
  name: string,
  email: string,
  message: string
) {
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
