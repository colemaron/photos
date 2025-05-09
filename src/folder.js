const folders = document.getElementById("folders");

folders.addEventListener("click", ({ target }) => {
	if (target.classList.contains("folder")) {
		for (const folder of folders.children) {
			folder.classList.remove("selected");
		}

		target.classList.add("selected");
	}
})