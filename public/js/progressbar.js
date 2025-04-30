const progressBar = document.getElementById("scroll-progress");

/**
 * Updates the scroll progress bar to reflect the user's current vertical scroll position.
 *
 * Calculates the scroll progress as a ratio of the current scroll position to the total scrollable height and updates the progress bar's horizontal scale accordingly.
 */
function updateProgress() {
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const progress = Math.min(scrollTop / totalHeight, 1);
  progressBar.style.transform = `scaleX(${progress})`;
}

document.addEventListener("scroll", () => {
  requestAnimationFrame(updateProgress);
});
