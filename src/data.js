////////////////////////
// save and load data //
////////////////////////

const data = loadData() || [];

// save

function saveData() {
	localStorage.setItem("images", JSON.stringify(data));
}

window.onbeforeunload = saveData;

// load

function loadData() {
	return JSON.parse(localStorage.getItem("images"));
}

/////////////////////////
// load image elements //
/////////////////////////

const content = document.getElementById("content");

for (const image of data) {
	const img = document.createElement("img");
	img.src = image.src;

	content.appendChild(img);
}