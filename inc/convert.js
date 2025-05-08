export function fileToBase64(file) {
	const reader = new FileReader();
	
	return new Promise(resolve => {
		reader.onloadend = () => resolve(reader.result);
		reader.readAsDataURL(file);
	});
}

export function base64ToFile(base64) {
	return fetch(base64).then(result => result.blob());
}