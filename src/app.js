import "./upload.js";
import "./data.js";

// image fullscreen



// searching

const search = document.getElementById("search");
const images = document.getElementById("images");

search.addEventListener("input", () => {
	const children = images.childNodes;

	if (children.length === 0) return;

	const query = search.value.toLowerCase();

	for (const child of children) {
		child.style.display = child.dataset.name.toLowerCase().includes(query) ? "block" : "none";
	}
});