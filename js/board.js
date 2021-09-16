
class Board{

    constructor(posX, posY, fill, ctx){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.ctx = ctx;
        this.radius = 3;
    }

    paint(){
        
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.fill;
        this.ctx.fill();        
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    setPosition(x, y){
        this.posX = x;
        this.posY = y;
    }

    getPosition(){
        return{
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    isPointedInside(x, y){
        return !(x<this.posX || x>this.posX+this.width || y <this.posY || y> this.posY+this.height);
    }

    setColor(color){
        this.fill = color;
    }

    getColor(){
        return this.fill; 
    }

    setRadius(radius){
        this.radius = radius;
    }
}