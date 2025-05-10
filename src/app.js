import "./data.js";
import "./upload.js";
import "./folder.js";

import * as Tools from "../inc/tools.js";

// searching

const search = document.getElementById("search");
const images = document.getElementById("images");

search.addEventListener("input", () => {
	
});

// color theme

const themeToggle = document.getElementById("theme-toggle");

let darkMode = true;

themeToggle.addEventListener("click", () => {
	darkMode = !darkMode;

	themeToggle.children[0].classList.toggle("hidden");
	themeToggle.children[1].classList.toggle("hidden");
	
	document.documentElement.dataset.theme = darkMode ? "dark" : "light";
})