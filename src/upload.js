import * as convert from "../inc/convert.js";
import Image from "../inc/image.js";

//////////////////
// import files //
//////////////////

// upload function

const images = document.getElementById("images");

async function uploadFiles(files) {
	const instances = [];

	for (const file of files) {
		const src = await convert.fileToBase64(file);
		const image = new Image(file.name, src);

		image.insert(images);
		instances.push(image);
	}

	const event = new CustomEvent("uploaded", { detail: instances });
	document.dispatchEvent(event);
}

// click to import

const input = document.getElementById("input");
const upload = document.getElementById("upload");

input.onchange = async event => {
	event.preventDefault();

	uploadFiles(event.target.files);
}

upload.onclick = async event => {
	event.preventDefault();

	input.click();
}

// drag to import

upload.ondragover = upload.ondragenter = event => {
	event.preventDefault();
};

upload.ondrop = async event => {
	event.preventDefault();

	uploadFiles(event.dataTransfer.files);
};