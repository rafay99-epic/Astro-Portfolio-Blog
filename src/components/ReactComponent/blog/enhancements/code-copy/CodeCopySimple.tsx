import React, { useEffect } from "react";
import { memo } from "react";

const STYLES = {
  buttonContainer: "absolute top-3 right-3 flex items-center gap-2 z-10",
  languageLabel: "text-xs font-medium px-2 py-1 rounded",
  copyButton:
    "flex items-center justify-center w-8 h-8 rounded-md border transition-all duration-200",

  default: {
    background: "rgba(36, 40, 59, 0.8)",
    borderColor: "rgba(86, 95, 137, 0.3)",
    color: "#a9b1d6",
  },
  hover: {
    background: "rgba(65, 72, 104, 0.5)",
    borderColor: "rgba(122, 162, 247, 0.5)",
    color: "#7aa2f7",
  },
  success: {
    background: "rgba(158, 206, 106, 0.2)",
    borderColor: "rgba(158, 206, 106, 0.5)",
    color: "#9ece6a",
  },
  language: {
    color: "#565f89",
    background: "rgba(36, 40, 59, 0.8)",
  },
} as const;

const ICONS = {
  copy: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  `,
  check: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20,6 9,17 4,12"></polyline>
    </svg>
  `,
} as const;

const applyStyles = (element: HTMLElement, styles: Record<string, string>) => {
  Object.entries(styles).forEach(([property, value]) => {
    element.style.setProperty(
      property.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`),
      value
    );
  });
};

const createLanguageLabel = (language: string): HTMLElement => {
  const languageLabel = document.createElement("span");
  languageLabel.className = STYLES.languageLabel;
  languageLabel.textContent = language;
  applyStyles(languageLabel, STYLES.language);
  return languageLabel;
};

const setCopyButtonState = (
  button: HTMLElement,
  state: "default" | "hover" | "success",
  icon: string,
  title: string
) => {
  const styles = STYLES[state];
  applyStyles(button, styles);
  button.innerHTML = icon;
  button.title = title;

  if (state === "success") {
    button.dataset.copied = "true";
  } else {
    delete button.dataset.copied;
  }
};

const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return fallbackCopy(text);
  }
};

const fallbackCopy = (text: string): boolean => {
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.cssText =
      "position: fixed; left: -999999px; top: -999999px;";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textArea);

    return success;
  } catch {
    return false;
  }
};

const createCopyButton = (codeText: string): HTMLElement => {
  const copyButton = document.createElement("button");
  copyButton.className = STYLES.copyButton;
  copyButton.setAttribute("aria-label", "Copy code to clipboard");

  setCopyButtonState(copyButton, "default", ICONS.copy, "Copy code");

  copyButton.addEventListener("mouseenter", () => {
    if (!copyButton.dataset.copied) {
      setCopyButtonState(copyButton, "hover", ICONS.copy, "Copy code");
    }
  });

  copyButton.addEventListener("mouseleave", () => {
    if (!copyButton.dataset.copied) {
      setCopyButtonState(copyButton, "default", ICONS.copy, "Copy code");
    }
  });

  copyButton.addEventListener("click", async () => {
    const success = await copyToClipboard(codeText);

    if (success) {
      setCopyButtonState(copyButton, "success", ICONS.check, "Copied!");

      setTimeout(() => {
        setCopyButtonState(copyButton, "default", ICONS.copy, "Copy code");
      }, 2000);
    } else {
      console.error("Failed to copy code to clipboard");
    }
  });

  return copyButton;
};

const extractLanguage = (codeElement: HTMLElement): string | undefined => {
  const codeClasses = codeElement.className || "";
  const languageMatch = codeClasses.match(/(?:language|lang)-(\w+)/);
  return languageMatch ? languageMatch[1] : undefined;
};

const enhanceCodeBlock = (preElement: Element, index: number): void => {
  const element = preElement as HTMLElement;
  const codeElement = element.querySelector("code");

  if (!codeElement) return;

  const codeText = codeElement.textContent || "";
  if (codeText.trim().length === 0) return;

  if (element.hasAttribute("data-copy-enhanced")) return;

  const language = extractLanguage(codeElement);

  element.style.position = "relative";
  element.setAttribute("data-copy-enhanced", "true");

  const buttonContainer = document.createElement("div");
  buttonContainer.className = STYLES.buttonContainer;

  if (language) {
    buttonContainer.appendChild(createLanguageLabel(language));
  }

  buttonContainer.appendChild(createCopyButton(codeText));

  element.appendChild(buttonContainer);
};

const CodeCopySimple = memo(function CodeCopySimple() {
  useEffect(() => {
    const enhanceCodeBlocks = () => {
      const preElements = document.querySelectorAll(
        "pre:not([data-copy-enhanced])"
      );
      preElements.forEach(enhanceCodeBlock);
    };

    enhanceCodeBlocks();

    const observer = new MutationObserver((mutations) => {
      let shouldReEnhance = false;

      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const addedNodes = Array.from(mutation.addedNodes);
          const hasCodeBlocks = addedNodes.some((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              return element.querySelector("pre") || element.tagName === "PRE";
            }
            return false;
          });

          if (hasCodeBlocks) {
            shouldReEnhance = true;
          }
        }
      });

      if (shouldReEnhance) {
        setTimeout(enhanceCodeBlocks, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
});

export default CodeCopySimple;
