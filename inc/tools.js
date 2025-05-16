export function insertSVG(src, container) {
	const svg = document.createElement("img");
	svg.src = src;
	container.appendChild(svg);
}

const folders = document.getElementById("folders");

export function loadFolderElement(folder) {
	const div = document.createElement("button");
	div.classList.add("folder");
	div.dataset.id = folder.id;
	folders.appendChild(div);

	insertSVG(folder.icon, div);

	const p = document.createElement("p");
	p.innerText = folder.name;
	div.appendChild(p);

	return div;
}

export function uuid() {
	const id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
		let r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});

	return id;
}