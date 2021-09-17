let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let pencil = false;
let eraser = false;
let paint = false;

function onMouseDown(e){
    if(pencil || eraser){
        paint = true;
        onMouseMove(e);
    }
}

function onMouseMove(e){
    if(paint){
        let color;

        if(pencil)
            color = document.getElementById("paleta").value;
        else if(eraser)
            color = 'white';
        
        ctx.lineWidth = 25;
        ctx.strokeStyle = color;
        ctx.fill();    
        ctx.lineCap = "round";
        ctx.lineTo(e.layerX, e.layerY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.layerX, e.layerY);
    }
}

function onMouseUp(){
    paint = false;
    ctx.beginPath();
}

function draw(){
    pencil = true;
    eraser = false;
}

function erase(){
    eraser = true;
    pencil = false;
}

canvas.addEventListener('mousedown',onMouseDown, false);
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mouseup', onMouseUp, false);
document.getElementById("pencil").addEventListener('click', draw, false);
document.getElementById("eraser").addEventListener('click', erase, false);


