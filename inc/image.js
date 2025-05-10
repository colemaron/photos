class Image {
	static loaded = [];

	constructor(name, src, folder, tags) {
		this.name = name;
		this.src = src;

		this.folder = folder || 2; // 2 is id of default
		this.tags = tags || [];

		// update info

		Image.loaded.push(this);
	}

	insert(parent) {
		const img = document.createElement("img");
		img.src = this.src;
		
		img.dataset.name = this.name;
		img.dataset.id = this.folder;

		parent.appendChild(img);
	}
}

export default Image;