let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '3');
}

function draw() {
  circle(mouseX, mouseY, 100);
}