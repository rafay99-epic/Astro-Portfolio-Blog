import { defineConfig } from "tinacms";

const branch = "main";

export default defineConfig({
  branch,
  clientId: "ca928060-14c1-452c-938e-9a1e7feaae19",
  token: "8824be588169be37ca1b34e4e50b4ed5715f6040",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
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
            label: "Article Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Article Description",
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publish Date",
            required: true,
          },
          {
            type: "boolean",
            name: "draft",
            label: "draft",
            required: true,
          },
          {
            type: "image",
            name: "heroImage",
            label: "Thubnail Image",
            required: true,
          },
          {
            type: "string",
            name: "authorName",
            label: "Author Name",
            required: true,
          },
          {
            type: "image",
            name: "authorAvatar",
            label: "Author Avatar",
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
      indexerToken: "4d255fd2c6b48ce0fb6de0ca4f700b90f04033fc",
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
