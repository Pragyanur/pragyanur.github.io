const SHADES = [" ", ".", ":", ";", "i", "+", "o", "O", "x", "X", "%", "A", "M", "B", "#", "@"];
const CHAR_SIZE = 16;

let textPositions = [];
let video;

function substitute(gray_value) {
  let intensity;
  intensity = map(gray_value, 0, 255, 0, SHADES.length);
  return floor(intensity);
}

// function max_gray(posx, posy) {
//   let gray_value = 0;
//   // Loop through the neighborhood
//   for (let i = 0; i <= CHAR_SIZE; i++) {
//     for (let j = 0; j <= CHAR_SIZE; j++) {
//       let xNeighbor = constrain(posx + i, 0, video.width - 1);
//       let yNeighbor = constrain(posy + j, 0, video.height - 1);

//       let idx = (xNeighbor + yNeighbor * video.width) * 4;

//       let r = video.pixels[idx];      // Red
//       let g = video.pixels[idx + 1];  // Green
//       let b = video.pixels[idx + 2];  // Blue

//       let gv = 0.299 * r + 0.587 * g + 0.114 * b;
//       gray_value = max(gray_value, gv);
//     }
//   }
//   return gray_value;
// }

function gray_at_pixel(posx, posy) {
  let mid = floor(CHAR_SIZE / 2);
  let idx = 4 * (posx + mid + (posy + mid) * video.width);
  let r = video.pixels[idx];
  let g = video.pixels[idx + 1];
  let b = video.pixels[idx + 2];
  let gray_value = 0.299 * r + 0.587 * g + 0.114 * b;
  return gray_value;
}

function characters() {
  let n, value;
  for (let O of textPositions) {
    value = gray_at_pixel(O.x, O.y);
    // value = max_gray(O.x, O.y);
    n = substitute(value);
    fill(value);
    // fill(255);
    textSize(CHAR_SIZE);
    text(SHADES[n], O.x, O.y);
  }
}

// main
function setup() {
  video = createCapture(VIDEO);
  createCanvas(windowWidth, windowHeight);
  video.size(width, height);
  video.hide();
  // noLoop();
  for (let i = 0; i < width; i += CHAR_SIZE) {
    for (let j = 0; j < height; j += CHAR_SIZE) {
      p = createVector(i, j);
      textPositions.push(p);
    }
  }
}
function draw() {
  video.loadPixels();
  background(0);
  characters();
}
function mousePressed() {
  redraw();  // Redraw the canvas when the mouse is pressed
}