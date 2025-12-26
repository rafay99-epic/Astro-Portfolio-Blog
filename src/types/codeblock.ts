import { z } from "zod";
import type { RefObject } from "react";

export const StyleValueSchema = z.record(z.string(), z.string());

const ToastPositionSchema = z.enum([
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
]);

export const ToastStyleSchema = z.object({
  style: StyleValueSchema.optional(),
  iconTheme: z
    .object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
    })
    .optional(),
  className: z.string().optional(),
  duration: z.number().optional(),
  id: z.string().optional(),
  position: ToastPositionSchema.optional(),
});

export const ToastStylesSchema = z.object({
  success: ToastStyleSchema.optional(),
  error: ToastStyleSchema.optional(),
});

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
  onCopy: z.function().args().returns(z.void()),
});

export const UseCopyButtonPropsSchema = z.object({
  buttonRef: z.custom<RefObject<HTMLButtonElement | null>>(),
  codeText: z.string(),
  onCopy: z.function().args().returns(z.void()),
  toastStyles: ToastStylesSchema,
});

export type StyleValue = z.infer<typeof StyleValueSchema>;
export type ToastStyle = z.infer<typeof ToastStyleSchema>;
export type ToastStyles = z.infer<typeof ToastStylesSchema>;
export type Styles = z.infer<typeof StylesSchema>;
export type CopyButtonProps = z.infer<typeof CopyButtonPropsSchema>;
export type UseCopyButtonProps = z.infer<typeof UseCopyButtonPropsSchema>;
