const contentContainer = document.getElementById("content");

export const renderData = (rawHtml, eesztUrl) => {
	let contentElement = stringToHTML(rawHtml).getElementById("content")
	let [captcha] = contentElement.getElementsByClassName("captchaImage")
	console.log(contentElement)
	contentContainer.innerHTML = contentElement.innerHTML
	if (captcha != null) {
		document.getElementsByTagName("input")[0].required = true
		document.getElementsByTagName("form")[0].onsubmit = (event) => {event.preventDefault(); captchaSubmit(eesztUrl)}
	}
}

export const stringToHTML = function (str) {
	return new DOMParser().parseFromString(str, 'text/html');
};

export const captchaSubmit = (eesztUrl) => {
	const captchaCode = document.getElementById("captchaCode").value
	sendCaptcha(captchaCode, eesztUrl);
}


const sendCaptcha = (captchaCode, eesztUrl) => {
	let myHeaders = new Headers();
	myHeaders.append("Origin", "Mandel");
	let formdata = new FormData();
	formdata.append("captchaCode", captchaCode);

	let requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: formdata,
		redirect: 'follow'
	};

	fetch("https://fathomless-coast-39519.herokuapp.com/" + eesztUrl, requestOptions)
		.then(response => response.text())
		.then(rawHtml => renderData(rawHtml, eesztUrl))
		.catch(error => console.log('error', error));

}