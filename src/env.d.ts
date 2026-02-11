declare module "*.json" {
	const value: unknown;
	export default value;
	export const featureFlags: unknown;
}

// Mailchimp form integration types
interface Window {
	fnames?: string[];
	ftypes?: string[];
}
