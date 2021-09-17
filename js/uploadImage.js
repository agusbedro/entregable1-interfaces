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

let img = document.getElementById("image");
img.addEventListener('change', uploadImage, false);

document.getElementById("filterSepia").addEventListener("click", filterSepia, false);

document.getElementById("filterBina").addEventListener("click", filterBinarizacion, false);