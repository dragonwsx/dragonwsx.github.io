var Bullet = function(x, y, d, c, p){
    this.x = x || 0;
    this.y = y || 0;
    this.radius = 10;
    this.dir = d || Direction.UP;
    this.speed = 25;
    this.destroy = false;
    this.cost = BULLET_COST; // mana cost
    this.color = c || "#e67e22";
    this.parent = p || null;

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

    this.collide = function (pl) {
        var dx = (pl.x+pl.size/2) - (this.x), dy = (pl.y+pl.size/2) - (this.y);
        var dist = Math.sqrt(dx*dx + dy*dy);
        if(dist <= 30) return true;
        return false;
    };

    this.draw = function(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
}

var bigBullet = function(x, y, d, c, p){
    this.x = x || 0;
    this.y = y || 0;
    this.radius = 25;
    this.dir = d || Direction.UP;
    this.speed = 8;
    this.destroy = false;
    this.cost = bigBullet_COST; // mana cost
    this.color = c || "#e67e22";
    this.parent = p || null;

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

    this.collide = function (pl) {
        var dx = (pl.x+pl.size/2) - (this.x), dy = (pl.y+pl.size/2) - (this.y);
        var dist = Math.sqrt(dx*dx + dy*dy);
        if(dist <= 30) return true;
        return false;
    };

    this.draw = function(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
}
