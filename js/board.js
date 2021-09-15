
class Board{

    constructor(posX, posY, fill, ctx){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.ctx = ctx;
        this.width = 5;
        this.height = 5;
    }

    paint(){
        this.ctx.fillStyle = this.fill;
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
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
}