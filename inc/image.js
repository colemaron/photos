class Image {
	static loaded = [];

	constructor(name, src, folder, id, tags) {
		this.name = name;
		this.src = src;

		this.folder = folder
		this.id = id;
		this.tags = tags || [];

		// update info

		Image.loaded.push(this);
	}

	insert(parent) {
		const div = document.createElement("div");
		div.classList.add("image");

		const img = document.createElement("img");
		img.src = this.src;
		div.appendChild(img);
		
		div.dataset.name = this.name;
		div.dataset.folder = this.folder;
		div.dataset.id = this.id;

		parent.appendChild(div);
	}
}

export default Image;