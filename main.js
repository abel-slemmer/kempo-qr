import { getDrink } from "./drinkRoller.js";
import { drinkContainer, loadingoff, btnScanQR, loadingOn} from "./qrCodeReader.js";


const contentContainer = document.getElementById("content");

export const renderData = (rawHtml, eesztUrl) => {
	let contentElement = stringToHTML(rawHtml).getElementById("content")
	let [captcha] = contentElement.getElementsByClassName("captchaImage")

	contentContainer.innerHTML = contentElement.innerHTML
	if (captcha != null) {
		let input = document.getElementsByTagName("input")[0]
		input.required = true
		input.autocomplete = "off"
		document.getElementsByTagName("form")[0].onsubmit = (event) => { event.preventDefault(); captchaSubmit(eesztUrl) }
	} else {
		let drink = getDrinkForName()
		editHtml(drink)
		btnScanQR.hidden = false;
	}
	loadingoff();
}

export const stringToHTML = function (str) {
	return new DOMParser().parseFromString(str, 'text/html');
};

const getDrinkForName = () => {
	let name = document.getElementsByClassName("main-data")[2].innerHTML
	return getDrink(name)
}

const editHtml = (drink) => {
	drinkContainer.innerHTML = `🍺Ajánlott Védőital:${drink}🍺`
	let dataRows = document.getElementsByClassName("data-row")
	drinkContainer.hidden = false
	Array.from(dataRows).forEach((data, index) => {
		if (index !== 2 && index !== 5) {
			data.hidden = true
		} else {
			data.getElementsByClassName("main-cell main-title")[0].hidden = true
		}

	})
}

export const captchaSubmit = (eesztUrl) => {
	loadingOn()
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