/// <reference path="player.js" />

var canvas = document.createElement('canvas'),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var backgroundColor = '#34495e';
var player1 = new Player(width/20, height/20, "Red");
var player2 = new Player(width - 100, height - 100, "green");

var p1_input = {
    left: false,
    right: false,
    up: false,
    down:false,
    attack1: false,
    attack2: false
};
var p2_input = {
    left: false,
    righ: false,
    up: false,
    down: false,
    attack1: false,
    attack2: false
};

//this is used to check for keydown
document.body.addEventListener('keydown', function (event) {
    // player 1 input
    if (event.key == 'w') {
        p1_input.up = true;
    }
    if (event.key == 'a') {
        p1_input.left = true;
    }
    if (event.key == 's') {
        p1_input.down = true;
    }
    if (event.key == 'd') {
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
    if (event.key == 'w') {
        p1_input.up = false;
    }
    if (event.key == 'a') {
        p1_input.left = false;
    }
    if (event.key == 's') {
        p1_input.down = false;
    }
    if (event.key == 'd') {
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
    if (event.key == 'e'){
        p1_input.attack2 = true;
    }
    //player2 attacks
    if (event.key == ','){
        p2_input.attack1 = true;
    }
    if (event.key == '.'){
        p2_input.attack2 = true;
    }
});

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    //player 1 movement
    if (p1_input.left)player1.x -= player1.speed;
    if (p1_input.right) player1.x += player1.speed;
    if (p1_input.up) player1.y -= player1.speed;
    if (p1_input.down) player1.y += player1.speed;
    // player 2 movement
    if (p2_input.left)player2.x -= player2.speed;
    if (p2_input.right) player2.x += player2.speed;
    if (p2_input.up) player2.y -= player2.speed;
    if (p2_input.down) player2.y += player2.speed;

    player1.update();
    player2.update();

    p1_input.attack1 = false;
    p1_input.attack2 = false;
    p2_input.attack1 = false;
    p2_input.attack2 = false;
}


function draw() {
    clear();
    player1.draw(context);
    player2.draw(context);
    context.fillRect(width - 200, 0, player2.hp, 50);
    context.fillStyle = 'Red';
    context.fillRect(0, 0, player1.hp, 50);
    context.fillStyle = 'blue';
    context.fillRect(0, 50,player1.mana, 25);
    context.fillRect(width - 200, 50, player2.mana, 25);
}

function clear() {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);
}
