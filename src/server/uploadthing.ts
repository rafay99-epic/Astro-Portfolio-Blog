import { createUploadthing, type FileRouter } from "uploadthing/server";
import { FeatureFlagsApi } from "../config/featureFlag/featureFlag.json";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// Check if uploadthing is enabled
const isUploadThingEnabled = () => {
  return FeatureFlagsApi.enableUploadThing;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 4,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // Check if feature is enabled
      if (!isUploadThingEnabled()) {
        throw new Error("File upload feature is currently disabled");
      }

      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Check if feature is enabled
      if (!isUploadThingEnabled()) {
        throw new Error("File upload feature is currently disabled");
      }

      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return {
        uploadedBy: metadata.userId,
        url: file.url, // or file.ufsUrl if that's what you prefer
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
