/**
 * Serialize a value to a JSON string safe to inject into a
 * `<script type="application/ld+json">` block via `set:html`.
 *
 * `JSON.stringify` does not escape the `<` character, so content containing
 * a closing script tag (e.g. inside a post title or description) could
 * otherwise close the script element early and corrupt the page markup.
 * Replacing `<` with its `<` unicode escape keeps the output valid JSON
 * while making it impossible to break out of the element.
 */
export function toJsonLd(value: unknown): string {
	return JSON.stringify(value).replace(/</g, "\\u003c");
}
