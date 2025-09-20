import { useEffect, useCallback, useMemo, useRef } from "react";
import { memo } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import CopyButton from "./CopyButton";
import { STYLES, TOAST_STYLES } from "./styles";

const CodeCopySimple = memo(function CodeCopySimple() {
  const observerRef = useRef<MutationObserver | undefined>(undefined);
  const enhancedElementsRef = useRef<Set<Element>>(new Set());

  const applyStyles = useCallback(
    (element: HTMLElement, styles: Record<string, string>) => {
      Object.entries(styles).forEach(([property, value]) => {
        element.style.setProperty(
          property.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`),
          value,
        );
      });
    },
    [],
  );

  const createLanguageLabel = useMemo(
    () =>
      (language: string): HTMLElement => {
        const languageLabel = document.createElement("span");
        languageLabel.className = `${STYLES.languageLabel} hidden md:inline-block`;
        languageLabel.textContent = language;
        applyStyles(languageLabel, STYLES.language);
        return languageLabel;
      },
    [applyStyles],
  );

  const extractLanguage = useMemo(
    () =>
      (codeElement: HTMLElement): string | undefined => {
        const codeClasses = codeElement.className || "";
        const languageMatch = codeClasses.match(/(?:language|lang)-(\w+)/);
        return languageMatch ? languageMatch[1] : undefined;
      },
    [],
  );

  const enhanceCodeBlock = useCallback(
    (preElement: Element) => {
      if (enhancedElementsRef.current.has(preElement)) return;

      const element = preElement as HTMLElement;
      const codeElement = element.querySelector("code");

      if (!codeElement || element.hasAttribute("data-copy-enhanced")) return;

      const codeText = codeElement.textContent || "";
      if (codeText.trim().length === 0) return;

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const language = extractLanguage(codeElement);

      element.style.position = "relative";
      element.setAttribute("data-copy-enhanced", "true");

      const buttonContainer = document.createElement("div");
      buttonContainer.className = STYLES.buttonContainer;

      if (language) {
        buttonContainer.appendChild(createLanguageLabel(language));
      }

      const reactContainer = document.createElement("div");
      const root = ReactDOM.createRoot(reactContainer);
      root.render(
        <CopyButton
          codeText={codeText}
          isMobile={isMobile}
          onCopy={() => {
            if (navigator.vibrate) {
              navigator.vibrate(50);
            }
          }}
        />,
      );

      buttonContainer.appendChild(reactContainer);
      element.appendChild(buttonContainer);

      enhancedElementsRef.current.add(preElement);
    },
    [createLanguageLabel, extractLanguage],
  );

  const observerCallback = useMemo(
    () => (mutations: MutationRecord[]) => {
      const shouldReEnhance = mutations.some(
        (mutation) =>
          mutation.type === "childList" &&
          Array.from(mutation.addedNodes).some(
            (node) =>
              node.nodeType === Node.ELEMENT_NODE &&
              ((node as Element).querySelector("pre") ||
                (node as Element).tagName === "PRE"),
          ),
      );

      if (shouldReEnhance) {
        requestAnimationFrame(() => {
          document
            .querySelectorAll("pre:not([data-copy-enhanced])")
            .forEach(enhanceCodeBlock);
        });
      }
    },
    [enhanceCodeBlock],
  );

  useEffect(() => {
    observerRef.current = new MutationObserver(observerCallback);

    requestAnimationFrame(() => {
      document
        .querySelectorAll("pre:not([data-copy-enhanced])")
        .forEach(enhanceCodeBlock);
    });

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observerRef.current?.disconnect();
      enhancedElementsRef.current.forEach((element) => {
        element.removeAttribute("data-copy-enhanced");
        const container = element.querySelector(`.${STYLES.buttonContainer}`);
        container?.remove();
      });
      enhancedElementsRef.current.clear();
    };
  }, [enhanceCodeBlock, observerCallback]);

  return (
    <>
      <Toaster position="bottom-right" toastOptions={TOAST_STYLES} />
      {null}
    </>
  );
});

export default CodeCopySimple;
