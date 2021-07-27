function Enemy(x, y) {
    this.x = x;
    this.y = y;
    this.r = 30;
    this.toDestroy = false;

    this.xdir = 1;

    this.move = function() {
        this.x += this.xdir;
    }

    this.shiftDown = function() {
        this.xdir *= -1;
        this.y += this.r;
    }

    // this.shoot = function() {

    // }

    this.show = function() {
        noStroke();
        // fill(255, 0, 200, 150);
        // ellipse(this.x, this.y, this.r*2, this.r*2);
        imageMode(CENTER);
        image(img_enemy,this.x,this.y);
    }

    this.destroy = function() {
        this.toDestroy = true;
    }
}