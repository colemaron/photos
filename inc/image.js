class Image {
	static loaded = [];

	constructor(name, src) {
		this.name = name;
		this.src = src;

		this.folder = null;
		this.tags = [];

		// update info

		Image.loaded.push(this);
	}

	insert(parent) {
		const img = document.createElement("img");
		img.src = this.src;
		
		img.dataset.name = this.name;

		parent.appendChild(img);
	}
}

export default Image;