var cellSize, cellsX, cellsY, numCells;
var cells = [];
var walls = [];

var cellQuantity = 50;

var xLoc;
var yLoc;

var wallMode = true;

var place = 0;

var menuHeight = 50;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  resizeGrid();
}

function draw()
{
  background(0);
  drawCells();
  drawMenu();
}

function drawMenu()
{
  noStroke();
  fill(0, 100, 200);
  rect(0, 0, windowWidth / 2, menuHeight);
  fill(0);
  rect(windowWidth / 2, 0, windowWidth / 2, menuHeight);
  stroke(0);
}

function drawCells()
{
  for (var x = 0; x < cellsX; x++)
    for (var y = 0; y < cellsY; y++)
    {
      stroke(0);
      fill (255);
      if (cells[x][y] == 1)
        fill (0, 100, 200);
      if (walls[x][y] == 1)
        fill (0);
      
      rect(x * cellSize, (y * cellSize) + menuHeight, cellSize, cellSize);
    }
}

// called whenever we need to resize grid
function resizeGrid()
{
  cellSize = (windowWidth / cellQuantity);
  cellsX = parseInt(windowWidth / cellSize);
  cellsY = parseInt(windowHeight / cellSize) - parseInt(menuHeight / cellSize);
  numCells = cellsX * cellsY;

  for (var x = 0; x < cellsX; x++)
  {
    cells[x] = [];
    for (var y = 0; y < cellsY; y++)
      cells[x][y] = 0;
  }
  for (var x = 0; x < cellsX; x++)
  {
    walls[x] = [];
    for (var y = 0; y < cellsY; y++)
      walls[x][y] = 0;
  }
}

// called when screen is resized
function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
  resizeGrid();
}

function mousePressed() {
  if (mouseY < menuHeight)
  {
    if (mouseX < windowWidth / 2)
      wallMode = false;
    else
      wallMode = true;
  }
  else
  {
    xLoc = parseInt(mouseX / cellSize);
    yLoc = parseInt((mouseY - menuHeight) / cellSize);

    place = 0;
    if (walls[xLoc][yLoc] == 0)
      place = 1;
  
    if (wallMode)
      walls[xLoc][yLoc] = place;
    else
      cells[xLoc][yLoc] = place;
  }
}

function mouseDragged()
{
  if (wallMode)
  {
    var newXLoc = parseInt(mouseX / cellSize);
    var newYLoc = parseInt((mouseY - menuHeight) / cellSize);
    
    if (newXLoc != xLoc || newYLoc != yLoc)
    {
      walls[xLoc][yLoc] = place;
      xLoc = newXLoc;
      yLoc = newYLoc;
    }
  }
}