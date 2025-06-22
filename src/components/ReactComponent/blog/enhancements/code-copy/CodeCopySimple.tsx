import React, { useEffect } from "react";
import { memo } from "react";

const CodeCopySimple = memo(function CodeCopySimple() {
  useEffect(() => {
    const enhanceCodeBlocks = () => {
      const preElements = document.querySelectorAll(
        "pre:not([data-copy-enhanced])"
      );

      preElements.forEach((preElement, index) => {
        const element = preElement as HTMLElement;
        const codeElement = element.querySelector("code");

        if (!codeElement) return;

        const codeText = codeElement.textContent || "";
        if (codeText.trim().length === 0) return;

        const codeClasses = codeElement.className || "";
        const languageMatch = codeClasses.match(/(?:language|lang)-(\w+)/);
        const language = languageMatch ? languageMatch[1] : undefined;

        element.style.position = "relative";

        element.setAttribute("data-copy-enhanced", "true");

        const buttonContainer = document.createElement("div");
        buttonContainer.className =
          "absolute top-3 right-3 flex items-center gap-2 z-10";

        if (language) {
          const languageLabel = document.createElement("span");
          languageLabel.className = "text-xs font-medium px-2 py-1 rounded";
          languageLabel.style.cssText =
            "color: #565f89; background: rgba(36, 40, 59, 0.8);";
          languageLabel.textContent = language;
          buttonContainer.appendChild(languageLabel);
        }

        const copyButton = document.createElement("button");
        copyButton.className =
          "flex items-center justify-center w-8 h-8 rounded-md border transition-all duration-200";
        copyButton.style.cssText = `
          background: rgba(36, 40, 59, 0.8);
          border-color: rgba(86, 95, 137, 0.3);
          color: #a9b1d6;
        `;
        copyButton.title = "Copy code";
        copyButton.setAttribute("aria-label", "Copy code to clipboard");

        copyButton.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        `;

        copyButton.addEventListener("mouseenter", () => {
          copyButton.style.background = "rgba(65, 72, 104, 0.5)";
          copyButton.style.borderColor = "rgba(122, 162, 247, 0.5)";
          copyButton.style.color = "#7aa2f7";
        });

        copyButton.addEventListener("mouseleave", () => {
          if (!copyButton.dataset.copied) {
            copyButton.style.background = "rgba(36, 40, 59, 0.8)";
            copyButton.style.borderColor = "rgba(86, 95, 137, 0.3)";
            copyButton.style.color = "#a9b1d6";
          }
        });

        copyButton.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(codeText);

            copyButton.dataset.copied = "true";
            copyButton.style.background = "rgba(158, 206, 106, 0.2)";
            copyButton.style.borderColor = "rgba(158, 206, 106, 0.5)";
            copyButton.style.color = "#9ece6a";
            copyButton.title = "Copied!";

            copyButton.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            `;

            setTimeout(() => {
              delete copyButton.dataset.copied;
              copyButton.style.background = "rgba(36, 40, 59, 0.8)";
              copyButton.style.borderColor = "rgba(86, 95, 137, 0.3)";
              copyButton.style.color = "#a9b1d6";
              copyButton.title = "Copy code";

              copyButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              `;
            }, 2000);
          } catch (err) {
            console.error("Failed to copy code:", err);

            const textArea = document.createElement("textarea");
            textArea.value = codeText;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
              document.execCommand("copy");
              copyButton.dataset.copied = "true";
              copyButton.style.background = "rgba(158, 206, 106, 0.2)";
              copyButton.style.borderColor = "rgba(158, 206, 106, 0.5)";
              copyButton.style.color = "#9ece6a";
              copyButton.title = "Copied!";
              copyButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              `;

              setTimeout(() => {
                delete copyButton.dataset.copied;
                copyButton.style.background = "rgba(36, 40, 59, 0.8)";
                copyButton.style.borderColor = "rgba(86, 95, 137, 0.3)";
                copyButton.style.color = "#a9b1d6";
                copyButton.title = "Copy code";
                copyButton.innerHTML = `
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                `;
              }, 2000);
            } catch (fallbackErr) {
              console.error("Fallback copy failed:", fallbackErr);
            } finally {
              document.body.removeChild(textArea);
            }
          }
        });

        buttonContainer.appendChild(copyButton);
        element.appendChild(buttonContainer);
      });
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
});

export default CodeCopySimple;
