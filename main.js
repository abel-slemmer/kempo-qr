const contentContainer = document.getElementById("content");

export const renderData = (rawHtml, eesztUrl) => {
	let contentElement = stringToHTML(rawHtml).getElementById("content")
	let [captcha] = contentElement.getElementsByClassName("captchaImage")
	console.log(contentElement)
	contentContainer.innerHTML = contentElement.innerHTML
	if (captcha != null) {
		document.getElementsByTagName("input")[0].required = true
		document.getElementsByTagName("form")[0].onsubmit = (event) => { event.preventDefault(); captchaSubmit(eesztUrl) }
	} else {
		editHtml()
	}
}

export const stringToHTML = function (str) {
	return new DOMParser().parseFromString(str, 'text/html');
};

const editHtml = () => {
	let dataRows = document.getElementsByClassName("data-row")
	console.log(dataRows);
	Array.from(dataRows).forEach((data, index) => {
		console.log(index);
		if (index !== 2 && index !== 5) {
			console.log(data);
			data.hidden = true
		} else {
			data.getElementsByClassName("main-cell main-title")[0].hidden = true
		}
	})
}

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