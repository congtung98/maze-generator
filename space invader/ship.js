function Ship() {
    this.x = width/2;
    this.y = height - 25;
    this.r = 30;

    this.show = function() {
        // translate(this.x, this.y);
        // fill(255);
        // rect(this.x, height-20, 20, 60);
        imageMode(CENTER);
        image(img_ship,this.x,this.y);
    
        // rectMode(CENTER);
    }

    this.move = function(dir) {
        this.x += dir*5;
        this.x = constrain(this.x, 10, width - 10);
    }
}