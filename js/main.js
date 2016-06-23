/// <reference path="player.js" />
/// <reference path="bullets.js" />
var canvas = document.createElement('canvas'),
context = canvas.getContext("2d"),
width = canvas.width = window.innerWidth,
height = canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// create the restart button
var restartButton = document.createElement("button");
restartButton.innerText = "Play Again?";
restartButton.style.display = "none";
restartButton.style.marginBottom = height / 3 +"px";
restartButton.onclick = function (event) {
    init();
    restartButton.style.display = "none";
};
document.body.appendChild(restartButton);

var player1;
var player2;
var bullet_list = [];
var bigBullet_list = [];
var manaColor;
var hpColor;
var backgroundColor;
var init = function() {
    backgroundColor = '#bdc3c7';
    hpColor = "#ff1a1a";
    manaColor = "#0066ff";
    player1 = new Player(10, height/2, "#8e44ad");
    player1.img.src = "res/player1.png";
    player2 = new Player(width - 60, height/2, "#27ae60");
    player2.img.src = "res/player2.png";
    bullet_list = [];
};
init();

var p1_input = {
    left: false,
    right: false,
    up: false,
    down:false,
    attack1: false,
    attack2: false,
    attack3: false
};
var p2_input = {
    left: false,
    right: false,
    up: false,
    down: false,
    attack1: false,
    attack2: false,
    attack3: false
};

//this is used to check for keydown
document.body.addEventListener('keydown', function (event) {
    // player 1 input
    if (event.key == 'w' || event.key == 'W') {
        p1_input.up = true;
    }
    if (event.key == 'a' || event.key == 'A') {
        p1_input.left = true;
    }
    if (event.key == 's' || event.key == 'S') {
        p1_input.down = true;
    }
    if (event.key == 'd' || event.key == 'D') {
        p1_input.right = true;
    }

    // player 2 input
    if (event.keyCode == 38) {
        p2_input.up = true;
    }

    if (event.keyCode == 37) {
        p2_input.left = true;
    }

    if (event.keyCode == 40) {
        p2_input.down = true;
    }
    if (event.keyCode == 39) {
        p2_input.right = true;
    }
});

document.body.addEventListener('keyup', function (event) {
    //player 1 movement
    if (event.key == 'w' || event.key == 'W') {
        p1_input.up = false;
    }
    if (event.key == 'a' || event.key == 'A') {
        p1_input.left = false;
    }
    if (event.key == 's' || event.key == 'S') {
        p1_input.down = false;
    }
    if (event.key == 'd' || event.key == 'D') {
        p1_input.right = false;
    }

    // player 2 input
    if (event.keyCode == 38) {
        p2_input.up = false;
    }
    if (event.keyCode == 37) {
        p2_input.left = false;
    }
    if (event.keyCode == 40) {
        p2_input.down = false;
    }
    if (event.keyCode == 39) {
        p2_input.right = false;
    }
});

document.body.addEventListener('keypress', function(event){
    //player1 attacks
    if (event.keyCode == 32){
        p1_input.attack1 = true;
    }
    if (event.key == 'x' || event.key == 'X'){
        p1_input.attack2 = true;
    }
    if (event.key == 'c' || event.key == 'C'){
        p1_input.attack3 = true;
    }
    //player2 attacks
    if (event.key == ','){
        p2_input.attack1 = true;
    }
    if (event.key == '.'){
        p2_input.attack2 = true;
    }
    if (event.key == '/' ){
        p2_input.attack3 = true;
    }
});

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    //player 1 movement
    if(!player1.lost){
        if (p1_input.left){
            if(!player1.collideLeft(player2)){
                player1.dir = Direction.LEFT;
                player1.x -= player1.speed;
            }
        }
        if (p1_input.right) {
            if(!player1.collideRight(player2)){
                player1.dir = Direction.RIGHT;
                player1.x += player1.speed;
            }
        }
        if (p1_input.up) {
            if( !player1.collideUp(player2)){
                player1.dir = Direction.UP;
                player1.y -= player1.speed;
            }
        }
        if (p1_input.down) {
            if(!player1.collideDown(player2)){
                player1.dir = Direction.DOWN
                player1.y += player1.speed;
            }
        }
        //player1 attacks
        if (p1_input.attack1){
            if(player1.mana > 0 && player1.mana >= BULLET_COST){
                var b = new Bullet(player1.x + player1.size/2, player1.y+player1.size/2, player1.dir, player1.color, player1);
                bullet_list.push(b);
                player1.mana -= b.cost;
            }
        }
        if (p1_input.attack2){
            if (player1.mana >= 20 && player1.speed < 11){
                player1.speed += 2;
                player1.mana -= 20;
            }
        }
        if (p1_input.attack3){
            if(player1.mana >= bigBullet_COST){
                var b = new bigBullet(player1.x + player1.size/2, player1.y+player1.size/2, player1.dir, player1.color, player1);
                bigBullet_list.push(b);
                player1.mana -= b.cost;
            }
        }
    }

    // player 2 movement
    if(!player2.lost){
        if (p2_input.left){
            if(!player2.collideLeft(player1)){
                player2.dir = Direction.LEFT;
                player2.x -= player2.speed;
            }
        }
        if (p2_input.right) {
            if(!player2.collideRight(player1)){
                player2.dir = Direction.RIGHT;
                player2.x += player2.speed;
            }
        }
        if (p2_input.up) {
            if(!player2.collideUp(player1)){
                player2.dir = Direction.UP;
                player2.y -= player2.speed;
            }
        }
        if (p2_input.down) {
            if(!player2.collideDown(player1)){
                player2.dir = Direction.DOWN;
                player2.y += player2.speed;
            }
        }
        //player2 attacks
        if (p2_input.attack1){
            if(player2.mana > 0 && player2.mana >= BULLET_COST){
                var b = new Bullet(player2.x + player2.size/2, player2.y + player2.size/2, player2.dir, player2.color, player2);
                bullet_list.push(b);
                player2.mana -= b.cost;
            }
        }
        if (p2_input.attack2){
            if (player2.mana >= 20 && player2.speed < 11){
                player2.speed += 2;
                player2.mana -= 20;
            }
        }
        if (p2_input.attack3){
            if (player2.mana >= bigBullet_COST){
                var b = new bigBullet(player2.x + player2.size/2, player2.y+player2.size/2, player2.dir, player2.color, player2);
                bigBullet_list.push(b);
                player2.mana -= bigBullet_COST;
            }
        }
    }

    player1.update();
    player2.update();

    for (var i= bullet_list.length-1; i >= 0; i--){
        bullet_list[i].update();
        if (bullet_list[i].destroy){
            bullet_list.splice(i, 1);
            continue;
        }

        if(bullet_list[i].parent == player1){
            if(bullet_list[i].collide(player2)){
                bullet_list[i].destroy = true;
                player2.hp -= 20;
                if(player2.hp <= 0){ // player2 death
                    player2.hp = 0;
                    player2.lost = true;
                    restartButton.style.display = "block";
                }
            }
        }else if(bullet_list[i].parent == player2){
            if(bullet_list[i].collide(player1)){
                bullet_list[i].destroy = true;
                player1.hp -= 20;
                if(player1.hp <= 0) { // player1 death
                    player1.hp = 0;
                    player1.lost = true;
                    restartButton.style.display = "block";
                }
            }
        }
    }

    for (var i= bigBullet_list.length-1; i >= 0; i--){
        bigBullet_list[i].update();
        if (bigBullet_list[i].destroy){
            bigBullet_list.splice(i, 1);
            continue;
        }

        if(bigBullet_list[i].parent == player1){
            if(bigBullet_list[i].collide(player2)){
                bigBullet_list[i].destroy = true;
                player2.hp -= 50;
                player2.speed -=6;
                if(player2.hp <= 0){ // player2 death
                    player2.hp = 0;
                    player2.lost = true;
                    restartButton.style.display = "block";
                }
            }
        }else if(bigBullet_list[i].parent == player2){
            if(bigBullet_list[i].collide(player1)){
                bigBullet_list[i].destroy = true;
                player1.hp -= 50;
                player1.speed -=6;
                if(player1.hp <= 0) { // player1 death
                    player1.hp = 0;
                    player1.lost = true;
                    restartButton.style.display = "block";
                }
            }
        }
    }

    p1_input.attack1 = false;
    p1_input.attack2 = false;
    p1_input.attack3 = false;
    p2_input.attack1 = false;
    p2_input.attack2 = false;
    p2_input.attack3 = false;
}

var scl = 3;
var hpHeight = 45;
function draw() {
    clear();
    //draw hp
    context.fillStyle = hpColor;
    context.fillRect(width - 200*scl, 0, player2.hp*scl, hpHeight);
    context.fillRect(0, 0, player1.hp*scl, hpHeight);

    //draw mana bar
    context.fillStyle = manaColor;
    context.fillRect(0, hpHeight + 2,player1.mana * scl, 20);
    context.fillRect(width - 200*scl, hpHeight+2, player2.mana * scl, 20);

    // draw players
    player1.draw(context);
    player2.draw(context);

    // draw bullets
    for (var i = bullet_list.length-1; i >= 0; i--){
        bullet_list[i].draw(context);
    }
    // draw big bullets
    for (var i = bigBullet_list.length-1; i >= 0; i--){
        bigBullet_list[i].draw(context);
    }

    if(player1.lost || player2.lost){
        context.textAlign = "center";
        context.font = "100px trebuchet";
        context.fillStyle = "white";
        // display the winner banner
        if(player1.lost && player2.lost){
            // both players los all their health
            context.fillText("It's a tie!", width/2, height/2);
        }else if(player1.lost){
            // just p1 lost all hp
            context.fillText("Green player wins!", width/2, height/2);
        }else{
            // p2 lost all hp
            context.fillText("Purple player wins!!", width/2, height/2);
        }
    }

}

function clear() {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);
}
