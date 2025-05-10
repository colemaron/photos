import * as Tools from "../inc/tools.js";

// select different folder

const folders = document.getElementById("folders");
const images = document.getElementById("images");

folders.addEventListener("click", ({ target }) => {
	const isFolder = target.classList.contains("folder");
	const isAddFolder = target.id === "add-folder";

	if (isFolder && !isAddFolder) {
		for (const folder of folders.children) {
			folder.classList.remove("selected");
		}

		for (const image of images.children) {
			if (image.dataset.id === target.dataset.id) {
				image.classList.remove("hidden");
			} else {
				image.classList.add("hidden");
			}
		}

		target.classList.add("selected");
	}
})

// add new folders

const addFolder = document.getElementById("add-folder");

addFolder.addEventListener("click", () => {
	const folder = Tools.loadFolderElement({ name: "New Folder", icon: "../assets/icons/folder.svg", images: [] });

	folder.click();
});