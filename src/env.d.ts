declare module "*.json" {
  const value: any;
  export default value;
  export const featureFlags: any;
}

// Mailchimp form integration types
interface Window {
  fnames?: string[];
  ftypes?: string[];
}
