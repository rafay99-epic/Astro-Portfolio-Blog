function checkAdBlocker() {
  // Get the ad container element
  const adContainer: HTMLElement | null = document.getElementById(
    "container-75a9e4d4cdc61042594f971bcbc143dd"
  );
  const adBlockerMessage: HTMLElement | null =
    document.getElementById("ad-blocker-message");

  // Check if adContainer and adBlockerMessage are not null
  if (adContainer && adBlockerMessage) {
    // Check if the ad container is empty
    if (adContainer.innerHTML.trim().length === 0) {
      // Ad is not loaded, show the ad blocker message
      adBlockerMessage.style.display = "block";
    } else {
      // Ad is loaded, hide the ad blocker message
      adBlockerMessage.style.display = "none";
    }
  }
}

window.addEventListener("load", () => {
  setTimeout(checkAdBlocker, 1000);
});
