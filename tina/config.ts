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
            type: "boolean",
            name: "archived",
            label: "Archived",
            required: true,
            description:
              "Archive posts to move them under /blog/archive and hide from regular listings/search.",
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
            description:
              "Keywords for better search engine optimization (optional)",
            ui: {
              component: "tags",
            },
          },
          {
            type: "string",
            name: "canonicalUrl",
            label: "Canonical URL",
            required: false,
            description:
              "Custom canonical URL (only needed for content migration or cross-domain)",
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
            description:
              "Custom meta description for search engines (150-160 characters recommended)",
            ui: {
              component: "textarea",
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
        name: "ms_notes",
        label: "MS Notes",
        path: "/src/content/ms_notes",
        format: "md",
        fields: [
          {
            type: "string",
            name: "lecture_title",
            label: "MS Note Title",
            required: true,
          },
          {
            type: "string",
            name: "lecture_description",
            label: "MS Note Description",
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
            name: "lecture_draft",
            label: "Draft",
            required: true,
          },
          {
            type: "string",
            name: "lectureNumber",
            label: "Lecture Number",
            required: true,
          },
          {
            type: "string",
            name: "subject",
            label: "Subject",
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
      {
        name: "featureFlags",
        label: "Feature Flags",
        path: "/src/config/featureFlag",
        format: "json",
        fields: [
          {
            type: "object",
            name: "featureFlags",
            label: "Feature Flags",
            fields: [
              {
                type: "boolean",
                name: "showBlog",
                label: "Show Blog",
                required: true,
              },
              {
                type: "boolean",
                name: "showAbout",
                label: "Show About",
                required: true,
              },
              {
                type: "boolean",
                name: "showContact",
                label: "Show Contact",
                required: true,
              },
              {
                type: "boolean",
                name: "showProjects",
                label: "Show Projects",
                required: true,
              },
              {
                type: "boolean",
                name: "showIndex",
                label: "Show Index",
                required: true,
              },
              {
                type: "boolean",
                name: "showTags",
                label: "Show Tags",
                required: true,
              },
              {
                type: "boolean",
                name: "showExperience",
                label: "Show Experience",
                required: true,
              },
              {
                type: "boolean",
                name: "showSearch",
                label: "Show Search",
                required: true,
              },
              {
                type: "boolean",
                name: "showNewsletter",
                label: "Show Newsletter",
                required: true,
              },
              {
                type: "boolean",
                name: "showPrivacy",
                label: "Show Privacy",
                required: true,
              },
              {
                type: "boolean",
                name: "showTermsOfService",
                label: "Show Terms of Service",
                required: true,
              },
              {
                type: "boolean",
                name: "showSubNewsletter",
                label: "Show Sub Newsletter",
                required: true,
              },
              {
                type: "boolean",
                name: "showTrendingPosts",
                label: "Show Trending Posts",
                required: true,
              },
              {
                type: "boolean",
                name: "showTermsandConditions",
                label: "Show Terms and Conditions",
                required: true,
              },
              {
                type: "boolean",
                name: "showPrivacyPolicy",
                label: "Show Privacy Policy",
                required: true,
              },
              {
                type: "boolean",
                name: "showWiki",
                label: "Show Wiki",
                required: true,
              },
              {
                type: "boolean",
                name: "showNotes",
                label: "Show Notes",
                required: true,
              },
              {
                type: "boolean",
                name: "showWhatsNew",
                label: "Show What's New",
                required: true,
              },

              {
                type: "boolean",
                name: "enableViewTransition",
                label: "Enable View Transition",
                required: true,
              },
              {
                type: "boolean",
                name: "enableCoreServices",
                label: "Enable Core Services",
                required: true,
              },
              {
                type: "boolean",
                name: "enableProcessShowcase",
                label: "Enable Process Showcase",
                required: true,
              },
              {
                type: "boolean",
                name: "enablePortfolioSection",
                label: "Enable Portfolio Section",
                required: true,
              },
              {
                type: "boolean",
                name: "enableTestimonialsSection",
                label: "Enable Testimonials Section",
                required: true,
              },
              {
                type: "boolean",
                name: "enableSkillsShowcase",
                label: "Enable Skills Showcase",
                required: true,
              },
              {
                type: "boolean",
                name: "enableContactMap",
                label: "Enable Contact Map",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "FeatureFlagsApi",
            label: "Feature Flags API",
            fields: [
              {
                type: "boolean",
                name: "enableauthorInfoAPI",
                label: "Enable Author Info API",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "siteConfig",
        label: "Site Configuration",
        path: "/src/config/siteConfig",
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
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "name",
            label: "Your Name",
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
            label: "Profile Picture",
            required: true,
          },
          {
            type: "image",
            name: "avator",
            label: "Avatar",
            required: true,
          },
          {
            type: "string",
            name: "tag_line",
            label: "Tag Line",
            required: true,
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Social Links",
            fields: [
              {
                type: "string",
                name: "twitter",
                label: "Twitter URL",
                required: false,
              },
              {
                type: "string",
                name: "linkedin",
                label: "LinkedIn Username",
                required: false,
              },
              {
                type: "string",
                name: "github",
                label: "GitHub URL",
                required: false,
              },
              {
                type: "string",
                name: "upwork",
                label: "Upwork URL",
                required: false,
              },
              {
                type: "string",
                name: "youtube",
                label: "YouTube URL",
                required: false,
              },
              {
                type: "string",
                name: "whatsNumber",
                label: "WhatsApp Number",
                required: false,
              },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About Section",
            fields: [
              {
                type: "string",
                name: "whoAmI",
                label: "Who Am I",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "lifeBeyondCode",
                label: "Life Beyond Code",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "continuousLearning",
                label: "Continuous Learning",
                required: true,
                ui: {
                  component: "textarea",
                },
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
                required: true,
              },
              {
                type: "string",
                name: "tools",
                label: "Tools",
                list: true,
                required: true,
                ui: {
                  component: "tags",
                },
              },
            ],
          },
          {
            type: "object",
            name: "workExperience",
            label: "Work Experience",
            list: true,
            fields: [
              {
                type: "string",
                name: "companyName",
                label: "Company Name",
                required: true,
              },
              {
                type: "string",
                name: "position",
                label: "Position",
                required: true,
              },
              {
                type: "string",
                name: "employmentTime",
                label: "Employment Time",
                required: true,
              },
              {
                type: "string",
                name: "roles",
                label: "Roles",
                list: true,
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "toolsUsed",
                label: "Tools Used",
                list: true,
                required: true,
                ui: {
                  component: "tags",
                },
              },
            ],
          },
          {
            type: "object",
            name: "testimonials",
            label: "Testimonials",
            list: true,
            fields: [
              {
                type: "number",
                name: "id",
                label: "ID",
                required: true,
              },
              {
                type: "string",
                name: "name",
                label: "Name",
                required: true,
              },
              {
                type: "string",
                name: "position",
                label: "Position",
                required: true,
              },
              {
                type: "string",
                name: "company",
                label: "Company",
                required: true,
              },
              {
                type: "image",
                name: "avatar",
                label: "Avatar",
                required: true,
              },
              {
                type: "number",
                name: "rating",
                label: "Rating",
                required: true,
              },
              {
                type: "string",
                name: "testimonial",
                label: "Testimonial",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "project",
                label: "Project",
                required: true,
              },
              {
                type: "string",
                name: "technologies",
                label: "Technologies",
                list: true,
                required: true,
                ui: {
                  component: "tags",
                },
              },
            ],
          },
          {
            type: "object",
            name: "services",
            label: "Services",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "icon",
                label: "Icon (Emoji)",
                required: true,
              },
              {
                type: "string",
                name: "features",
                label: "Features",
                list: true,
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "technologies",
                label: "Technologies",
                list: true,
                required: true,
                ui: {
                  component: "tags",
                },
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
