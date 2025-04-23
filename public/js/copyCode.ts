// src/scripts/copyCode.ts

function getChildByTagName(
  element: Element,
  tagName: string
): Element | undefined {
  return Array.from(element.children).find(
    (child) => child.tagName === tagName.toUpperCase()
  );
}

function copyCode(event: MouseEvent) {
  const codeBlock = getChildByTagName(
    (event.currentTarget as HTMLElement)?.parentElement?.parentElement!,
    "code"
  );
  if (!codeBlock) return;

  navigator.clipboard.writeText(codeBlock.textContent || "").then(() => {
    const svg = getChildByTagName(event.currentTarget as HTMLElement, "svg");
    const use = getChildByTagName(svg!, "use");

    if (use instanceof SVGUseElement) {
      use.setAttribute("href", "/copy.svg#filled");
    }

    (event.currentTarget as HTMLElement).setAttribute(
      "aria-label",
      "Code copied!"
    );
    setTimeout(() => {
      if (use instanceof SVGUseElement) {
        use.setAttribute("href", "/copy.svg#empty");
      }
      (event.currentTarget as HTMLElement).setAttribute(
        "aria-label",
        "Copy code to clipboard"
      );
    }, 2000);
  });
}

export default function initCopyCode() {
  const codeBlocks = document.querySelectorAll("pre:has(code)");

  codeBlocks.forEach((code) => {
    // button icon
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "/copy.svg#empty");

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("copy-svg");
    svg.appendChild(use);

    // create button
    const btn = document.createElement("button");
    btn.appendChild(svg);
    btn.classList.add("copy-btn");
    btn.addEventListener("click", copyCode);

    // container
    const container = document.createElement("div");
    container.classList.add("copy-cnt");
    container.appendChild(btn);

    code.classList.add("relative");
    code.appendChild(container);
  });
}
