let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let canvasWidht = canvas.width;
let canvasHeight = canvas.height;
let pencil = false;
let lines = [];
let lastClickedFigure = null;
let isMouseDown = false;
let eraser = false;

function setPencil(){
    pencil = true;
    eraser = false;
}

function paint(){
    for(let i = 0; i<lines.length; i++){
        lines[i].paint();
    }
}

function getIndexOfLine(x, y){
    for(let i =0; i<lines.length; i++){
        if(lines[i].getPosX() == x && lines[i].getPosY() == y)
            return i;
    }
}


function onMouseDown(e){
    if(pencil || eraser){
        isMouseDown = true;
        let color;
    
        if(pencil)
            color = 'red';
        else if(eraser)
            color = 'white';

        createLine(e, color);    
    }
}

function createLine(e, color){
    let clickFig =  new Board(e.layerX, e.layerY, color, ctx);
   
    if(eraser)
        clickFig.setRadius(6);
    
    lines.push(clickFig);
    lastClickedFigure = clickFig;
    paint();
}

function onMouseUp(){
    isMouseDown = false;
}

function onMouseMove(e){
    if(isMouseDown && lastClickedFigure != null && (pencil || eraser)){
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        paint();
    }
}

function erase(){
    eraser = true;
    pencil = false;
   // color = 'white';
   clickFig.setColor('white');

}

canvas.addEventListener('mousedown',onMouseDown, false);

canvas.addEventListener('mousemove', onMouseMove, false);

canvas.addEventListener('mouseup', onMouseUp, false);

document.getElementById("pencil").addEventListener('click', setPencil, false);

document.getElementById("eraser").addEventListener('click', erase, false);