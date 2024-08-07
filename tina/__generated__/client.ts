import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '8824be588169be37ca1b34e4e50b4ed5715f6040', queries });
export default client;
  