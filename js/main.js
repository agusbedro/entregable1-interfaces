let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let canvasWidht = canvas.width;
let canvasHeight = canvas.height;
let pencil = false;
let lines = [];
let lastClickedFigure = null;
let isMouseDown = false;
let eraser = false;
let activarPintado = false;

function setPencil(){
    pencil = true;
    eraser = false;
}


function onMouseDown(e){
    if(pencil || eraser){
        activarPintado = true;
        onMouseMove(e);
    }
}

function onMouseMove(e){
    if(activarPintado){
        isMouseDown = true;
        let color;
    
        if(pencil){
            color = document.getElementById("paleta").value;
            ctx.lineWidth = 25;
        }
        else if(eraser){
            color = 'white';
            ctx.lineWidth = 25;
        }

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
    isMouseDown = false;
    activarPintado = false;
    ctx.beginPath();
}

function erase(){
    eraser = true;
    pencil = false;
}

canvas.addEventListener('mousedown',onMouseDown, false);

canvas.addEventListener('mousemove', onMouseMove, false);

canvas.addEventListener('mouseup', onMouseUp, false);

document.getElementById("pencil").addEventListener('click', setPencil, false);

document.getElementById("eraser").addEventListener('click', erase, false);


