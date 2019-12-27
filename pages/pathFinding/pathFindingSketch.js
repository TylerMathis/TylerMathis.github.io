let loc = 0;
let cellSize = 2;
let cellsX, cellsY;

function setup() {

  cellsX = windowWidth / cellSize;
  cellsY = windowHeight / cellSize;
  
  noStroke();

  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < cellsX; i++)
  {
    for (let j = 0; j < cellsY; j++)
    {
      fill(i, j, 100);
      ellipse(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}

function draw() {
}