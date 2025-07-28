import { defineConfig } from "tinacms";

const branch = "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,
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
        label: "Articles",
        path: "/src/content/blog",
        format: "mdx",
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
            label: "Draft",
            required: true,
          },
          {
            type: "image",
            name: "heroImage",
            label: "Thumbnail Image",
            required: false,
          },
          {
            type: "string",
            name: "authorName",
            label: "Author Name",
            required: false,
          },
          {
            type: "image",
            name: "authorAvatar",
            label: "Author Avatar",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            required: false,
            ui: {
              component: "tags",
            },
          },
          {
            type: "string",
            name: "keywords",
            label: "SEO Keywords",
            list: true,
            required: false,
            description: "Keywords for better search engine optimization (optional)",
            ui: {
              component: "tags",
            },
          },
          {
            type: "string",
            name: "canonicalUrl",
            label: "Canonical URL",
            required: false,
            description: "Custom canonical URL (only needed for content migration or cross-domain)",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Post",
            required: false,
            description: "Mark this post as featured/highlighted",
          },
          {
            type: "string",
            name: "excerpt",
            label: "SEO Excerpt",
            required: false,
            description: "Custom meta description for search engines (150-160 characters recommended)",
            ui: {
              component: "textarea",
            },
          },
        ],
      },
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
            required: true,
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
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
            label: "Draft",
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
            required: true,
          },
          {
            type: "string",
            name: "ProjectDescription",
            label: "Project Description",
            required: true,
          },
          {
            type: "image",
            name: "ProjectImage",
            label: "Project Thumbnail",
            required: true,
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            required: true,
          },
          {
            type: "string",
            name: "ProjectTech",
            label: "Project Tech",
            list: true,
            required: false,
            ui: {
              component: "tags",
            },
          },
          {
            type: "string",
            name: "ProjectCategory",
            label: "Project Category",
            list: true,
            required: false,
            ui: {
              component: "categories",
            },
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
      indexerToken: process.env.TINA_INDEXER_TOKEN!,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
