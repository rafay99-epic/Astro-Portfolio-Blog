import { z } from "zod";
import type { RefObject } from "react";

export const StyleValueSchema = z.record(z.string(), z.string());

export const StylesSchema = z.object({
  buttonContainer: z.string(),
  languageLabel: z.string(),
  copyButton: z.string(),
  mobileButton: z.string(),
  default: StyleValueSchema,
  hover: StyleValueSchema,
  success: StyleValueSchema,
  language: StyleValueSchema,
});

export const CopyButtonPropsSchema = z.object({
  codeText: z.string(),
  isMobile: z.boolean(),
  onCopy: z.any(), // Function type - validated at TypeScript level
});

export const UseCopyButtonPropsSchema = z.object({
  buttonRef: z.custom<RefObject<HTMLButtonElement | null>>(),
  codeText: z.string(),
  onCopy: z.any(), // Function type - validated at TypeScript level
  toastStyles: z.any(),
});

export type StyleValue = z.infer<typeof StyleValueSchema>;
export type Styles = z.infer<typeof StylesSchema>;
export type CopyButtonProps = z.infer<typeof CopyButtonPropsSchema>;
export type UseCopyButtonProps = z.infer<typeof UseCopyButtonPropsSchema>;
