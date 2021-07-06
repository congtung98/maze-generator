function Menu(x, y ,w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Menu.prototype.show = function() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
    fill(0)
    textAlign(CENTER);
    textStyle(BOLD);
    text('Reload', this.x+this.w*0.5, this.y+this.h*0.5 + 6)
    textSize(18)
}

Menu.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h)
}