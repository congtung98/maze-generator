var socket;

function setup() {
    createCanvas(200,200);
    background(51);

    socket = io.connect('http://localhost:7000');
    // socket = io.connect('https://4a36b573eba0.ngrok.io');
    socket.on('mouse', newDrawing);
}

function newDrawing(data) {
    noStroke();
    fill(255, 0, 100);
    ellipse(data.x, data.y, 36, 36);
}

function mouseDragged() {
    console.log('Sending: ' + mouseX + ',' + mouseY);

    var data  = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('mouse', data);
    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 36, 36);
}

function draw() {
}