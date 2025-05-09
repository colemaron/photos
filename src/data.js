import Image from "../inc/image.js";

/////////////////////
// user management //
/////////////////////



///////////////
// load data //
///////////////

const images = document.getElementById("images");
const folders = document.getElementById("folders");

const sampleFolders = [
	{
		name: "Favorites",
		icon: "../assets/icons/favorite.svg",
		images: [
			{ name: "Sample Image 0", src: "https://picsum.photos/id/0/200/300" },
		]
	},
	{
		name: "Folder 1",
		icon: "../assets/icons/leaf.svg",
		images: [
			{ name: "Sample Image 1", src: "https://picsum.photos/id/100/200/300" },
			{ name: "Sample Image 2", src: "https://picsum.photos/id/200/200/300" },
			{ name: "Sample Image 3", src: "https://picsum.photos/id/300/200/300" },
		]
	},
	{
		name: "Folder 2",
		icon: "../assets/icons/extension.svg",
		images: [
			{ name: "Sample Image 4", src: "https://picsum.photos/id/400/200/300" },
			{ name: "Sample Image 5", src: "https://picsum.photos/id/500/200/300" },
			{ name: "Sample Image 6", src: "https://picsum.photos/id/600/200/300" },
		]
	},
]

async function loadSVG(container, src) {
	const response = await fetch(src);
	const text = await response.text();

	const parser = new DOMParser();
	const doc = parser.parseFromString(text, "image/svg+xml");
	const element = doc.documentElement;
	
	container.appendChild(element);
}

function loadFolderElement(folder) {
	const div = document.createElement("button");
	div.classList.add("folder");
	div.dataset.name = folder.name;
	folders.appendChild(div);

	loadSVG(div, folder.icon).then(() => {
		const p = document.createElement("p");
		p.innerText = folder.name;
		div.appendChild(p);
	})
}

function loadData() {
	const request = indexedDB.open("photos-manager", 1);

	request.onupgradeneeded = event => {
		const db = event.target.result;
	
		if (!db.objectStoreNames.contains("users")) {
			const users = db.createObjectStore("users", { keyPath: "id" });
			users.add({ id: 1, username: "admin", folders: sampleFolders });
		}
	}

	request.onsuccess = async event => {
		const db = event.target.result;

		const transaction = db.transaction("users", "readonly");
		const users = transaction.objectStore("users");

		users.get(1).onsuccess = event => {
			const data = event.target.result;

			for (const folder of data.folders) {
				loadFolderElement(folder);

				for (const image of folder.images) {
					const instance = new Image(...Object.values(image));
					instance.insert(images);
				}
			}
		}

		transaction.oncomplete = () => db.close();
	}
}

loadData()

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

			for (const image of detail) {
				data.folders[0].images.push(image);
			}

			users.put(data);
		}
	}
});