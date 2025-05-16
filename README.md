# **Photos Manager**

## *Project Scenario*
If a user wants to stop having images spread between devices like their phone, computer, smart fridge, this would allow them to import and keep them in a centralized location to easily browse and interact with

---

## *Workload*
### **Cole**
- Multiple image uploading
- Localstorage for selected theme
- Folder creation and sorting
- Indexed Database storage

### **Corbin**
- Elements and main page styling
- Search and regexp functionality
- Keyboard shortcut for search bar
- Dark / Light theme toggling
- 
---

## *Frontend Stack*
Made using vanilla web technologies
1. **HTML** - sets up the skeleton to hold all of the visual elements
2. **CSS** - makes the user experience more enjoyable by allowing for easy interaction and viewing of content
3. **JavaScript** - allows for the operation and interaction of images and other features

---

## *How the app will run*
1. **The user will start out with a basic home page**
	- import their existing images
	- create folders
	- search through added images
2. **Once images are uploaded, they can manage them in various ways to allow for simple viewing and usage**
	- add tags for identification
	- rename to quickly find later on
3. **To make for a more accessible experience, the user will be given various customization options**
	- various layout options to make browsing easier
	- color themes to let them customize however they would like
	- assign custom folder icons / colors for orgaization

---

## *Functionalities*
- Import personal image files
- Theme / colors customization
- Folder and tags for easy searching
- Dynamic rendering to accomodate any sized image
- Real-time search, filter, and sort options

---

## *Code Explanations*
**Live image search**
1. References document elements to use for searching
2. Waits for input into search bar
3. Creates a RegExp using the query to check if image names match
4. Toggles the hidden class for any matching images
5. Additionally listens for key input
6. When the "/" key is pressed it focuses the search bar
```js
const search = document.getElementById("search");
const images = document.getElementById("images");

search.addEventListener("input", () => {
	const query = new RegExp(search.value, "i");

	for (const image of images.children) {
		image.classList.toggle("hidden", !query.test(image.dataset.name));
	}
});

document.addEventListener("keydown", event => {
	if (event.key === "/") {
		search.focus();
		event.preventDefault();
	}
})
```

**Image uploading and saving**
1. Waits for files to be upload and reads the data
2. Opens the **indexed database** to allow reading and writing
3. Waits for the main user data to be loaded
4. For each uploaded file it assigns it a folder and a unique identifer or **UUID**
5. Finalizes the changes to the database and saves it for future uses
```js
document.addEventListener("uploaded", ({ detail }) => {
	const request = indexedDB.open("photos-manager", 1);
	
	request.onsuccess = event => {
		const db = event.target.result;
		const transaction = db.transaction("users", "readwrite");
		const users = transaction.objectStore("users");

		users.get(1).onsuccess = event => {
			const data = event.target.result;
			const selected = document.querySelector(".folder.selected");

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
```