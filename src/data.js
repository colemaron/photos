import Image from "../inc/image.js";

/////////////////////
// user management //
/////////////////////



///////////////
// load data //
///////////////

const images = document.getElementById("images");

const sampleFolders = [
	{
		name: "Folder 1",
		images: [
			{ name: "Sample Image 1", src: "https://picsum.photos/id/100/200/300" },
			{ name: "Sample Image 2", src: "https://picsum.photos/id/200/200/300" },
			{ name: "Sample Image 3", src: "https://picsum.photos/id/300/200/300" },
		]
	},
	{
		name: "Folder 2",
		images: [
			{ name: "Sample Image 4", src: "https://picsum.photos/id/400/200/300" },
			{ name: "Sample Image 5", src: "https://picsum.photos/id/500/200/300" },
			{ name: "Sample Image 6", src: "https://picsum.photos/id/600/200/300" },
		]
	},
]

async function loadData() {
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
				for (const image of folder.images) {
					console.log(image);

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