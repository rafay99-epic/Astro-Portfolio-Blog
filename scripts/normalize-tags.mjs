import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

const HIGH_LEVEL_TAGS = new Set([
	"AI",
	"WebDevelopment",
	"MobileDevelopment",
	"OS",
	"DevOps",
	"Linux",
	"DesktopApps",
	"ThoughtsProcess",
	"DevelopmentTools",
	"Startup",
	"Google",
	"CES-2025",
	"Bun",
	"Other",
]);

/**
 * Map a raw tag from frontmatter to one or more high-level tags.
 * Returns an array of high-level tags (subset of HIGH_LEVEL_TAGS).
 */
function mapTag(raw) {
	const result = new Set();
	if (!raw) return [];

	const trimmed = String(raw).trim();
	const lower = trimmed.toLowerCase();

	// Direct high-level matches
	if (lower === "ai") result.add("AI");
	if (lower === "webdevelopment" || lower === "web development") {
		result.add("WebDevelopment");
	}
	if (lower === "mobiledevelopment" || lower === "mobile development") {
		result.add("MobileDevelopment");
	}
	if (lower === "os") result.add("OS");
	if (lower === "devops") result.add("DevOps");
	if (lower === "linux") result.add("Linux");
	if (lower === "desktopapps" || lower === "desktop apps") {
		result.add("DesktopApps");
	}
	if (lower === "thoughtsprocess" || lower === "thoughts-process") {
		result.add("ThoughtsProcess");
	}
	if (
		lower === "developmenttools" ||
		lower === "development tools" ||
		lower === "devtools"
	) {
		result.add("DevelopmentTools");
	}
	if (lower === "startup") result.add("Startup");
	if (lower === "google") result.add("Google");
	if (lower === "ces-2025") result.add("CES-2025");
	if (lower === "bun") {
		result.add("Bun");
		result.add("WebDevelopment");
	}

	// AI-related variants
	if (
		lower.includes("artificial intelligence") ||
		lower.includes("gpt") ||
		(lower.includes("ai") && !HIGH_LEVEL_TAGS.has(trimmed))
	) {
		result.add("AI");
	}

	// Web tech
	if (
		lower === "react" ||
		lower === "typescript" ||
		lower === "tailwindcss" ||
		lower === "shadcn" ||
		lower === "redux" ||
		lower === "react hook form" ||
		lower === "react router" ||
		lower === "react query" ||
		lower === "next.js" ||
		lower === "nextjs" ||
		lower === "serverless"
	) {
		result.add("WebDevelopment");
	}

	// Mobile tech
	if (
		lower === "flutter" ||
		lower === "react native" ||
		lower === "expo router" ||
		lower === "mobile app architecture"
	) {
		result.add("MobileDevelopment");
	}

	// OS / Linux related words mapped if they aren't already covered
	if (lower.includes("linux")) {
		result.add("Linux");
	}

	if (result.size === 0) {
		return [];
	}

	return Array.from(result);
}

function normalizeFile(filePath) {
	const original = fs.readFileSync(filePath, "utf8");

	// Extract frontmatter block
	const fmMatch = original.match(/^---\n([\s\S]*?)\n---\n?/);
	if (!fmMatch) {
		return false;
	}

	const frontmatter = fmMatch[1];
	const body = original.slice(fmMatch[0].length);

	const tagsRegex = /^tags:\n((?:[ \t]*-.*\n)+)/m;
	const match = frontmatter.match(tagsRegex);
	if (!match) {
		return false;
	}

	const lines = match[1]
		.split("\n")
		.filter(Boolean)
		.map((line) => line.replace(/^\s*-\s*/, "").trim())
		.filter(Boolean);

	const newTagSet = new Set();
	for (const raw of lines) {
		const mapped = mapTag(raw);
		for (const t of mapped) {
			newTagSet.add(t);
		}
	}

	if (newTagSet.size === 0) {
		newTagSet.add("Other");
	}

	const finalTags = Array.from(newTagSet).filter((t) => HIGH_LEVEL_TAGS.has(t));
	finalTags.sort((a, b) => a.localeCompare(b));

	const replacement = `tags:\n${finalTags.map((t) => `  - ${t}\n`).join("")}`;

	const newFrontmatter = frontmatter.replace(tagsRegex, replacement);
	const updated = `---\n${newFrontmatter}\n---\n${body}`;

	if (updated !== original) {
		fs.writeFileSync(filePath, updated, "utf8");
		return true;
	}
	return false;
}

function walk(dir) {
	const entries = fs.readdirSync(dir, {
		withFileTypes: true,
	});
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			walk(fullPath);
		} else if (entry.isFile() && entry.name.endsWith(".mdx")) {
			normalizeFile(fullPath);
		}
	}
}

console.log("Normalizing blog tags in", BLOG_DIR);
walk(BLOG_DIR);
console.log("Done normalizing tags.");
