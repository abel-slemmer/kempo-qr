export let stringToHTML = function (str) {
	let parser = new DOMParser();
	let doc = parser.parseFromString(str, 'text/html');
	return doc.getElementById("content");
};