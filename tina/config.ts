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
        ],
      },
      // newsletter
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
      /// projects
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
      // site config
      {
        name: "siteConfig",
        label: "Site Configuration",
        path: "/src/util",
        format: "json",
        fields: [
          {
            type: "string",
            name: "SiteName",
            label: "Site Name",
            required: true,
          },
          {
            type: "string",
            name: "SiteDescription",
            label: "Site Description",
            required: true,
          },
          {
            type: "string",
            name: "name",
            label: "Author Name",
            required: true,
          },
          {
            type: "string",
            name: "jobTitle",
            label: "Job Title",
            required: true,
          },
          {
            type: "string",
            name: "position",
            label: "Position",
            required: true,
          },
          {
            type: "image",
            name: "picture",
            label: "Picture",
            required: false,
          },
          {
            type: "image",
            name: "avator",
            label: "Avatar",
            required: false,
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Social Links",
            fields: [
              { type: "string", name: "twitter", label: "Twitter" },
              { type: "string", name: "linkedin", label: "LinkedIn" },
              { type: "string", name: "github", label: "GitHub" },
              { type: "string", name: "upwork", label: "Upwork" },
              { type: "string", name: "youtube", label: "YouTube" },
              { type: "string", name: "whatsNumber", label: "WhatsApp Number" },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About",
            fields: [
              { type: "string", name: "whoAmI", label: "Who Am I" },
              {
                type: "string",
                name: "lifeBeyondCode",
                label: "Life Beyond Code",
              },
              {
                type: "string",
                name: "continuousLearning",
                label: "Continuous Learning",
              },
            ],
          },
          {
            type: "object",
            name: "techStack",
            label: "Tech Stack",
            list: true,
            fields: [
              {
                type: "string",
                name: "category",
                label: "Category",
              },
              {
                type: "string",
                name: "tools",
                label: "Tools",
                list: true,
              },
            ],
          },
          {
            type: "object",
            name: "workExperience",
            label: "Work Experience",
            list: true,
            fields: [
              { type: "string", name: "companyName", label: "Company Name" },
              { type: "string", name: "position", label: "Position" },
              {
                type: "string",
                name: "employmentTime",
                label: "Employment Time",
              },
              {
                type: "string",
                name: "roles",
                label: "Roles",
                list: true,
              },
              {
                type: "string",
                name: "toolsUsed",
                label: "Tools Used",
                list: true,
              },
            ],
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
