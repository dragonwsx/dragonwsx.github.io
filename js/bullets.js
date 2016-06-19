var Bullet = function(x, y, d){
    this.x = x || 0;
    this.y = y || 0;
    this.radius = 10;
    this.dir = d || Direction.UP;
    this.speed = 10;
    this.destroy = false;
    this.cost = BULLET_COST; // mana cost

    this.update = function(){
        if (this.dir == Direction.UP){
            this.y -= this.speed;
        }
        if (this.dir == Direction.DOWN){
            this.y += this.speed;
        }
        if (this.dir == Direction.LEFT){
            this.x -= this.speed;
        }
        if (this.dir == Direction.RIGHT){
            this.x += this.speed;
        }

        if (this.x <= 0 || this.x >= width || this.y <= 0 || this.y >= height){
            this.destroy = true;
        }

    };

    this.draw = function(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fill();
    };
}
