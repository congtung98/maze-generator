var ship;
var enemies = [];
var drops = [];
let img_ship, img_enemy;
var pause = false;

function setup() {
    img_ship = loadImage("image/ship.png");
    img_enemy = loadImage("image/invader.png");
    createCanvas(600, 400);
    resetSketch();
}

function resetSketch() {
    pause = false;
    ship = new Ship();
    //drop = new Drop(width/2, height/2);
    for (let i = 0; i < 6; i++) {
        enemies[i] = new Enemy(i*80+80, 60);
    }
}

function gameMessage(state = false) {
    textSize(32);
    fill('white');
    textAlign(CENTER);
    text(state ? 'You win!' : 'You lose!', width/2, height/2);
    textSize(20);
    fill('white');
    textAlign(CENTER);
    text('Hit Enter to restart', width/2, height/2 + 32);
}

function draw() {
    background(51);
    ship.show();

    if (enemies.length === 0) {
        gameMessage(true);
        pause = true;
    }

    if (keyIsDown(LEFT_ARROW) && !pause) {
        ship.move(-1);
    }

    if (keyIsDown(RIGHT_ARROW) && !pause) {
        ship.move(1);
    }

    for (let i = 0; i < drops.length; i++) {
        drops[i].show();
        drops[i].move(5);
        for (let j = 0; j < enemies.length; j++) {
            if (drops[i].hits(enemies[j])) {
                enemies[j].destroy();
                drops[i].explode();
            }
        }
    }

    let edge = false;

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].show();
        if (enemies[i].hits(ship)) {
            gameMessage();
            pause = true;
        }
    }

    if (!pause) {
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].move();
            if (enemies[i].x > width - enemies[i].r || enemies[i].x < enemies[i].r) {
                edge = true;
            }
    
        }
    }

    if (edge) {
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].shiftDown();
        }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
        if (enemies[i].toDestroy) {
            enemies.splice(i, 1);
        }
    }

    for (let i = drops.length - 1; i >= 0; i--) {
        if (drops[i].toExplode) {
            drops.splice(i, 1);
        }
    }
}

function keyPressed() {
    if (key === ' ' && !pause) {
        var drop = new Drop(ship.x, ship.y);
        drops.push(drop);
    }
    if (keyCode === ENTER) {
        resetSketch();
    }
}