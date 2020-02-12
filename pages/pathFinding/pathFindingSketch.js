var cellSize, cellsX, cellsY, numCells;
var cells = [];
var frontierBuffer = [];

var cellQuantity = 20;

var xLoc;
var yLoc;

var wallMode = true;
var startMode = false;
var endMode = false;

var solving = false;

var place = 0;

var xStart, yStart;
var xEnd, yEnd;

var menuHeight = 50;

var time = 0;
var delay = 100;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  resizeGrid();
}

function draw()
{
  if (millis() > time)
  {
    time += delay;
    background(255);
    if (solving)
      updateFrontier();
    drawCells();
    drawMenu();
  }
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
      if (cells[x][y].frontier == 1)
        fill (255, 0, 0);
      if (cells[x][y].visited == 1)
        fill(0, 100, 200, 80);
      if (cells[x][y].path == 1)
        fill(255, 99, 71);
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
    frontierBuffer[x] = [];
    for (var y = 0; y < cellsY; y++)
    {
      cells[x][y] = {
          start: 0,
          wall: 0,
          end: 0,
          frontier: 0,
          visited: 0,
          cameFrom: -1,
          path: 0};
      frontierBuffer[x][y] = 0;
    }
  }
}

// expand the frontier outwards
function updateFrontier()
{
  for (var x = 0; x < cellsX; x++)
    for (var y = 0; y < cellsY; y++)
    {
      if (cells[x][y].frontier == 1)
      {
        if (x - 1 >= 0)
          if (cells[x - 1][y].visited == 0 && cells[x - 1][y].wall == 0)
          {
            frontierBuffer[x - 1][y] = 1;
            cells[x - 1][y].cameFrom = 2;
          }
        if (y + 1 < cellsY)
          if (cells[x][y + 1].visited == 0 && cells[x][y + 1].wall == 0)
          {
            frontierBuffer[x][y + 1] = 1;
            cells[x][y + 1].cameFrom = 3;
          }
        if (x + 1 < cellsX)
          if (cells[x + 1][y].visited == 0 && cells[x + 1][y].wall == 0)
          {
            frontierBuffer[x + 1][y] = 1;
            cells[x + 1][y].cameFrom = 0;
          }
        if (y - 1 >= 0)
          if (cells[x][y - 1].visited == 0 && cells[x][y - 1].wall == 0)
          {
            frontierBuffer[x][y - 1] = 1;
            cells[x][y - 1].cameFrom = 1;
          }

        cells[x][y].frontier = 0;
        cells[x][y].visited = 1;

        if (cells[x][y].end == 1)
        {
          solving = false;
          retracePath();
        }
      }
    }
    for (var x = 0; x < cellsX; x++)
      for (var y = 0; y < cellsY; y++)
      {
        if (frontierBuffer[x][y] == 1)
        {
          cells[x][y].frontier = 1;
          frontierBuffer[x][y] = 0;
        }
      }
}

function retracePath()
{
  var x = xEnd;
  var y = yEnd;
  while (cells[x][y].start == 0)
  {
    cells[x][y].path = 1;
    switch (cells[x][y].cameFrom)
    {
      case 0:
        x--;
        print("moved left");
        break;
      case 1:
        y++;
        print("moved down");
        break;
      case 2:
        x++;
        print("moved right");
        break;
      case 3:
        y--;
        print("moved up");
        break;
      default:
        print("ERROR, INVALID CAMEFROM\n");
        break;
    }
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
      xStart = xLoc;
      yStart = yLoc;
    }
    else if (wallMode)
      cells[xLoc][yLoc].wall = place;
    else
    {
      cells[xLoc][yLoc].end = place;
      xEnd = xLoc;
      yEnd = yLoc;
    }
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
    if (solving == false)
    {
      solving = true;
      cells[xStart][yStart].frontier = 1;
    }
}