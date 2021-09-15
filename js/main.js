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
}

function paint(){
    for(let i = 0; i<lines.length; i++){
        lines[i].paint();
    }
}

function getIndexOfLine(x, y){
    for(let i =0; i<lines.length; i++){
        console.log( lines[i].getPosX() + "    " + lines[i].getPosY());
        if(lines[i].getPosX() == x && lines[i].getPosY() == y){
            console.log("entre")
            return i;
        }
    }
}

function onMouseDown(e){
    isMouseDown = true;

    let color = 'red'; 
    let clickFig =  new Board(e.layerX, e.layerY, color, ctx);
    
    //para dibujar
    if(clickFig != null && pencil && !eraser){
        eraser = false;
        lines.push(clickFig);
        lastClickedFigure = clickFig;
        console.log("holu estoy dibujando ");
        paint();
    }

    //para borrar
    if(eraser){
        pencil = false;
        console.log(pencil);
        if(lastClickedFigure != null && lastClickedFigure.isPointedInside(e.layerX, e.layerY)){
            console.log(getIndexOfLine(e.layerX, e.layerY));
            lines.splice(getIndexOfLine(e.layerX, e.layerY));
            //paint();
        }
    
    }
}

function onMouseUp(){
    isMouseDown = false;
}

function onMouseMove(e){
    if(isMouseDown && lastClickedFigure != null && pencil){
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        paint();
    }
}

function erase(){
    eraser = true;
}

canvas.addEventListener('mousedown',onMouseDown, false);

canvas.addEventListener('mousemove', onMouseMove, false);

canvas.addEventListener('mouseup', onMouseUp, false);

document.getElementById("pencil").addEventListener('click', setPencil, false);

document.getElementById("eraser").addEventListener('click', erase, false);