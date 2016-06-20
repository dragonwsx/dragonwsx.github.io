function Player(x, y, col) {
    this.x = x;
    this.y = y;
    this.color = col;
    this.size = 50;
    this.speed = 5;
    this.dir = Direction.UP; // 0=up, 1=down, 2=left, 3=right
    this.maxMana = 200;
    this.lost = false;
    this.hp = 200;
    this.mana = 200;

    this.manaRegenSpeed = 0.2;
    var self = this;

    this.update = function () {
        if (this.y >= height-50) {
            this.y = height - 50;
        };
        if (this.x >= width-50){
            this.x = width - 50;
        };
        if (this.y <=0){
            this.y = 0;
        };
        if (this.x <=0){
            this.x = 0;
        };

        //check health
        if(this.hp < 0){
            this.hp = 0;
        }

        // check mana
        if(this.mana <0) this.mana = 0;
        if(!this.lost){
            this.mana += this.manaRegenSpeed;
        }
        if(this.mana > this.maxMana) this.mana = this.maxMana;
        //check speed
        if(this.speed > 5){
            this.speed -= 0.01;
        }

    };

    this.collideRight = function (obj) {
        if(this.x + this.size >= obj.x && this.x + this.size <= obj.x + obj.size){
            if((this.y < obj.y + obj.size && this.y >= obj.y) || 
                (this.y + this.size > obj.y && this.y +this.size <= obj.y + obj.size)){
                return true;
            }
        }
        return false;  
    };

    this.collideLeft = function (obj) {
        if(this.x <= (obj.x + obj.size) && this.x >= obj.x){ 
            if((this.y < obj.y + obj.size && this.y > obj.y) ||
                (this.y + this.size > obj.y && this.y +this.size <= obj.y + obj.size)){
                return true;
            }
        }
        return false;
    };

    this.collideUp = function (obj) {
        if(this.y <= obj.y + obj.size && this.y >= obj.y){
            if((this.x < obj.x + obj.size && this.x > obj.x) ||
                (this.x + this.size > obj.x && this.x + this.size <= obj.x + obj.size)){
                    return true;
                }
        }
        return false;
    };

    this.collideDown = function (obj) {
        if(this.y + this.size >= obj.y && this.y +this.size <= obj.y + obj.size){
            if((this.x < obj.x + obj.size && this.x > obj.x) || 
            (this.x + this.size > obj.x && this.x + this.size <= obj.x + obj.size)){
                return true;
            }
        }
        return false;
    };

    this.draw = function(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    };
}
