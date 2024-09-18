const SHADES = [" ", ".", ":", ";", "i", "+", "o", "O", "x", "X", "%", "A", "M", "B", "#", "@"];
CHAR_SIZE = 10;

let textPositions = [];
let font, img;


function shade(n) {
  return SHADES[n];
}

function substitute(gray_value) {
  let intensity, index;
  intensity = map(gray_value, 0, 255, 1, SHADES.length);
  index = floor(intensity);
  return index;
}


function mean_filter(x, y, CHAR_SIZE) {
  let maxR = 0, maxG = 0, maxB = 0;
  let gray_value;
  let halfKernel = floor(kernelSize / 2);

  // Loop through the neighborhood
  for (let i = -halfKernel; i <= halfKernel; i++) {
    for (let j = -halfKernel; j <= halfKernel; j++) {
      let xNeighbor = constrain(x + i, 0, img.width - 1);
      let yNeighbor = constrain(y + j, 0, img.height - 1);

      let idx = (xNeighbor + yNeighbor * img.width) * 4;

      let r = img.pixels[idx];     // Red
      let g = img.pixels[idx + 1]; // Green
      let b = img.pixels[idx + 2]; // Blue

      // Update the maximum values
      maxR = max(r, maxR);
      maxG = max(g, maxG);
      maxB = max(b, maxB);
    }
  }
}

function characters() {
  for (let O of textPositions) {
    textSize(1.2 * CHAR_SIZE);
    text('O', O.x, O.y);
  }
}


// main

function preload() {
  img = loadImage('/store/rare_worms.gif');
  font = loadFont('/store/MigaeSemibold-3zd2M.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < width; i += CHAR_SIZE) {
    for (let j = 0; j < height; j += CHAR_SIZE) {
      p = createVector(i, j);
      textPositions.push(p);
    }
  }
}

function draw() {
  background(255);
  // list of image pixels
  characters();
}