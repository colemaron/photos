import * as Tools from "../inc/tools.js";
import Image from "../inc/image.js";

/////////////////////
// user management //
/////////////////////



///////////////
// load data //
///////////////

const images = document.getElementById("images");
const folders = document.getElementById("folders");

const defaultFolders = [
	{
		id: Tools.uuid(),
		name: "Default",
		icon: "../assets/icons/folder-open.svg",
		images: []
	},
]

function loadData() {
	const request = indexedDB.open("photos-manager", 1);

	request.onupgradeneeded = event => {
		const db = event.target.result;
	
		if (!db.objectStoreNames.contains("users")) {
			const users = db.createObjectStore("users", { keyPath: "id" });
			users.add({ id: 1, username: "admin", folders: defaultFolders });
		}
	}

	request.onsuccess = async event => {
		const db = event.target.result;

		const transaction = db.transaction("users", "readonly");
		const users = transaction.objectStore("users");

		users.get(1).onsuccess = event => {
			const data = event.target.result;

			for (const folder of data.folders) {
				Tools.loadFolderElement(folder);

				console.log(folder);

				for (const image of folder.images) {
					const instance = new Image(image.name, image.src, folder.id, image.id, image.tags);
					
					instance.insert(images);
				}
			}

			folders.children[1].click();
		}
	}
}

loadData()

//////////////////////
// save new folders //
//////////////////////

const addFolder = document.getElementById("add-folder");
addFolder.addEventListener("click", () => {
	const request = indexedDB.open("photos-manager", 1);
	
	request.onsuccess = event => {
		const db = event.target.result;
		const transaction = db.transaction("users", "readwrite");
		const users = transaction.objectStore("users");

		users.get(1).onsuccess = event => {
			const data = event.target.result;

			data.folders.push({
				id: Tools.uuid(),
				name: "New Folder",
				icon: "../assets/icons/folder.svg",
				images: []
			});

			users.put(data);
		}
	}
})

/////////////////////
// save new images //
/////////////////////

document.addEventListener("uploaded", ({ detail }) => {
	const request = indexedDB.open("photos-manager", 1);
	
	request.onsuccess = event => {
		const db = event.target.result;
		const transaction = db.transaction("users", "readwrite");
		const users = transaction.objectStore("users");

		users.get(1).onsuccess = event => {
			const data = event.target.result;
			const selected = document.querySelector(".folder.selected");

			console.log(selected);

			for (const image of detail) {
				if (selected) {
					const id = selected.dataset.id;

					image.folder = id;
					data.folders.find(folder => folder.id == id).images.push(image)
				} else {
					image.folder = data.folders[0].id;
					data.folders[0].images.push(image)
				}
			}

			users.put(data);
		}
	}
});

///////////////////
// delete images //
///////////////////

const hoverButtons = document.getElementById("hover-buttons");
const deleteButton = document.getElementById("delete");

deleteButton.addEventListener("click", () => {
	const image = hoverButtons.parentElement;
	const folderId = image.dataset.folder;

	const request = indexedDB.open("photos-manager", 1);
	
	request.onsuccess = event => {
		const db = event.target.result;
		const transaction = db.transaction("users", "readwrite");
		const users = transaction.objectStore("users");

		console.log(users);

		users.get(1).onsuccess = event => {
			const data = event.target.result;
			const location = data.folders.find(folder => folder.id == folderId);
			const index = location.images.findIndex(img => img.id == image.dataset.id);

			location.images.splice(index, 1);

			users.put(data);
		}
	}

	image.remove();
})