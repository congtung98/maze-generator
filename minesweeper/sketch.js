function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for(var i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  };
  

  
  var grid;
  var menu;
  var cols = 10;
  var rows = 10;
  var w = 40;

  var totalBees = 20;
  var totalMarks = 0;
  var totalTimes;
  var totalCellRevealed;
  var updateCols;
  var updateRows;
  var inpBees;
  let inpCols;
  var inpRows;
  var gameInterval;
  
function setup() {
    createCanvas(displayWidth, displayHeight); 
    inpBees = createInput('');
    inpCols = createInput('');
    inpRows = createInput('');
    gameReload();
  }

function myInputBeeEvent() {
    if(!isNaN(this.value())){
        totalBees = this.value();

    }
}
function myInputColEvent() {
    if(!isNaN(this.value())){
        updateCols = parseInt(this.value());
    }
}
function myInputRowEvent() {
    if(!isNaN(this.value())){
        updateRows = parseInt(this.value());
    }
}

function gameOver() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].revealed = true;       
        }       
    }
    setTimeout(() => {
        alert('You lose :(')
    }, 1000);

    clearInterval(gameInterval);
} 

function gameReload() {
    if (updateCols > 0 && updateRows > 0 && updateCols*w <= displayWidth && updateRows*w <= displayHeight) {
        cols = updateCols;
        rows = updateRows;
    }else if (updateRows > 0 && updateRows*w <= displayHeight) {
        rows = updateRows;
    }else if (updateCols > 0 && updateCols*w <= displayWidth){
        cols = updateCols;
    }
    grid = make2DArray(cols, rows);
    menu = new Menu(cols*w +10, 0, 100, 50);
    totalMarks = 0;
    totalCellRevealed = 0;
    if (totalTimes > 0) {
        clearInterval(gameInterval);
    }
    totalTimes = 0;

    gameInterval = setInterval(() => {
        totalTimes++;
    }, 1000);


    inpBees.position(cols*w +20, 220);
    inpBees.size(100);
    inpBees.input(myInputBeeEvent);

    inpCols.position(cols*w +20, 100);
    inpCols.size(100);
    inpCols.input(myInputColEvent);

    inpRows.position(cols*w +20, 160);
    inpRows.size(100);
    inpRows.input(myInputRowEvent);

    for(var i = 0; i < cols; i++) {
        for(var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }

    //Pick totalBees spots  
    var options = [];

    for (let i = 0; i <cols; i++) {
        for (let j = 0; j < rows; j++) {
            options.push([i,j]);
            
        }
    }

    for(var n = 0; n < totalBees; n++){
        var index = floor(random(options.length));
        var choice = options[index];
        var i = choice[0];
        var j = choice[1];
        //Delete that spot so it's no longer an option\
        options.splice(index,1);
        grid[i][j].bee = true;
    }

    for(var i = 0; i < cols; i++) {
        for(var j = 0; j < rows; j++) {
            grid[i][j].countBees();
        }
    }
}

function mousePressed() {
    if (mouseButton === LEFT) {
        for(var i = 0; i < cols; i++) {
            for(var j = 0; j < rows; j++) {
                if(grid[i][j].contains(mouseX, mouseY)){
                    grid[i][j].reveal();
    
                    if (grid[i][j].bee) {
                        gameOver();
                    }else {
                        if(totalCellRevealed == cols*rows - totalBees) {
                            setTimeout(() => {
                                alert('You win in ' + totalTimes + ' s :)')
                            }, 500);
                            clearInterval(gameInterval);
                        }
                    }
                }
            }
        }
        if(menu.contains(mouseX, mouseY)){
            gameReload();
        }
    }else {
        for(var i = 0; i < cols; i++) {
            for(var j = 0; j < rows; j++) {
                if(grid[i][j].contains(mouseX, mouseY)){
                    if(grid[i][j].marked){
                        grid[i][j].mark(false);
                    }else{
                        grid[i][j].mark(true);
                    }
                }
            }
        }
        oncontextmenu = function() {
            return false;
        }
    }

}

  
function draw() {
    background(displayWidth);
    for(var i = 0; i < cols; i++) {
        for(var j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
    menu.show();

    fill(0);
    textAlign(LEFT);
    text('Enter number of columns (require reload): ', cols*w + 10, 80);
    fill(0);
    textAlign(LEFT);
    text('Enter number of rows (require reload): ',  cols*w + 10, 140);
    fill(0);
    textAlign(LEFT);
    text('Enter number of bees (require reload): ',  cols*w + 10, 200);
    fill(0);
    textAlign(LEFT);
    text('Total bees: '+ totalBees,  cols*w + 10, 260);
    fill(0);
    textAlign(LEFT);
    text('Total marks: '+ totalMarks,  cols*w + 10, 280);
    fill(0);
    textAlign(LEFT);
    text('Total time: '+ totalTimes,  cols*w + 10, 300);
}
