var cellSize, cellsX, cellsY, numCells;
var cells = [];
var walls = [];

var cellQuantity = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  resizeGrid();
}

function draw() {
  background(0);
  for (var x = 0; x < cellsX; x++)
    for (var y = 0; y < cellsY; y++)
    {
      stroke(0);
      fill (255);
      if (cells[x][y] == 1)
        fill (0, 100, 200);
      if (walls[x][y] == 1)
        fill (0);
      
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
}

// called whenever we need to resize grid
function resizeGrid() {

  cellSize = windowWidth / cellQuantity;
  cellsX = parseInt(windowWidth / cellSize);
  cellsY = parseInt(windowHeight / cellSize);
  numCells = cellsX * cellsY;

  for (var x = 0; x < cellsX; x++)
  {
    cells[x] = []
    for (var y = 0; y < cellsY; y++)
      cells[x][y] = 0;
  }
  for (var x = 0; x < cellsX; x++)
  {
    walls[x] = []
    for (var y = 0; y < cellsY; y++)
      walls[x][y] = 0;
  }
}

// called when screen is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resizeGrid();
}

function mousePressed() {
  var xLoc = mouseX;
  var yLoc = mouseY;

  var xCellIndex = parseInt(xLoc / cellSize);
  var yCellIndex = parseInt(yLoc / cellSize);

  walls[xCellIndex][yCellIndex] = !walls[xCellIndex][yCellIndex];
}