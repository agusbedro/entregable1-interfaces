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
            let image = new Image();
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

let image = document.getElementById("image");
image.addEventListener('change', uploadImage, false);