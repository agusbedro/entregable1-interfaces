function addImage(){
    var img = new Image();
    img.src = x;

    img.onload = function(){
        ctx.drawImage(img, 0, 0);
    }
}

let image = document.getElementById("image");

image.addEventListener('change', codigo, false);


function codigo(){
    console.log(image);
}