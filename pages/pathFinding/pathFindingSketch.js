var cellSize, cellsX, cellsY, numCells;
var cells = [];

var cellQuantity = 25;

var xLoc;
var yLoc;

var wallMode = true;
var startMode = false;
var endMode = false;

var solving = false;

var place = 0;

var startX, startY;

var menuHeight = 50;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  resizeGrid();
}

function draw()
{
  background(0);
  if (solving)
    updateFrontier();
  drawCells();
  drawMenu();
}

function drawMenu()
{
  noStroke();
  fill(0, 100, 200);
  rect(0, 0, windowWidth / 3, menuHeight);
  fill(0);
  rect(windowWidth / 3, 0, windowWidth / 2, menuHeight);
  fill (200, 0, 200);
  rect(2 * windowWidth / 3, 0, windowWidth / 3, menuHeight);
  stroke(0);
}

function drawCells()
{
  for (var x = 0; x < cellsX; x++)
    for (var y = 0; y < cellsY; y++)
    {
      stroke(0);
      fill (255);
      if (cells[x][y].start == 1)
        fill (0, 100, 200);
      if (cells[x][y].wall == 1)
        fill (0);
      if (cells[x][y].end == 1)
        fill (200, 0, 200);
      
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
      cells[x][y] = {
          start: 0,
          wall: 0,
          end: 0,
          frontier: 0,
          visited: 0,
          cameFrom: -1};
  }
}

function updateFrontier()
{
  for (var x = 0; x < cellsX; x++)
    for (var y = 0; y < cellsY; y++)
    {
      if 
    }
}

// called when screen is resized
function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
  resizeGrid();
}

// on click
function mousePressed() {
  // handle menu options
  if (mouseY < menuHeight)
  {
    if (mouseX < windowWidth / 3)
    {
      startMode = true;
      wallMode = false;
      endMode = false;
    }
    else if (mouseX < 2 * windowWidth / 3)
    {
      startMode = false;
      wallMode = true;
      endMode = false;
    }
    else
    {
      startMode = false;
      wallMode = false;
      endMode = true;
    }
  }
  // otherwise invert a block
  else
  {
    xLoc = parseInt(mouseX / cellSize);
    yLoc = parseInt((mouseY - menuHeight) / cellSize);
  
    place = 0;
    if (cells[xLoc][yLoc].start == 0 &&
        cells[xLoc][yLoc].wall == 0 &&
        cells[xLoc][yLoc].end == 0)
      place = 1;

    if (startMode)
    {
      cells[xLoc][yLoc].start = place;
      startX = xLoc;
      startY = yLoc;
    }
    else if (wallMode)
      cells[xLoc][yLoc].wall = place;
    else
      cells[xLoc][yLoc].end = place;
  }
}

// only matters for walls
function mouseDragged()
{
  if (wallMode)
  {
    var newXLoc = parseInt(mouseX / cellSize);
    var newYLoc = parseInt((mouseY - menuHeight) / cellSize);
    
    if (newXLoc != xLoc || newYLoc != yLoc)
    {
      cells[xLoc][yLoc].wall = place;
      xLoc = newXLoc;
      yLoc = newYLoc;
    }
  }
}

function keyPressed()
{
  if (keyCode == ENTER)
  {
    if (solving == false)
    {
      solving == true;
      cells[xStart - 1][yStart].frontier = 1;
      cells[xStart][yStart + 1].frontier = 1;
      cells[xStart + 1][yStart].frontier = 1;
      cells[xStart][yStart - 1].frontier = 1;
    }
  }
}