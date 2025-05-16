import "./data.js";
import "./upload.js";
import "./folder.js";

// searching

const search = document.getElementById("search");
const images = document.getElementById("images");

search.addEventListener("input", () => {
	const query = new RegExp(search.value, "i");

	console.log(query);

	for (const image of images.children) {
		image.classList.toggle("hidden", !query.test(image.dataset.name));
	}
});

const exitKeys = ["Escape", "Enter"];

document.addEventListener("keydown", event => {
	if (event.key === "/") {
		search.focus();
		event.preventDefault();
	} else if (exitKeys.includes(event.key)) {
		search.blur();
	}
})

// color theme

const themeToggle = document.getElementById("theme-toggle");

let darkMode = localStorage.getItem("theme") === "dark";

function updateMode() {
	themeToggle.children[0].classList.toggle("hidden", !darkMode);
	themeToggle.children[1].classList.toggle("hidden", darkMode);
	
	document.documentElement.dataset.theme = darkMode ? "dark" : "light";
}

updateMode();

themeToggle.addEventListener("click", () => {
	darkMode = !darkMode;
	updateMode()
})

window.addEventListener("beforeunload", () => {
	localStorage.setItem("theme", darkMode ? "dark" : "light");
});

// image hover buttons

const hoverButtons = document.getElementById("hover-buttons");

images.addEventListener("mousemove", ({ target }) => {
	if (target.tagName === "IMG") {
		hoverButtons.classList.remove("hidden");

		target.parentElement.appendChild(hoverButtons)
	}
})

images.addEventListener("mouseleave", () => hoverButtons.classList.add("hidden"));