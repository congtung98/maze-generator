function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;
    
    this.bee = false;

    this.revealed = false;

    this.marked = false;
}

Cell.prototype.show = function() {
    fill(255);
    rect(this.x, this.y, this.w, this.w);
    if(this.revealed){
        if(this.bee){
            fill(127);
            ellipse(this.x+this.w*0.5, this.y+this.w*0.5, this.w*0.5)
        } else {
            fill(200)
            rect(this.x, this.y, this.w, this.w);
            if(this.neighborCount > 0){
                textAlign(CENTER);
                textStyle(BOLD);
                fill(0);
                text(this.neighborCount, this.x+this.w*0.5, this.y+this.w-12);
                textSize(18);
            }

        }
    }else if(this.marked){
        fill(0)
        textStyle(BOLD);
        textSize(18);
        textAlign(CENTER);
        text('X', this.x+this.w*0.5, this.y+this.w-12)
    }
}

Cell.prototype.countBees = function() {
    if (this.bee) {
        this.neighborCount = -1;
        return;
    }
    var total = 0;

    for (var xoff = -1; xoff <= 1; xoff++) {
        var i = this.i + xoff;
        if (i < 0 || i >= cols) continue;
    
        for (var yoff = -1; yoff <= 1; yoff++) {
          var j = this.j + yoff;
          if (j < 0 || j >= rows) continue;
    
          var neighbor = grid[i][j];
          if (neighbor.bee) {
            total++;
          }
        }
      }
    this.neighborCount = total
}

Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
}

Cell.prototype.reveal = function(){
    this.revealed = true;
    if (this.neighborCount == 0) {
        this.floodFill();
        //flood fill time
    }
    if (!this.bee) {
        totalCellRevealed++;
    }
}

Cell.prototype.mark = function(boolean){
    this.marked = boolean;
    if(boolean){
        totalMarks++;
    }else{
        totalMarks--;
    }

}

Cell.prototype.floodFill = function() {
    for (var xoff = -1; xoff <= 1; xoff++) {
        var i = this.i + xoff;
        if (i < 0 || i >= cols) continue;
    
        for (var yoff = -1; yoff <= 1; yoff++) {
          var j = this.j + yoff;
          if (j < 0 || j >= rows) continue;
    
          var neighbor = grid[i][j];
          if (!neighbor.bee && !neighbor.revealed) {
            neighbor.reveal();
          }
        }
      }
}