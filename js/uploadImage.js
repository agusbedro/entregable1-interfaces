function addImage(){
    var img = new Image();
    img.src = x;

    img.onload = function(){
        ctx.drawImage(img, 0, 0);
    }
}

let image = document.getElementById("image");

image.addEventListener('change', codigo, false);


function codigo(e){
    if (e.target.files) {
        let img = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function (e) {
            let image = new Image();
            image.src = e.target.result;
            image.onload = function (ev) {
                resize(image.width, image.height);
                ctx.drawImage(image, 0, 0,700,400);
            }
        }
        
    }
}

function resize(imgW, imgH){
    if(imgW < imgH){ 
        let porc = canvasH / imgH;
        imgW = imgW * porc;
        imgH = imgH * porc;
    } 
    else if (imgW > imgH){
        let porc = canvasW / imgW;
        imgW = imgW * porc;
        imgH = imgH * porc;
    } 
    else {
        let porcW = canvasW / imgW;
        let porcH = canvasH  / imgH;
        imgW = imgW * porcW;
        imgH = imgH * porcH;
    }
}

