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
  const target = event.currentTarget as HTMLElement;
  if (!target || !target.parentElement || !target.parentElement.parentElement) {
    console.error('Invalid DOM structure for copy button');
    return;
  }

  const codeBlock = getChildByTagName(
    target.parentElement.parentElement,
    "code"
  );
  if (!codeBlock) {
    console.error('Could not find code element to copy');
    return;
  }

  // ...rest of your copy logic
}
  navigator.clipboard.writeText(codeBlock.textContent || "")
    .then(() => {
      const svg = getChildByTagName(event.currentTarget as HTMLElement, "svg");
      if (!svg) {
        console.error('SVG element not found');
        return;
      }
      const use = getChildByTagName(svg, "use");
      if (!use) {
        console.error('Use element not found in SVG');
        return;
      }

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
    })
    .catch(err => {
      console.error('Failed to copy code to clipboard:', err);
      (event.currentTarget as HTMLElement).setAttribute(
        "aria-label",
        "Failed to copy"
      );
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
