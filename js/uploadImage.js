let image;

function addImage(){
    var img = new Image();
    img.src = x;
    img.onload = function(){
        ctx.drawImage(img, 0, 0);
    }
}

function uploadImage(e){
    if (e.target.files) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
           
            image =new Image();
            image.src = e.target.result;
            image.onload = function (ev) {
                
                let size;
                let width = image.width;
                let height = image.height;

                if(width < height){ 
                    size = canvas.height / height;
                    width = width * size;
                    height = height * size;
                } 
                else if (width > height){
                    size = canvas.width / width;
                    width = width * size;
                    height = height * size;
                } 
                else {
                    let sizeW = canvas.width / width;
                    let sizeH = canvas.height  / height;
                    width = width * sizeW;
                    height = height * sizeH;
                }
                
                ctx.drawImage(image, 0, 0, width, height);
            }
        } 
    }
}

function filterSepia(){
    var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    var pixels = imgData.data;
    console.log(imgData.data);
    for(let i = 0; i< pixels.length;i+=4){
        var luminosidad = .3 * pixels[i] + .6 * pixels[i + 1] + .1 * pixels[i + 2];
		  pixels[i] = Math.min(luminosidad + 40, 255);
		  pixels[i + 1] = Math.min(luminosidad + 15, 255);
		  pixels[i + 2] = luminosidad;
    }
    ctx.putImageData(imgData, 0, 0);
}

function filterBinarizacion(){
    var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    var pixels = imgData.data;
    for(let i = 0; i< pixels.length;i+=4){
        if(pixels[i] > 127){
            pixels[i] = 255;
            pixels[i +1] = 255;
            pixels[i+2] = 255;
            //pixels[i+3] = 0.1;
        }
        else {
            pixels[i]=0;
            pixels[i +1] = 0;
            pixels[i+2] = 0;
            //pixels[i+3] = 0;
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

function filterGrey() {
    var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    var pixels = imgData.data;
    for ( var i = 0; i < pixels.length; i+=4 ) {
        var r = pixels[i];
        var g = pixels[i + 1];
        var b = pixels[i + 2];
 
        var grey = ( r + g + b ) / 3;
 
        pixels[i] = grey;
        pixels[i + 1] = grey;
        pixels[i + 2] = grey;
    }
 
    ctx.putImageData(imgData, 0, 0 );
}

function filterNegative () {

    var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    var pixels = imgData.data;

    for ( var i = 0; i < pixels.length; i++ ) {
        var r = pixels[ i * 4 ];
        var g = pixels[ i * 4 + 1 ];
        var b = pixels[ i * 4 + 2 ];
 
        pixels[ i * 4 ] = 255 - r;
        pixels[ i * 4 + 1 ] = 255 - g;
        pixels[ i * 4 + 2 ] = 255 - b;
    }
 
    ctx.putImageData( imgData, 0, 0 );
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
}

function downloadImage(){
    let canvas = document.getElementById("myCanvas");
    let image = canvas.toDataURL();

    var link = document.createElement('a');
    link.download = "canvas.png";
    link.href = image;
    link.click();
    link.remove;

}
function filterBlur(){
        let start = +new Date();
		blur = 3;
        
		let sum = 0;
		let delta = 5;
		let alpha_left = 1 / (2 * Math.PI * delta * delta);
		let step = blur < 3 ? 1 : 2;
		for (let y = -blur; y <= blur; y += step) {
			for (let x = -blur; x <= blur; x += step) {
				let weight = alpha_left * Math.exp(-(x * x + y * y) / (2 * delta * delta));
				sum += weight;
			}
		}
		let count = 0;
		for (let y = -blur; y <= blur; y += step) {
			for (let x = -blur; x <= blur; x += step) {
				count++;
				ctx.globalAlpha = alpha_left * Math.exp(-(x * x + y * y) / (2 * delta * delta)) / sum * blur;
				ctx.drawImage(canvas,x,y);
			}
		}
		ctx.globalAlpha = 1;
		console.log("time: "+(+new Date() - start))
}


let img = document.getElementById("image");
img.addEventListener('change', uploadImage, false);

document.getElementById("filterSepia").addEventListener("click", filterSepia, false);

document.getElementById("filterBina").addEventListener("click", filterBinarizacion, false);

document.getElementById("filterGrey").addEventListener("click", filterGrey, false);

document.getElementById("filterNegative").addEventListener("click", filterNegative, false);

document.getElementById("clearCanvas").addEventListener("click", clearCanvas, false);

document.getElementById("downloadImage").addEventListener("click", downloadImage, false);

document.getElementById("filterBlur").addEventListener("click", filterBlur, false);
