/**
 * TypeScript type definitions for LiveCodes SDK integration
 */

export type TemplateType =
  | "react"
  | "python"
  | "bash"
  | "html"
  | "react-native"
  | "typescript"
  | "javascript"
  | "vue"
  | "svelte";

export interface LanguageConfig {
  language: string;
  content: string;
}

export interface PlaygroundConfig {
  markup?: LanguageConfig;
  style?: LanguageConfig;
  script?: LanguageConfig;
  [key: string]: LanguageConfig | undefined;
}

export interface PlaygroundParams {
  console?: "open" | "closed";
  compiled?: "open" | "closed";
  tests?: "open" | "closed";
  [key: string]: string | undefined;
}

export interface LiveCodesPlaygroundOptions {
  template?: TemplateType;
  config?: PlaygroundConfig;
  params?: PlaygroundParams;
  view?: "editor" | "headless" | "result";
  readOnly?: boolean;
  height?: string;
  width?: string;
}

export interface LiveCodesPlaygroundProps {
  template?: TemplateType;
  initialCode?: {
    markup?: string;
    style?: string;
    script?: string;
  };
  height?: string;
  width?: string;
  title?: string;
  showConsole?: boolean;
  readOnly?: boolean;
  className?: string;
  id?: string;
}

export interface LiveCodesSDK {
  createPlayground: (
    container: string | HTMLElement,
    options?: LiveCodesPlaygroundOptions,
  ) => Promise<any>;
}

declare global {
  interface Window {
    livecodes?: LiveCodesSDK;
  }
}
