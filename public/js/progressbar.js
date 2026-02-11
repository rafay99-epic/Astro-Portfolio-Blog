const progressBar = document.getElementById("scroll-progress");

let ticking = false;

function updateProgress() {
	if (!progressBar) return;

	const totalHeight = document.body.scrollHeight - window.innerHeight;
	const scrollTop = window.scrollY || document.documentElement.scrollTop;

	const progress = Math.min(Math.max(scrollTop / totalHeight, 0), 1);

	progressBar.style.transform = `scaleX(${progress})`;
	ticking = false;
}

function requestTick() {
	if (!ticking) {
		requestAnimationFrame(updateProgress);
		ticking = true;
	}
}

document.addEventListener("scroll", requestTick, {
	passive: true,
});

updateProgress();
