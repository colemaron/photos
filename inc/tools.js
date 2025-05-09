export async function insertSVG(src, container) {
	const response = await fetch(src);
	const text = await response.text();

	const parser = new DOMParser();
	const doc = parser.parseFromString(text, "image/svg+xml");
	const element = doc.documentElement;
	
	container.appendChild(element);
}