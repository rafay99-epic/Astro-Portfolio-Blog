import type { RefObject } from "react";

export interface StyleValue {
  [key: string]: string;
}

export interface Styles {
  buttonContainer: string;
  languageLabel: string;
  copyButton: string;
  mobileButton: string;
  default: StyleValue;
  hover: StyleValue;
  success: StyleValue;
  language: StyleValue;
}

export interface CopyButtonProps {
  codeText: string;
  isMobile: boolean;
  onCopy: () => void;
}

export interface UseCopyButtonProps {
  buttonRef: RefObject<HTMLButtonElement | null>;
  codeText: string;
  onCopy: () => void;
  toastStyles: any;
}
