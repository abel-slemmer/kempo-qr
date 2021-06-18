import { renderData} from "./main.js";

export const drinkContainer = document.getElementById("drink") 
const spinner= document.getElementById("loading")
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
export const btnScanQR = document.getElementById("btn-scan-qr");
const contentContainer = document.getElementById("content");

let scanning = false;

export const loadingOn = ()=>{
  spinner.style.display="grid"
}
export const loadingoff = ()=>{
  spinner.style.display="none"
}

qrcode.callback = (res) => {
    if (res) {
      loadingOn();
      scanning = false;
      video.srcObject.getTracks().forEach(track => {
        track.stop();
      });
      canvasElement.hidden = true;
      getEesztData(res);
      contentContainer.hidden=false
    }
  };

  function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  
    scanning && requestAnimationFrame(tick);
  }

  btnScanQR.onclick = () => {
    // let mockUrl="https://www.eeszt.gov.hu/covid-card/-/az/eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFRVNaVCIsInN1YiI6IjI0MjEwMjgxMzE5NDE4MzQ3MC4xIiwiaWQiOjg5NTAzMjE2NTd9.vEKsIP0c9y1M8F7x8Qiqwe0OkIG_1woSlY-L9X3ba7I?=*&&"
    // getEesztData(mockUrl)
  btnScanQR.hidden = true;
  drinkContainer.hidden=true
  contentContainer.hidden=true
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
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

 const getEesztData = (eesztUrl)=>{
  fetch("https://fathomless-coast-39519.herokuapp.com/"+eesztUrl, requestOptions)
  .then(response => response.text())
  .then(rawHtml => renderData(rawHtml,eesztUrl))
  .catch(error => console.log('error', error));
 }


