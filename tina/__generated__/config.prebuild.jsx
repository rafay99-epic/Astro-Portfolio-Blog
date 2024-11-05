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
      mediaRoot: "public",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // Blog Collection
      {
        name: "post",
        label: "Articles",
        path: "/src/content/blog",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Article Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Article Description",
            required: true
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publish Date",
            required: true
          },
          {
            type: "boolean",
            name: "draft",
            label: "draft",
            required: true
          },
          {
            type: "image",
            name: "heroImage",
            label: "Thubnail Image",
            required: false
          },
          {
            type: "string",
            name: "authorName",
            label: "Author Name",
            required: false
          },
          {
            type: "image",
            name: "authorAvatar",
            label: "Author Avatar",
            required: false
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: false
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            required: false,
            ui: {
              component: "tags"
            }
          }
        ]
      },
      // Newsletter Collection
      {
        name: "newsletter",
        label: "Newsletters",
        path: "/src/content/newsletter",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Newsletter Title",
            required: true
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            required: true
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publish Date",
            required: true
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      // Project Collection
      {
        name: "projects",
        label: "Projects",
        path: "/src/content/projects",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "Projecttitle",
            label: "Project Title",
            required: true
          },
          {
            type: "string",
            name: "ProjectDescription",
            label: "project Description",
            required: true
          },
          {
            type: "image",
            name: "ProjectImage",
            label: "Project Thumbnail",
            required: true
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            required: true
          },
          {
            type: "string",
            name: "ProjectTech",
            label: "Project Tech",
            list: true,
            required: false,
            ui: {
              component: "tags"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
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
