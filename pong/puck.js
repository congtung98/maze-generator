class Puck {
    constructor() {
        this.x = width/2;
        this.y = height/2;
        this.r = 12;
        this.reset();
    }

    checkPaddleLeft(p) {
        if ( this.y - this.r < p.y + p.h/2 && 
            this.y + this.r > p.y - p.h/2 &&
            this.x - this.r < p.x + p.w/2) {
                if (this.x > p.x) {
                    ding.play();
                    let diff = this.y - (p.y - p.h/2);
                    let rad = radians(45);
                    let angle = map(diff, 0, p.h, -rad, rad);
                    this.xspeed = 5 * cos(angle);
                    this.yspeed = 5 * sin(angle);
                    this.x = p.x + p.w/2 + this.r;
                    // this.xspeed *= -1;
                }
            }
    }

    checkPaddleRight(p) {
        if ( this.y - this.r < p.y + p.h/2 && 
            this.y + this.r > p.y - p.h/2 &&
            this.x + this.r > p.x - p.w/2) {
                if (this.x < p.x) {
                    ding.play();
                    let diff = this.y - (p.y - p.h/2);
                    let angle = map(diff, 0, p.h, radians(255), radians(135));
                    this.xspeed = 5 * cos(angle);
                    this.yspeed = 5 * sin(angle);
                    this.x = p.x - p.w/2 - this.r;
                    // this.xspeed *= -1;
                }
            }
    }

    update() {
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;    
    }

    reset() {
        this.x = width/2;
        this.y = height/2;
        let angle = random(-PI/4, PI/4);
        this.xspeed = 5 * cos(angle);
        this.yspeed = 5 * sin(angle);

        if (random(1) < 0.5) {
            this.xspeed *= -1;
        }
    }

    edges() {
        if (this.y < 0 || this.y > height) {
            this.yspeed *= -1;
        }

        if (this.x - this.r > width) {
            end.play();
            leftScore++;
            this.reset();
        }

        if (this.x + this.r < 0) {
            end.play();
            rightScore++;
            this.reset();
        }
    }

    show() {
        fill(255);
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }
}