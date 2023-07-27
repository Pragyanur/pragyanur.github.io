const cell_size = 15;
const cell_mid = cell_size / 2;


let game_of_life = [];
// game_of_life[x][y] = true / false
let countX = 0;
let countY = 0;

// FUNCTION TO COUNT ALIVE NEIGHBOUR CELLS
function count_alive(array, x, y) {
  let count = 0;
  // sides
  if (array[x][y - 1])
    count++;
  if (array[x][y + 1])
    count++;
  if (array[x - 1][y])
    count++;
  if (array[x + 1][y])
    count++;
  // diagonals
  if (array[x - 1][y + 1])
    count++;
  if (array[x - 1][y - 1])
    count++;
  if (array[x + 1][y + 1])
    count++;
  if (array[x + 1][y - 1])
    count++;

  return count;
}

// FUNCTION TO CHANGE STATE OF THE CELL
function change_cell_state(array, x, y) {
  // live cell with less than 2 alive neighbours
  if (array[x][y] == true && count_alive(array, x, y) < 2)
    array[x][y] = false;
  // live cell with 2 or 3 alive neighbours
  if (array[x][y] == true && count_alive(array, x, y) >= 2 && count_alive(array, x, y) <= 3)
    array[x][y] = true;
  // live cell with more than 3 alive neighbours
  if (array[x][y] == true && count_alive(array, x, y) > 3)
    array[x][y] = false;
  // dead cell with exactly three alive neighbours
  if (array[x][y] == false && count_alive(array, x, y) == 3)
    array[x][y] = true;
}

// FUNCTION TO CHANGE THE COLOR OF THE CELL WRT ALIVE OR DEAD
function color_cell(alive, x, y) {
  if (alive == true)
    fill(20, 100, 100);
  else fill(0);
  stroke(0);
  rect(x * cell_size, y * cell_size, cell_size, cell_size);
}

// RANDOMLY SET ALIVE CELLS
function random_alive(array) {
  for (let x = 4; x < countX - 4; x++) {
    for (let y = 4; y < countY - 4; y++) {
      god = random(-1, 0.1);
      if (god > 0)
        array[x][y] = true;
      else array[x][y] = false;
    }
  }
}

// SETUP CANVAS
function setup() {
  background(0);
  frameRate(15);
  createCanvas(windowWidth, windowHeight);
  // count the number of horizontal cells
  for (let x = cell_mid; x < width; x += cell_size) {
    countX++;
  }
  // count the number of vertical cells
  for (let y = cell_mid; y < height; y += cell_size) {
    countY++;
  }
  // initialize board to black
  for (let x = 0; x < countX; x++) {
    game_of_life[x] = [];
    for (let y = 0; y < countY; y++)
      game_of_life[x][y] = false;
  }
  for (let x = 0; x < countX; x++) {
    for (let y = 0; y < countY; y++) {
      let alive = game_of_life[x][y];
      color_cell(alive, x, y);
    }
  }
  // random_alive(game_of_life);
}
// ANIMATION
function draw() {
  if (!mouseIsPressed) {
    for (let x = 1; x < countX - 1; x++) {
      for (let y = 1; y < countY - 1; y++) {
        change_cell_state(game_of_life, x, y);
        color_cell(game_of_life[x][y], x, y);
      }
    }
  }
  fill(255);
  textSize(20);
  text("Conway's Game of Life", width / 10, height / 5);
  fill(200);
  textSize(13);
  text("Touch and drag to create alive cells on the screen", width / 10, height / 5 + 20);

}

function mouseDragged() {
  let indexX = int(mouseX / cell_size);
  let indexY = int(mouseY / cell_size);
  color_cell(game_of_life[indexX][indexY], indexX, indexY);
  game_of_life[indexX][indexY] = true;
}