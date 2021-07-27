function Drop(x, y) {
    this.x = x;
    this.y = y;
    this.r = 8;
    this.toExplode = false;

    this.show = function() {
        noStroke();
        fill(150, 0, 200);
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }

    this.explode = function() {
        this.toExplode = true;
    }

    this.hits = function(enemy) {
        let d = dist(this.x, this.y, enemy.x, enemy.y);
        if (d < this.r + enemy.r) {
            return true;
        } else {
            return false;
        }
    }

    this.move = function(vel) {
        this.y = this.y - vel;
    }

}