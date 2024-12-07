const codeBlocks = document.querySelectorAll("pre:has(code)");

//add copy btn to every code block on the dom
codeBlocks.forEach((code) => {
  //button icon
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "/copy.svg#empty");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("copy-svg");
  svg.appendChild(use);

  //create button
  const btn = document.createElement("button");
  btn.appendChild(svg);
  btn.classList.add("copy-btn");
  btn.addEventListener("click", (e) => copyCode(e));

  //container to fix copy button
  const container = document.createElement("div");
  container.classList.add("copy-cnt");
  container.appendChild(btn);

  //add to code block
  code.classList.add("relative");
  code.appendChild(container);
});

/**
 * @param {MouseEvent} event
 */

function copyCode(event) {
  let codeBlock = getChildByTagName(
    event.currentTarget.parentElement.parentElement,
    "CODE"
  );
  if (!codeBlock) return;

  navigator.clipboard
    .writeText(codeBlock.innerText)
    .then(() => {
      const use = getChildByTagName(
        getChildByTagName(event.currentTarget, "svg"),
        "use"
      );
      if (!use) return;

      use.setAttribute("href", "/copy.svg#filled");
      event.currentTarget.setAttribute("aria-label", "Code copied!");

      setTimeout(() => {
        use.setAttribute("href", "/copy.svg#empty");
        event.currentTarget.setAttribute(
          "aria-label",
          "Copy code to clipboard"
        );
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
      event.currentTarget.setAttribute("aria-label", "Failed to copy code");
    });
}

function getChildByTagName(element, tagName) {
  return Array.from(element.children).find(
    (child) => child.tagName === tagName
  );
}
