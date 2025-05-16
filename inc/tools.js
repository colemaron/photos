export async function insertSVG(src, container) {
	return fetch("../" + src)
	.then(response => response.text())
	.then(svgText => {
		svgText = svgText.replace(/&middot;/g, '·');

		const parser = new DOMParser();
		const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
		const svgElement = svgDoc.documentElement;

		container.appendChild(svgElement);
	});
}

const folders = document.getElementById("folders");

export function loadFolderElement(folder) {
	const div = document.createElement("button");
	div.classList.add("folder");
	div.dataset.id = folder.id;
	folders.appendChild(div);

	insertSVG(folder.icon, div).then(() => {
		const p = document.createElement("p");
		p.innerText = folder.name;
		div.appendChild(p);
	})

	return div;
}

export function uuid() {
	const id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});

	return id;
}