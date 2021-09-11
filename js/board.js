
class Board{

    constructor(posX, posY, fill, ctx){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.ctx = ctx;
        this.resaltado = false;
        this.resaltadoEstilo = 'black';
        this.width = 30;
        this.height = 30;
    }

    paint(){
        this.ctx.fillStyle = this.fill;
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);

        if(this.resaltado === true){
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 5;
            this.ctx.strokeRect(this.posX, this.posY, this.width, this.height);
        }
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
            y:this.getPosY()
        };
    }

    isPointedInside(x, y){
        return !(x<this.posX || x>this.posX+this.width || y <this.posY || y> this.posY+this.height);
    }

    setResaltado(resaltado){
        this.resaltado = resaltado;
    }


}