export function insertSVG(src, container) {
	fetch(src)
		.then(response => response.text())
		.then(text => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(text, "image/svg+xml");
			const element = doc.documentElement;

			container.appendChild(element);
		})
		.catch(error => console.error("Error loading SVG:", error));
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