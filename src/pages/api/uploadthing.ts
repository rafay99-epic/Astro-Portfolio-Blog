import { createRouteHandler } from "uploadthing/server";
import { ourFileRouter } from "@server/uploadthing";
import { FeatureFlagsApi } from "@config/featureFlag/featureFlag.json";

// Check if uploadthing is enabled
const isUploadThingEnabled = () => {
  return FeatureFlagsApi.enableUploadThing;
};

// Export routes for Next App Router
const handlers = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: import.meta.env.UPLOADTHING_TOKEN,
  },
});

// Wrap the handlers to check feature flag
const wrappedHandlers = {
  GET: async (request: Request) => {
    if (!isUploadThingEnabled()) {
      return new Response(
        JSON.stringify({
          error: "File upload feature is currently disabled",
          code: "FEATURE_DISABLED",
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    return handlers(request);
  },
  POST: async (request: Request) => {
    if (!isUploadThingEnabled()) {
      return new Response(
        JSON.stringify({
          error: "File upload feature is currently disabled",
          code: "FEATURE_DISABLED",
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    return handlers(request);
  },
};

export { wrappedHandlers as GET, wrappedHandlers as POST };
