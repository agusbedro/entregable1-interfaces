let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let canvasWidht = canvas.width;
let canvasHeight = canvas.height;

let figures = [];
let lastClickedFigure = null;
let isMouseDown = false;

function draw(){
    addRect();
    paint();
}

function addRect(){
    let posX = Math.round(Math.random() * canvasWidht);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = 'red';   
    figures.push(new Board(posX, posY, color, ctx));
}

function paint(){
    clearCanvas();
    for(let i = 0; i<figures.length; i++){
        figures[i].paint();
    }
}

function findClickedFigure(x, y){
    for(let i = 0; i <figures.length; i++){
        const elemnt = figures[i];
        if(elemnt.isPointedInside(x, y))
            return elemnt;
    }   
}

function onMouseDown(e){
    isMouseDown = true;
    console.log("afuera if");

    if(lastClickedFigure != null){
        lasClickedFigure.setResaltado(false);
        lasClickedFigure = null;
        console.log("adentro if");
    }

    let clickFig = findClickedFigure(e.layerX, e.layerY);

    if(clickFig != null){
        clickFig.setResaltado(true);
        lasClickedFigure = clickFig;
    }
    paint();
}

function onMouseUp(){
    isMouseDown = false;
}

function clearCanvas(){
    if(lastClickedFigure!=null)
        lastClickedFigure.setResaltado(false);
}

function onMouseMove(e){
    if(isMouseDown && lasClickedFigure != null){
        lasClickedFigure.setPosition(e.layerX, e.layerY);
        paint();
    }
}
draw();

canvas.addEventListener('mousedown',onMouseDown, false);


canvas.addEventListener('mousemove', onMouseMove, false);

canvas.addEventListener('mouseup', onMouseUp, false);
