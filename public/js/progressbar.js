const progressBar = document.getElementById("scroll-progress");

function updateProgress() {
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const progress = Math.min(scrollTop / totalHeight, 1);
  progressBar.style.transform = `scaleX(${progress})`;
}

document.addEventListener("scroll", () => {
  requestAnimationFrame(updateProgress);
});
