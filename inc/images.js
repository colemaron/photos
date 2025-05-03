class Image {
	constructor(name, src) {
		this.name = name;
		this.src = src;

		this.folder = null;
		this.tags = [];
	}

	insert(parent) {
		const div = document.createElement("div");
		div.classList.add("image");

		const img = document.createElement("img");
		img.src = this.src;
		div.appendChild(img);

		parent.appendChild(div);
	}
}

export default Image;