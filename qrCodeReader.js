import { stringToHTML } from "./main.js";

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

qrcode.callback = (res) => {
    if (res) {
     getEesztData(res);
      outputData.innerText = res;
      scanning = false;
      video.srcObject.getTracks().forEach(track => {
        track.stop();
      });
  
      qrResult.hidden = false;
      btnScanQR.hidden = false;
      canvasElement.hidden = true;
    }
  };

  function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  
    scanning && requestAnimationFrame(tick);
  }

  btnScanQR.onclick = () => {
    getEesztData();
  // navigator.mediaDevices
  //   .getUserMedia({ video: { facingMode: "environment" } })
  //   .then(function(stream) {
  //     scanning = true;
  //     qrResult.hidden = true;
  //     btnScanQR.hidden = true;
  //     canvasElement.hidden = false;
  //     video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
  //     video.srcObject = stream;
  //     video.play();
  //     tick();
  //     scan();
  //   });
  };

  function scan() {
    try {
      qrcode.decode();
    } catch (e) {
      setTimeout(scan, 300);
    }
  }

let myHeaders = new Headers();
myHeaders.append("Origin", "localhost");

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

let renderData=(rawHtml)=>{
 let body = stringToHTML(rawHtml)
  console.log(body)
}

 const getEesztData = (eesztUrl)=>{
  fetch("https://fathomless-coast-39519.herokuapp.com/https://www.eeszt.gov.hu/covid-card/-/az/eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFRVNaVCIsInN1YiI6IjI0MjEwMjgxMzE5NDE4MzQ3MC4xIiwiaWQiOjg5NTAzMjE2NTd9.vEKsIP0c9y1M8F7x8Qiqwe0OkIG_1woSlY-L9X3ba7I?=*&&", requestOptions)
  .then(response => response.text())
  .then(rawHtml => renderData(rawHtml))
  .catch(error => console.log('error', error));
 }


