declare module "*.json" {
  const value: any;
  export default value;
  export const featureFlags: any;
}

// Mailchimp form integration types
interface Window {
  fnames?: string[];
  ftypes?: string[];
  loadPyodide?: (options: { indexURL: string }) => Promise<any>;
}

// react-native-web type declaration
declare module "react-native-web" {
  const ReactNative: any;
  export = ReactNative;
}
