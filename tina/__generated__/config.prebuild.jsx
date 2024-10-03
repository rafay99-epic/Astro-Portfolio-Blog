// tina/config.ts
import { defineConfig } from "tinacms";
var branch = "main";
var config_default = defineConfig({
  branch,
  clientId: "ca928060-14c1-452c-938e-9a1e7feaae19",
  token: "8824be588169be37ca1b34e4e50b4ed5715f6040",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
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
            label: "Title",
            name: "title",
            required: true
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            required: true
          },
          {
            type: "datetime",
            label: "Publish Date",
            name: "pubDate",
            required: true
          },
          {
            type: "datetime",
            label: "Updated Date",
            name: "updatedDate",
            required: false
          },
          {
            type: "image",
            label: "Hero Image",
            name: "heroImage",
            required: false
          },
          {
            type: "boolean",
            label: "Draft",
            name: "draft",
            required: true
          },
          {
            type: "object",
            label: "Author",
            name: "author",
            fields: [
              {
                type: "string",
                label: "Name",
                name: "name",
                required: false
              },
              {
                type: "image",
                label: "Image",
                name: "image",
                required: false
              }
            ]
          }
        ]
      }
    ]
  },
  search: {
    tina: {
      indexerToken: "4d255fd2c6b48ce0fb6de0ca4f700b90f04033fc",
      stopwordLanguages: ["eng"]
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  }
});
export {
  config_default as default
};
