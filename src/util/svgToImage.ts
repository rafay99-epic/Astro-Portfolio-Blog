/**
 * Converts an SVG HTML string to a high-resolution PNG and triggers a download.
 *
 * Uses Canvas API: SVG → Image → Canvas (scaled) → PNG Blob → download link.
 * The Tokyo Night background (#1a1b26) is painted first so the exported image
 * looks identical to the on-screen diagram.
 */
export async function downloadSvgAsPng(
	svgHtml: string,
	filename = "diagram.png",
	scale = 3,
): Promise<void> {
	const parser = new DOMParser();
	const svgDoc = parser.parseFromString(svgHtml, "image/svg+xml");
	const svgElement = svgDoc.querySelector("svg");
	if (!svgElement) throw new Error("No SVG element found in the provided HTML");

	// --- Determine intrinsic dimensions ---
	const viewBox = svgElement.getAttribute("viewBox");
	let width: number;
	let height: number;

	if (viewBox) {
		const parts = viewBox.split(" ").map(Number);
		width = parts[2];
		height = parts[3];
	} else {
		width = Number.parseFloat(svgElement.getAttribute("width") || "800");
		height = Number.parseFloat(svgElement.getAttribute("height") || "600");
	}

	// Ensure the SVG has explicit pixel dimensions for the Image element
	svgElement.setAttribute("width", String(width));
	svgElement.setAttribute("height", String(height));

	// --- Serialize, ensuring the xmlns attribute is present ---
	const serializer = new XMLSerializer();
	let svgString = serializer.serializeToString(svgElement);
	if (!svgString.includes("xmlns=")) {
		svgString = svgString.replace(
			"<svg",
			'<svg xmlns="http://www.w3.org/2000/svg"',
		);
	}

	// --- Create a Blob URL from the SVG ---
	const svgBlob = new Blob([svgString], {
		type: "image/svg+xml;charset=utf-8",
	});
	const url = URL.createObjectURL(svgBlob);

	// --- Draw onto a high-resolution canvas ---
	const canvas = document.createElement("canvas");
	canvas.width = width * scale;
	canvas.height = height * scale;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not create canvas 2D context");

	// Paint Tokyo Night background
	ctx.fillStyle = "#1a1b26";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	return new Promise<void>((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			URL.revokeObjectURL(url);

			canvas.toBlob(
				(blob) => {
					if (!blob) {
						reject(new Error("Failed to create PNG blob from canvas"));
						return;
					}
					const anchor = document.createElement("a");
					anchor.href = URL.createObjectURL(blob);
					anchor.download = filename;
					anchor.click();
					URL.revokeObjectURL(anchor.href);
					resolve();
				},
				"image/png",
				1.0,
			);
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(new Error("Failed to load SVG into Image element"));
		};
		img.src = url;
	});
}
