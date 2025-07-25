/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// JSON module declarations
declare module "*.json" {
  const value: any;
  export default value;
  export const featureFlags: any;
}
