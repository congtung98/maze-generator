var blob;

var blobs = [];
var zoom = 1;

function setup() {
    createCanvas(600,600);
    blob = new Agar(0, 0, 64);
    for (let i = 0; i < 200; i++) {
        var x = random(-width, width);
        var y = random(-height, height);
        blobs[i] = new Agar(x, y, 16);
        
    }
}

function draw() {
    background(0);

    translate(width/2, height/2);
    var newZoom = 64 / blob.r;
    zoom = lerp(zoom, newZoom, 0.1)
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y)
    blob.show();
    blob.update();

    for (let i = blobs.length - 1; i >= 0; i--) {
        blobs[i].show();
        if (blob.eat(blobs[i])) {
            blobs.splice(i, 1);
        }
        
    }
}