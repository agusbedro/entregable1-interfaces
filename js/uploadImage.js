let image;

function addImage(){
    let img = new Image();
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
    let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    let pixels = imgData.data;
    console.log(imgData.data);
    for(let i = 0; i< pixels.length;i+=4){
        let luminosidad = .3 * pixels[i] + .6 * pixels[i + 1] + .1 * pixels[i + 2];
		  pixels[i] = Math.min(luminosidad + 40, 255);
		  pixels[i + 1] = Math.min(luminosidad + 15, 255);
		  pixels[i + 2] = luminosidad;
    }
    ctx.putImageData(imgData, 0, 0);
}

function filterBinarizacion(){
    let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    let pixels = imgData.data;
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
    let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    let pixels = imgData.data;
    for ( let i = 0; i < pixels.length; i+=4 ) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        let grey = ( r + g + b ) / 3;
 
        pixels[i] = grey;
        pixels[i + 1] = grey;
        pixels[i + 2] = grey;
    }
 
    ctx.putImageData(imgData, 0, 0 );
}

function filterNegative () {

    let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    let pixels = imgData.data;

    for ( let i = 0; i < pixels.length; i++ ) {
        let r = pixels[ i * 4 ];
        let g = pixels[ i * 4 + 1 ];
        let b = pixels[ i * 4 + 2 ];
 
        pixels[ i * 4 ] = 255 - r;
        pixels[ i * 4 + 1 ] = 255 - g;
        pixels[ i * 4 + 2 ] = 255 - b;
    }
 
    ctx.putImageData( imgData, 0, 0 );
}

function filterBlur(){
    var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
   
    for(let x = 0; x<canvas.width; x++){
        for(let y = 0; y<canvas.height; y++){
            let pixelAvg = getPixelAverage(imgData, x, y);
            let i = getIndex(imgData, x, y);
            let data = imgData.data;
            data[i] = pixelAvg.r;
            data[i + 1] = pixelAvg.g;
            data[i + 2] = pixelAvg.b;
        }
    }

    ctx.putImageData(imgData, 0, 0 );
}


function getPixelAverage(imgData, x, y){
    let r = [];
    let g = [];
    let b = [];

    let pos0 = getIndex(imgData, x-1, y-1);
    if(pos0!=null)
        setRGB(imgData, pos0, r, g, b);

    let pos1 = getIndex(imgData, x-1, y);
    if(pos1!=null)
        setRGB(imgData, pos1, r, g, b);

    let pos2 = getIndex(imgData, x-1, y+1);
    if(pos2!=null)
        setRGB(imgData, pos2, r, g, b);

    let pos3 = getIndex(imgData, x, y-1);
    if(pos3!=null)
        setRGB(imgData, pos3, r, g, b);

    let pos4 = getIndex(imgData, x, y);
    if(pos4!=null)
        setRGB(imgData, pos4, r, g, b);

    let pos5 = getIndex(imgData, x, y+1);
    if(pos5!=null)
        setRGB(imgData, pos5, r, g, b);

    let pos6 = getIndex(imgData, x+1, y-1);
    if(pos6!=null)
        setRGB(imgData, pos6, r, g, b);

    let pos7 = getIndex(imgData, x+1, y);
    if(pos7!=null)
        setRGB(imgData, pos7, r, g, b);

    let pos8 = getIndex(imgData, x+1, y+1);
    if(pos8!=null)
        setRGB(imgData, pos8, r, g, b);


    return getAverageRGB(r, g, b);
}

function getAverageRGB(r, g, b) {
    let avgR = 0;
    let avgG = 0;
    let avgB = 0;
    for (let i = 0; i < r.length; i++) {
        avgR += r[i];
        avgG += g[i];
        avgB += b[i];
    }
    let rgb = {
        'r': avgR / r.length,
        'g': avgG / r.length,
        'b': avgB / r.length
    }
    return rgb;
}

function getIndex(imgData, x, y){
    let index = (x + y * imgData.width) * 4;
        return index;
}

function setRGB(imgData, pos, r, g, b){
    let rgb = getRGB(imgData, pos);
        r.push(rgb.red);
        g.push(rgb.green);
        b.push(rgb.blue);
}

function getRGB(imgData, pos){
    let data = imgData.data;
    let rgb = {
        "red": data[pos],
        "green": data[pos+1],
        "blue": data[pos+2]
    }
    return rgb;
}


function applySaturacion() {
    let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            //obtengo rgb
            let pos = getIndex(imageData, x, y);
            if(pos!=null){
                let rgb = getRGB(imageData, pos);

                let r = rgb.red;
                let g = rgb.green;
                let b = rgb.blue;
                
                //paso de rgb a hsl
                let arrHsl = []
                arrHsl = rgbToHsl(r, g, b);
                let h = arrHsl[0];
                let s = arrHsl[1];
                let l = arrHsl[2];
                s=1.1;
              
                //paso de hsl a rgb
                let arr = hslToRgb(h, s, l);
                r = arr[0];
                g = arr[1];
                b = arr[2];                
               
                setPixel(imageData, pos, r, g, b);
            }          
        }
    }
}

//cuenta matematica sacada de internet
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [h, s, l];
}

//cuenta matematica sacada de internet
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}

function setPixel(imageData, pos, r, g, b) {
    imageData.data[pos] = r;
    imageData.data[pos + 1] = g;
    imageData.data[pos + 2] = b;
    imageData.data[pos + 3] = 255;
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
}

function downloadImage(){
    let canvas = document.getElementById("myCanvas");
    let image = canvas.toDataURL();

    let link = document.createElement('a');
    link.download = "canvas.png";
    link.href = image;
    link.click();
    link.remove;

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

document.getElementById("filterSaturation").addEventListener("click", applySaturacion, false);



