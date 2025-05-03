import { createRouteHandler } from "uploadthing/server";

import { ourFileRouter } from "../../server/uploadthing";

// Export routes for Next App Router
const handlers = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: import.meta.env.UPLOADTHING_TOKEN,
  },
});
export { handlers as GET, handlers as POST };
