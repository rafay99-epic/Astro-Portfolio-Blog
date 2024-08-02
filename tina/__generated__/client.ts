import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'https://content.tinajs.io/1.4/content/ca928060-14c1-452c-938e-9a1e7feaae19/github/main', token: '8824be588169be37ca1b34e4e50b4ed5715f6040', queries,  });
export default client;
  