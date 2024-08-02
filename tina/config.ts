import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: "f9e7e817-a733-46ea-a550-60f79d2efdf9",
  // Get this from tina.io
  token: "1e908eb7807456f91629902ceaf07c03f8fc849f",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "/src/content/blog",
        fields: [
          {
            type: "string",
            name: "title",
            label: "title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "description",
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "publishedDate",
            required: true,
          },
          {
            type: "image",
            name: "heroImage",
            label: "heroImage",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: "99e542c32b225bbb79db114de3134b528fa6325a",
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
