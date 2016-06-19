function Player(x, y, col) {
    this.x = x;
    this.y = y;
    this.color = col;
    this.size = 50;
    this.speed = 5;
    this.dir = Direction.UP; // 0=up, 1=down, 2=left, 3=right
    this.maxMana = 200;

    this.hp = 200;
    this.mana = 200;

    this.manaRegenSpeed = 0.2;

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

        // check mana
        if(this.mana <0) this.mana = 0;
        this.mana += this.manaRegenSpeed;
        if(this.mana > this.maxMana) this.mana = this.maxMana; 
    };

    this.draw = function(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    };
}
