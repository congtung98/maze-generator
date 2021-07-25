let leftScore = 0;
let rightScore = 0;

function setup() {
    createCanvas(600, 400);
    ding = loadSound('data/ding.mp3');
    end = loadSound('data/end.mp3');
    puck = new Puck();
    left = new Paddle(true);
    right = new Paddle(false);
    console.log(puck.angle);
}

function keyReleased() {
    left.move(0);
    right.move(0);
}

function keyPressed() {
    if (key == 'w') {
        left.move(-10);
    } else if (key == 's') {
        left.move(10);
    }

    if (keyCode === UP_ARROW) {
        right.move(-10);
    } else if (keyCode === DOWN_ARROW) {
        right.move(10);
    }
}

function draw() {
    background(0);

    puck.checkPaddleLeft(left);
    puck.checkPaddleRight(right);

    left.show();
    right.show();
    left.update();
    right.update();

    puck.update();
    puck.edges();
    puck.show();

    fill(255);
    textSize(32);
    text(leftScore, 32, 40);
    text(rightScore, width-64, 40);
}