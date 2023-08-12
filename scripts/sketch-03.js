const cellSize = 13;

let columns, rows;

let life = [];
let next = [];

// functions for game of life implementation

function neighbors(x, y) {
  let count = 0;
  for (let i = -1; i <= 1; i++)
    for (let j = -1; j <= 1; j++)
      count += life[x + i][y + j];
  count -= life[x][y];
  return count;
}

function randomAlive() {
  for (let i = 1; i < columns - 1; i++)
    for (let j = 1; j < rows - 1; j++)
      // randomly assign a 0 or a 1 to a cell
      life[i][j] = floor(random(2));
}

function clearGrid() {
  for (let i = 1; i < columns - 1; i++)
    for (let j = 1; j < rows - 1; j++)
      life[i][j] = 0;
}

function grid() {
  let howMany;
  stroke(255, 20);
  howMany = columns > rows ? columns : rows;
  for (let i = 0; i <= howMany; i++) {
    let coordinate = i * cellSize;
    line(coordinate, 0, coordinate, height);
    line(0, coordinate, width, coordinate);
  }
}

function colorAlive() {
  stroke(255, 150);
  fill(200, 100, 50, 200);
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (life[i][j] == 1) {
        rect(i * cellSize, j * cellSize, cellSize, cellSize, 2);
      }
    }
  }
}

// p5 functions

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
  // Calculate columns and rows
  columns = floor(width / cellSize);
  rows = floor(height / cellSize);
  // initialize the boards
  for (let i = 0; i < columns; i++) {
    life[i] = [];
    next[i] = [];
    for (let j = 0; j < rows; j++) {
      life[i][j] = false;
    }
  }
}

function draw() {
  background(0);
  noStroke();
  fill(255);
  textSize(25);
  text("Conway's Game of Life", width / 20, height / 5);
  fill(200);
  textSize(13);
  text("> Touch and drag to create alive cells on the screen", width / 20, height / 5 + 25);
  text("> Press R to assign the cells randomly as alive or dead", width / 20, height / 5 + 45);
  text("> Press C to clear the board", width / 20, height / 5 + 65);
  grid();
  if (!mouseIsPressed) {
    for (let i = 1; i < columns - 1; i++) {
      for (let j = 1; j < rows - 1; j++) {
        if (life[i][j] == 1 && neighbors(i, j) < 2) next[i][j] = 0;
        else if (life[i][j] == 1 && neighbors(i, j) > 3) next[i][j] = 0;
        else if (life[i][j] == 0 && neighbors(i, j) == 3) next[i][j] = 1;
        else next[i][j] = life[i][j];     // no change if number of neighbors is 2 or 3
      }
    }
    let temp = life;
    life = next;
    next = temp;
  }
  if (keyIsPressed) {
    console.log(keyCode);
    if (keyCode == 82) randomAlive();
    if (keyCode == 67) clearGrid();

  }
  colorAlive();
}

function mouseDragged() {
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);
  if (x <= 0 || y <= 0 || x >= columns - 1 || y >= rows - 1) {      // exception of clicking outside the grid
  } else life[x][y] = 1;
}